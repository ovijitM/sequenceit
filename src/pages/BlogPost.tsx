import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url?: string | null;
  read_time: string;
  is_featured: boolean;
  published: boolean;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = (location.state as any)?.postId || slug?.split("-").pop();
        
        if (!postId) {
          setError("Post not found");
          setIsLoading(false);
          return;
        }

        const db = supabase as any;
        const { data, error: fetchError } = await db
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .eq("published", true)
          .single();

        if (fetchError || !data) {
          setError("Post not found");
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Error loading post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, location.state]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section with Image */}
        {post.image_url && (
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>

            {/* Meta Information */}
            <div className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
              {post.is_featured && <Badge variant="secondary" className="ml-2">Featured</Badge>}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Article Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time}
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground mb-8 italic">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mb-12">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back to Blog Button */}
            <div className="mt-12 pt-8 border-t">
              <Button onClick={() => navigate("/blog")} size="lg">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </div>
          </div>
        </article>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Don't Miss Our Latest Articles
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to get the latest posts delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background/95 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" variant="secondary">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
