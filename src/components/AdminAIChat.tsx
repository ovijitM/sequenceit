/**
 * AdminAIChat — floating, resizable chat popup for the admin dashboard.
 *
 * Features:
 *  • Full markdown rendering — tables, links, bold, italic, headings (h1-h3),
 *    inline code, code blocks, lists
 *  • Drag-to-resize from the top-left corner grip handle
 *  • Expand / collapse toggle (wide mode)
 *  • Tool-call pills (collapsible JSON inspector)
 *  • Auto-scroll on new messages
 */

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot, X, Send, Loader2, ChevronDown, ChevronRight,
  Trash2, Maximize2, Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGroqAgent } from "@/hooks/useGroqAgent";
import { cn } from "@/lib/utils";

// ─── Markdown renderer ────────────────────────────────────────────────────────

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-3 mb-1.5 text-base font-bold text-foreground border-b border-border pb-1">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-2.5 mb-1 text-sm font-bold text-foreground">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-2 mb-0.5 text-sm font-semibold text-foreground/90">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-1.5 last:mb-0 leading-relaxed">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-foreground/80">{children}</em>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-80 break-all"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="my-1 ml-4 list-disc space-y-0.5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-1 ml-4 list-decimal space-y-0.5">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        code: ({ children, className }) => {
          const isBlock = !!className?.includes("language-");
          return isBlock ? (
            <code className="block overflow-x-auto rounded-md bg-muted p-2 text-[11px] font-mono leading-relaxed whitespace-pre">
              {children}
            </code>
          ) : (
            <code className="rounded bg-muted px-1 py-0.5 text-[11px] font-mono text-primary/90">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-1.5 rounded-md bg-muted overflow-hidden">{children}</pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-1.5 border-l-2 border-primary/40 pl-3 text-muted-foreground italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-2 border-border" />,
        table: ({ children }) => (
          <div className="my-2 overflow-x-auto rounded-md border border-border">
            <table className="w-full text-xs">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
        tr: ({ children }) => <tr className="hover:bg-muted/30">{children}</tr>,
        th: ({ children }) => (
          <th className="px-2.5 py-1.5 text-left font-semibold text-foreground whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-2.5 py-1.5 text-muted-foreground">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Tool call pill ───────────────────────────────────────────────────────────

function ToolCallPill({ name, content }: { name: string; content: string }) {
  const [open, setOpen] = useState(false);
  let parsed: unknown = content;
  try { parsed = JSON.parse(content); } catch { /* keep raw */ }

  return (
    <div className="my-1 rounded-md border border-border/40 bg-muted/30 text-xs">
      <button
        className="flex w-full items-center gap-1.5 px-2 py-1 text-muted-foreground hover:text-foreground"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        <span className="font-mono font-semibold text-primary/80">{name}()</span>
        <span className="ml-auto opacity-50">tool result</span>
      </button>
      {open && (
        <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all px-3 pb-2 text-[10px] text-muted-foreground">
          {typeof parsed === "object" ? JSON.stringify(parsed, null, 2) : String(parsed)}
        </pre>
      )}
    </div>
  );
}

// ─── Single message ───────────────────────────────────────────────────────────

function Message({ role, content, name }: {
  role: "user" | "assistant" | "tool";
  content: string;
  name?: string;
}) {
  if (role === "tool") return <ToolCallPill name={name ?? "tool"} content={content} />;

  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border text-foreground rounded-bl-sm"
        )}
      >
        {isUser
          ? <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p>
          : <MarkdownContent content={content} />
        }
      </div>
    </div>
  );
}

// ─── Size constants ───────────────────────────────────────────────────────────

const SIZE_DEFAULT  = { w: 400, h: 540 };
const SIZE_EXPANDED = { w: 720, h: 700 };
const MIN_W = 320, MIN_H = 360, MAX_W = 1100, MAX_H = 900;

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminAIChat() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [size,       setSize]       = useState(SIZE_DEFAULT);
  const [input,      setInput]      = useState("");

  const { messages, isThinking, sendMessage, clearMessages } = useGroqAgent();
  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragging    = useRef(false);
  const dragStart   = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Focus on open
  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 100);
  }, [isOpen]);

  // Snap size on expand toggle
  useEffect(() => {
    setSize(isExpanded ? SIZE_EXPANDED : SIZE_DEFAULT);
  }, [isExpanded]);

  // Drag-resize from top-left corner
  const onDragMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const dw = dragStart.current.x - ev.clientX;
      const dh = dragStart.current.y - ev.clientY;
      setSize({
        w: Math.min(MAX_W, Math.max(MIN_W, dragStart.current.w + dw)),
        h: Math.min(MAX_H, Math.max(MIN_H, dragStart.current.h + dh)),
      });
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp, { once: true });
  }, [size]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isThinking) return;
    setInput("");
    sendMessage(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* ── Floating toggle button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200",
          "bg-primary text-primary-foreground hover:scale-110",
          isOpen && "scale-90 opacity-80"
        )}
        title="AI Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/20"
          style={{ width: size.w, height: size.h }}
        >
          {/* Drag-resize grip — top-left corner */}
          <div
            onMouseDown={onDragMouseDown}
            className="absolute top-0 left-0 z-10 h-6 w-6 cursor-nw-resize group select-none"
            title="Drag to resize"
          >
            <svg
              className="absolute top-1 left-1 text-muted-foreground opacity-20 group-hover:opacity-60 transition-opacity"
              width="14" height="14" viewBox="0 0 12 12"
            >
              {[0,4,8].flatMap(x => [0,4,8].map(y =>
                <circle key={`${x}${y}`} cx={x+1} cy={y+1} r="1" fill="currentColor" />
              ))}
            </svg>
          </div>

          {/* ── Header ── */}
          <div className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">SequenceIT AI</p>
              <p className="text-xs text-muted-foreground truncate">
                Admin Assistant · {import.meta.env.VITE_GROQ_MODEL || "llama-3.3-70b-versatile"}
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(e => !e)}
              title={isExpanded ? "Collapse" : "Expand"}
              className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={clearMessages}
              title="Clear conversation"
              className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* ── Messages ── */}
          <ScrollArea className="flex-1 min-h-0 px-3 py-2">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-muted-foreground">
                <Bot className="h-10 w-10 opacity-20" />
                <p className="text-sm font-medium">How can I help you today?</p>
                <p className="max-w-[260px] text-xs opacity-70">
                  I can create, update, delete, or list any content on the site — just ask me naturally.
                </p>
                <div className="mt-2 flex flex-col gap-1.5 w-full max-w-[300px]">
                  {[
                    "Show me all projects",
                    "Add a new blog post about React",
                    "How many team members do we have?",
                    "Delete the FAQ about pricing",
                  ].map((hint) => (
                    <button
                      key={hint}
                      onClick={() => { setInput(hint); textareaRef.current?.focus(); }}
                      className="rounded-lg border border-border/60 px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {messages.map((msg, i) => (
                <Message key={i} role={msg.role} content={msg.content} name={msg.name} />
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Thinking…</span>
                  </div>
                </div>
              )}
            </div>
            <div ref={bottomRef} />
          </ScrollArea>

          {/* ── Input ── */}
          <div className="shrink-0 border-t border-border bg-card p-3">
            <div className="flex items-end gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything… (Enter to send)"
                className="max-h-28 min-h-[40px] resize-none rounded-xl border-border bg-background text-sm"
                rows={1}
                disabled={isThinking}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="h-10 w-10 shrink-0 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground/50">
              Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
}
