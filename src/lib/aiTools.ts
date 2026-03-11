 /**
 * AI Agent Tools — SequenceIT Admin
 *
 * Every function here maps to a real Supabase (frontend) API call.
 * They are passed as `tools` to the Groq LLM so the AI can take actions
 * directly against the database on the admin's behalf.
 *
 * Tables covered:
 *   projects · team_members · testimonials · blog_posts
 *   careers  · case_studies  · documentation · faqs
 */

import { supabase } from "@/integrations/supabase/client";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Validate and sanitize image_url. Only accepts HTTP(S) URLs, rejects data URIs.
 */
function validateImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("data:")) {
    throw new Error("Image URL must be a valid HTTP/HTTPS URL, not embedded data. Please provide a public image URL.");
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    throw new Error("Image URL must start with http:// or https://");
  }
  return url;
}

/**
 * Coerce string booleans to actual booleans (LLMs often return "true"/"false" as strings).
 */
function toBoolean(value: boolean | string | undefined): boolean | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return undefined;
}

// The generated types.ts only covers the base 5 tables.
// The extra tables (blog_posts, careers, case_studies, documentation, faqs)
// exist in the DB but are not yet reflected in types.ts.
// We cast to `any` only for those to avoid TS errors without losing type
// safety on the known tables.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────

