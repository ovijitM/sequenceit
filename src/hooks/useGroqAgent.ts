/**
 * useGroqAgent – React hook that drives a tool-calling AI agent via Groq.
 *
 * Architecture:
 *   1. User types a message in the chat popup.
 *   2. The message is sent to Groq (llama-3.3-70b-versatile) together with
 *      the full tool-schema for every Supabase API.
 *   3. If Groq replies with a tool_call, the hook executes the matching
 *      function from aiTools.ts and sends the result back to Groq as a
 *      "tool" message so the model can compose a final human-readable reply.
 *   4. The final text reply is shown in the chat.
 *
 * No server is needed – the Groq SDK talks directly to api.groq.com from
 * the browser (VITE_GROQ_API_KEY is a public env var, keep it restricted
 * to your domain in the Groq console).
 */

import { useState, useCallback, useRef } from "react";
import Groq from "groq-sdk";
import * as tools from "@/lib/aiTools";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant" | "tool";
  content: string;
  tool_call_id?: string;
  name?: string;
}

// ─── Tool schema (what we hand to Groq) ──────────────────────────────────────

const TOOL_DEFINITIONS: Groq.Chat.Completions.ChatCompletionTool[] = [
  // ── Projects ──
  {
    type: "function",
    function: {
      name: "listProjects",
      description: "Fetch all projects from the database, newest first.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createProject",
      description: "Create a new project entry.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Project title (required)" },
          description: { type: "string" },
          image_url: { type: "string" },
          category: {
            type: "string",
            enum: ["Web Development", "AI & ML", "Blockchain", "Mobile", "Cloud"],
          },
          technologies: { type: "array", items: { type: "string" } },
          live_url: { type: "string" },
        },
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateProject",
      description: "Update an existing project by its UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          image_url: { type: "string" },
          category: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          live_url: { type: "string" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteProject",
      description: "Permanently delete a project by its UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Team Members ──
  {
    type: "function",
    function: {
      name: "listTeamMembers",
      description: "Fetch all team members from the database.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createTeamMember",
      description: "Add a new team member.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          role: { type: "string" },
          bio: { type: "string" },
          image_url: { type: "string" },
          linkedin_url: { type: "string" },
          github_url: { type: "string" },
          team_category: {
            type: "string",
            enum: ["Development", "AI & Data", "Blockchain", "Design", "Management"],
          },
        },
        required: ["name", "role"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateTeamMember",
      description: "Update an existing team member by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          bio: { type: "string" },
          image_url: { type: "string" },
          linkedin_url: { type: "string" },
          github_url: { type: "string" },
          team_category: { type: "string" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteTeamMember",
      description: "Permanently delete a team member by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Testimonials ──
  {
    type: "function",
    function: {
      name: "listTestimonials",
      description: "Fetch all testimonials.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createTestimonial",
      description: "Create a new testimonial.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          role: { type: "string" },
          company: { type: "string" },
          content: { type: "string" },
          image_url: { type: "string" },
          rating: { type: "number", minimum: 1, maximum: 5 },
        },
        required: ["name", "role", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateTestimonial",
      description: "Update an existing testimonial by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          company: { type: "string" },
          content: { type: "string" },
          image_url: { type: "string" },
          rating: { type: "number" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteTestimonial",
      description: "Permanently delete a testimonial by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Blog Posts ──
  {
    type: "function",
    function: {
      name: "listBlogPosts",
      description: "Fetch all blog posts.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createBlogPost",
      description: "Create a new blog post.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          author: { type: "string" },
          category: { type: "string" },
          image_url: { type: "string" },
          read_time: { type: "string" },
          is_featured: { type: "boolean" },
          published: { type: "boolean" },
        },
        required: ["title", "excerpt", "content", "author", "category"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateBlogPost",
      description: "Update an existing blog post by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          author: { type: "string" },
          category: { type: "string" },
          image_url: { type: "string" },
          read_time: { type: "string" },
          is_featured: { type: "boolean" },
          published: { type: "boolean" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteBlogPost",
      description: "Permanently delete a blog post by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Careers ──
  {
    type: "function",
    function: {
      name: "listCareers",
      description: "Fetch all job openings.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createCareer",
      description: "Create a new job opening.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          department: { type: "string" },
          location: { type: "string", enum: ["Remote", "Hybrid", "On-site"] },
          type: { type: "string", enum: ["Full-time", "Part-time", "Contract"] },
          description: { type: "string" },
          requirements: { type: "array", items: { type: "string" } },
          published: { type: "boolean" },
        },
        required: ["title", "department", "location", "type", "description"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateCareer",
      description: "Update a job opening by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          department: { type: "string" },
          location: { type: "string" },
          type: { type: "string" },
          description: { type: "string" },
          requirements: { type: "array", items: { type: "string" } },
          published: { type: "boolean" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteCareer",
      description: "Permanently delete a job opening by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Case Studies ──
  {
    type: "function",
    function: {
      name: "listCaseStudies",
      description: "Fetch all case studies.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createCaseStudy",
      description: "Create a new case study.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          client: { type: "string" },
          industry: { type: "string" },
          image_url: { type: "string" },
          challenge: { type: "string" },
          solution: { type: "string" },
          testimonial: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                metric: { type: "string" },
                value: { type: "string" },
                icon: { type: "string" },
              },
            },
          },
          published: { type: "boolean" },
        },
        required: ["title", "client", "industry", "challenge", "solution"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateCaseStudy",
      description: "Update a case study by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          client: { type: "string" },
          industry: { type: "string" },
          image_url: { type: "string" },
          challenge: { type: "string" },
          solution: { type: "string" },
          testimonial: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          results: { type: "array", items: { type: "object" } },
          published: { type: "boolean" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteCaseStudy",
      description: "Permanently delete a case study by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Documentation ──
  {
    type: "function",
    function: {
      name: "listDocumentation",
      description: "Fetch all documentation articles.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createDocumentation",
      description: "Create a new documentation article.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          category: { type: "string" },
          content: { type: "string" },
          icon: { type: "string" },
          order_index: { type: "number" },
          published: { type: "boolean" },
        },
        required: ["title", "category", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateDocumentation",
      description: "Update a documentation article by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          category: { type: "string" },
          content: { type: "string" },
          icon: { type: "string" },
          order_index: { type: "number" },
          published: { type: "boolean" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteDocumentation",
      description: "Permanently delete a documentation article by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── FAQs ──
  {
    type: "function",
    function: {
      name: "listFaqs",
      description: "Fetch all FAQs ordered by category and order_index.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "createFaq",
      description: "Create a new FAQ entry.",
      parameters: {
        type: "object",
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
          category: { type: "string" },
          order_index: { type: "number" },
          published: { type: "boolean" },
        },
        required: ["question", "answer", "category"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateFaq",
      description: "Update an FAQ by UUID id.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          question: { type: "string" },
          answer: { type: "string" },
          category: { type: "string" },
          order_index: { type: "number" },
          published: { type: "boolean" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteFaq",
      description: "Permanently delete an FAQ by UUID id.",
      parameters: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  },

  // ── Dashboard ──
  {
    type: "function",
    function: {
      name: "getDashboardStats",
      description:
        "Get a summary count of all content types: projects, team members, testimonials, blog posts, careers, case studies, documentation, and FAQs.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
];

// ─── Tool executor ────────────────────────────────────────────────────────────

const TOOL_MAP: Record<string, (args: unknown) => Promise<unknown>> = {
  listProjects: () => tools.listProjects(),
  createProject: (a) => tools.createProject(a as Parameters<typeof tools.createProject>[0]),
  updateProject: (a) => tools.updateProject(a as Parameters<typeof tools.updateProject>[0]),
  deleteProject: (a) => tools.deleteProject(a as Parameters<typeof tools.deleteProject>[0]),

  listTeamMembers: () => tools.listTeamMembers(),
  createTeamMember: (a) => tools.createTeamMember(a as Parameters<typeof tools.createTeamMember>[0]),
  updateTeamMember: (a) => tools.updateTeamMember(a as Parameters<typeof tools.updateTeamMember>[0]),
  deleteTeamMember: (a) => tools.deleteTeamMember(a as Parameters<typeof tools.deleteTeamMember>[0]),

  listTestimonials: () => tools.listTestimonials(),
  createTestimonial: (a) => tools.createTestimonial(a as Parameters<typeof tools.createTestimonial>[0]),
  updateTestimonial: (a) => tools.updateTestimonial(a as Parameters<typeof tools.updateTestimonial>[0]),
  deleteTestimonial: (a) => tools.deleteTestimonial(a as Parameters<typeof tools.deleteTestimonial>[0]),

  listBlogPosts: () => tools.listBlogPosts(),
  createBlogPost: (a) => tools.createBlogPost(a as Parameters<typeof tools.createBlogPost>[0]),
  updateBlogPost: (a) => tools.updateBlogPost(a as Parameters<typeof tools.updateBlogPost>[0]),
  deleteBlogPost: (a) => tools.deleteBlogPost(a as Parameters<typeof tools.deleteBlogPost>[0]),

  listCareers: () => tools.listCareers(),
  createCareer: (a) => tools.createCareer(a as Parameters<typeof tools.createCareer>[0]),
  updateCareer: (a) => tools.updateCareer(a as Parameters<typeof tools.updateCareer>[0]),
  deleteCareer: (a) => tools.deleteCareer(a as Parameters<typeof tools.deleteCareer>[0]),

  listCaseStudies: () => tools.listCaseStudies(),
  createCaseStudy: (a) => tools.createCaseStudy(a as Parameters<typeof tools.createCaseStudy>[0]),
  updateCaseStudy: (a) => tools.updateCaseStudy(a as Parameters<typeof tools.updateCaseStudy>[0]),
  deleteCaseStudy: (a) => tools.deleteCaseStudy(a as Parameters<typeof tools.deleteCaseStudy>[0]),

  listDocumentation: () => tools.listDocumentation(),
  createDocumentation: (a) => tools.createDocumentation(a as Parameters<typeof tools.createDocumentation>[0]),
  updateDocumentation: (a) => tools.updateDocumentation(a as Parameters<typeof tools.updateDocumentation>[0]),
  deleteDocumentation: (a) => tools.deleteDocumentation(a as Parameters<typeof tools.deleteDocumentation>[0]),

  listFaqs: () => tools.listFaqs(),
  createFaq: (a) => tools.createFaq(a as Parameters<typeof tools.createFaq>[0]),
  updateFaq: (a) => tools.updateFaq(a as Parameters<typeof tools.updateFaq>[0]),
  deleteFaq: (a) => tools.deleteFaq(a as Parameters<typeof tools.deleteFaq>[0]),

  getDashboardStats: () => tools.getDashboardStats(),
};

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the SequenceIT Admin AI Assistant — a highly capable, action-oriented agent embedded directly in the admin dashboard.

Your job is to help the admin manage all website content through natural conversation.

## What you can do
You have access to tools that perform full CRUD operations on every content type:
- **Projects** — list, create, update, delete
- **Team Members** — list, create, update, delete
- **Testimonials** — list, create, update, delete
- **Blog Posts** — list, create, update, delete
- **Careers / Job Openings** — list, create, update, delete
- **Case Studies** — list, create, update, delete
- **Documentation** — list, create, update, delete
- **FAQs** — list, create, update, delete
- **Dashboard Stats** — get overall content counts

## How you behave
1. When the admin gives you an instruction (e.g. "add a new project called X"), **call the appropriate tool immediately** — don't ask for confirmation unless critical information is genuinely missing.
2. If you need an ID to update/delete something, **first list the relevant items** to find the correct UUID, then proceed.
3. After every tool call, **summarise what you did** in a friendly, concise sentence.
4. If a tool call fails, **explain the error clearly** and suggest how to fix it.
5. You are talking exclusively to admins — you may perform any operation they request including deletes.
6. Keep responses short and clear. Use bullet points or tables when listing data.
7. Today's date is ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.

Speak in a professional but friendly tone. You are a trusted assistant, not a chatbot.`;

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGroqAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const groqRef = useRef<Groq | null>(null);

  // Lazy-init the Groq client (reads VITE_GROQ_API_KEY at runtime)
  const getClient = useCallback(() => {
    if (!groqRef.current) {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
      if (!apiKey) throw new Error("VITE_GROQ_API_KEY is not set in your .env file.");
      groqRef.current = new Groq({
        apiKey,
        dangerouslyAllowBrowser: true, // frontend-only usage
      });
    }
    return groqRef.current;
  }, []);

  const sendMessage = useCallback(
    async (userText: string) => {
      const userMsg: ChatMessage = { role: "user", content: userText };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsThinking(true);

      try {
        const client = getClient();

        // Build the conversation for Groq
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const groqMessages: any[] = [
          { role: "system", content: SYSTEM_PROMPT },
          ...updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
            ...(m.tool_call_id ? { tool_call_id: m.tool_call_id } : {}),
            ...(m.name ? { name: m.name } : {}),
          })),
        ];

        // Agentic loop: keep calling until no more tool_calls
        let loopMessages = groqMessages;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allNewMessages: any[] = [];

        for (let iteration = 0; iteration < 10; iteration++) {
          const model = (import.meta.env.VITE_GROQ_MODEL as string) || "llama-3.3-70b-versatile";
          const response = await client.chat.completions.create({
            model,
            messages: loopMessages,
            tools: TOOL_DEFINITIONS,
            tool_choice: "auto",
            max_tokens: 2048,
          });

          const choice = response.choices[0];
          const assistantMsg = choice.message;

          // If no tool calls, we're done
          if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
            const finalText = assistantMsg.content ?? "";
            const finalMsg: ChatMessage = { role: "assistant", content: finalText };
            allNewMessages.push(finalMsg);
            setMessages([...updatedMessages, ...allNewMessages]);
            break;
          }

          // Push assistant message with tool_calls into loop
          loopMessages = [...loopMessages, assistantMsg];

          // Execute every tool call in parallel
          const toolResults = await Promise.all(
            assistantMsg.tool_calls.map(async (tc) => {
              const fnName = tc.function.name;
              const fnArgs = JSON.parse(tc.function.arguments || "{}");
              const executor = TOOL_MAP[fnName];

              let resultContent: string;
              if (executor) {
                try {
                  const result = await executor(fnArgs);
                  resultContent = JSON.stringify(result);
                } catch (err) {
                  resultContent = JSON.stringify({ error: String(err) });
                }
              } else {
                resultContent = JSON.stringify({ error: `Unknown tool: ${fnName}` });
              }

              return {
                role: "tool" as const,
                tool_call_id: tc.id,
                name: fnName,
                content: resultContent,
              };
            })
          );

          loopMessages = [...loopMessages, ...toolResults];

          // Track for display
          const toolMsgs: ChatMessage[] = toolResults.map((tr) => ({
            role: "tool",
            content: tr.content,
            tool_call_id: tr.tool_call_id,
            name: tr.name,
          }));
          allNewMessages = [...allNewMessages, ...toolMsgs];
          setMessages([...updatedMessages, ...allNewMessages]);
        }
      } catch (err) {
        const errMsg: ChatMessage = {
          role: "assistant",
          content: `⚠️ Error: ${err instanceof Error ? err.message : String(err)}`,
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsThinking(false);
      }
    },
    [messages, getClient]
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, isThinking, sendMessage, clearMessages };
}