export async function listProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createProject(args: {
  title: string;
  description?: string;
  image_url?: string;
  category?: string;
  technologies?: string[];
  live_url?: string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  const { data, error } = await supabase.from("projects").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateProject(args: {
  id: string;
  title?: string;
  description?: string;
  image_url?: string;
  category?: string;
  technologies?: string[];
  live_url?: string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  const { id, ...fields } = args;
  const { data, error } = await supabase.from("projects").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteProject(args: { id: string }) {
  const { error } = await supabase.from("projects").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────

export async function listTeamMembers() {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createTeamMember(args: {
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  linkedin_url?: string;
  github_url?: string;
  team_category?: string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  const { data, error } = await supabase.from("team_members").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTeamMember(args: {
  id: string;
  name?: string;
  role?: string;
  bio?: string;
  image_url?: string;
  linkedin_url?: string;
  github_url?: string;
  team_category?: string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  const { id, ...fields } = args;
  const { data, error } = await supabase.from("team_members").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTeamMember(args: { id: string }) {
  const { error } = await supabase.from("team_members").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

export async function listTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createTestimonial(args: {
  name: string;
  role: string;
  company?: string;
  content: string;
  image_url?: string;
  rating?: number;
}) {
  args.image_url = validateImageUrl(args.image_url);
  const { data, error } = await supabase.from("testimonials").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTestimonial(args: {
  id: string;
  name?: string;
  role?: string;
  company?: string;
  content?: string;
  image_url?: string;
  rating?: number;
}) {
  args.image_url = validateImageUrl(args.image_url);
  const { id, ...fields } = args;
  const { data, error } = await supabase.from("testimonials").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTestimonial(args: { id: string }) {
  const { error } = await supabase.from("testimonials").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────────

export async function listBlogPosts() {
  const { data, error } = await db
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createBlogPost(args: {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  read_time?: string;
  is_featured?: boolean | string;
  published?: boolean | string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  args.is_featured = toBoolean(args.is_featured);
  args.published = toBoolean(args.published);
  const { data, error } = await db.from("blog_posts").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateBlogPost(args: {
  id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  category?: string;
  image_url?: string;
  read_time?: string;
  is_featured?: boolean | string;
  published?: boolean | string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  args.is_featured = toBoolean(args.is_featured);
  args.published = toBoolean(args.published);
  const { id, ...fields } = args;
  const { data, error } = await db.from("blog_posts").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBlogPost(args: { id: string }) {
  const { error } = await db.from("blog_posts").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// CAREERS
// ─────────────────────────────────────────────

export async function listCareers() {
  const { data, error } = await db
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createCareer(args: {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements?: string[];
  published?: boolean | string;
}) {
  args.published = toBoolean(args.published);
  const { data, error } = await db.from("careers").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCareer(args: {
  id: string;
  title?: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  requirements?: string[];
  published?: boolean | string;
}) {
  args.published = toBoolean(args.published);
  const { id, ...fields } = args;
  const { data, error } = await db.from("careers").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCareer(args: { id: string }) {
  const { error } = await db.from("careers").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// CASE STUDIES
// ─────────────────────────────────────────────

export async function listCaseStudies() {
  const { data, error } = await db
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createCaseStudy(args: {
  title: string;
  client: string;
  industry: string;
  image_url?: string;
  challenge: string;
  solution: string;
  testimonial?: string;
  tags?: string[];
  results?: { metric: string; value: string; icon: string }[];
  published?: boolean | string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  args.published = toBoolean(args.published);
  const { data, error } = await db.from("case_studies").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCaseStudy(args: {
  id: string;
  title?: string;
  client?: string;
  industry?: string;
  image_url?: string;
  challenge?: string;
  solution?: string;
  testimonial?: string;
  tags?: string[];
  results?: { metric: string; value: string; icon: string }[];
  published?: boolean | string;
}) {
  args.image_url = validateImageUrl(args.image_url);
  args.published = toBoolean(args.published);
  const { id, ...fields } = args;
  const { data, error } = await db.from("case_studies").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCaseStudy(args: { id: string }) {
  const { error } = await db.from("case_studies").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// DOCUMENTATION
// ─────────────────────────────────────────────

export async function listDocumentation() {
  const { data, error } = await db
    .from("documentation")
    .select("*")
    .order("category")
    .order("order_index");
  if (error) throw new Error(error.message);
  return data;
}

export async function createDocumentation(args: {
  title: string;
  category: string;
  content: string;
  icon?: string;
  order_index?: number;
  published?: boolean | string;
}) {
  args.published = toBoolean(args.published);
  const { data, error } = await db.from("documentation").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateDocumentation(args: {
  id: string;
  title?: string;
  category?: string;
  content?: string;
  icon?: string;
  order_index?: number;
  published?: boolean | string;
}) {
  args.published = toBoolean(args.published);
  const { id, ...fields } = args;
  const { data, error } = await db.from("documentation").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteDocumentation(args: { id: string }) {
  const { error } = await db.from("documentation").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────

export async function listFaqs() {
  const { data, error } = await db
    .from("faqs")
    .select("*")
    .order("category")
    .order("order_index");
  if (error) throw new Error(error.message);
  return data;
}

export async function createFaq(args: {
  question: string;
  answer: string;
  category: string;
  order_index?: number;
  published?: boolean | string;
}) {
  args.published = toBoolean(args.published);
  const { data, error } = await db.from("faqs").insert(args).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateFaq(args: {
  id: string;
  question?: string;
  answer?: string;
  category?: string;
  order_index?: number;
  published?: boolean | string;
}) {
  args.published = toBoolean(args.published);
  const { id, ...fields } = args;
  const { data, error } = await db.from("faqs").update(fields).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFaq(args: { id: string }) {
  const { error } = await db.from("faqs").delete().eq("id", args.id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ─────────────────────────────────────────────
// DASHBOARD STATS (read-only)
// ─────────────────────────────────────────────

export async function getDashboardStats() {
  const [projectsRes, teamRes, testimonialsRes, blogRes, careersRes, caseStudiesRes, docsRes, faqsRes] =
    await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("team_members").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      db.from("blog_posts").select("id", { count: "exact", head: true }),
      db.from("careers").select("id", { count: "exact", head: true }),
      db.from("case_studies").select("id", { count: "exact", head: true }),
      db.from("documentation").select("id", { count: "exact", head: true }),
      db.from("faqs").select("id", { count: "exact", head: true }),
    ]);
  return {
    projects: projectsRes.count ?? 0,
    teamMembers: teamRes.count ?? 0,
    testimonials: testimonialsRes.count ?? 0,
    blogPosts: blogRes.count ?? 0,
    careers: careersRes.count ?? 0,
    caseStudies: caseStudiesRes.count ?? 0,
    documentation: docsRes.count ?? 0,
    faqs: faqsRes.count ?? 0,
  };
}
