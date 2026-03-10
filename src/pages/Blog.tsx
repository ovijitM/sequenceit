import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Loader2 } from "lucide-react";

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

const Blog = () => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const handleReadMore = (postId: string, title: string) => {
    const slug = `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${postId.slice(0, 8)}`;
    navigate(`/blog/${slug}`, { state: { postId } });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const db = supabase as any;
        const { data, error } = await db
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        const posts: BlogPost[] = data || [];
        setAllPosts(posts);
        setBlogPosts(posts);
        setCategories(["All", ...Array.from(new Set(posts.map((p) => p.category))) as string[]]);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Update categories whenever allPosts changes (e.g., new posts added via AI)
  useEffect(() => {
    if (allPosts.length > 0) {
      const updatedCategories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category))) as string[]];
      setCategories(updatedCategories);
      // If active category no longer exists, reset to "All"
      if (!updatedCategories.includes(activeCategory)) {
        setActiveCategory("All");
        setBlogPosts(allPosts);
      }
    }
  }, [allPosts]);

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    setBlogPosts(cat === "All" ? allPosts : allPosts.filter((p) => p.category === cat));
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const featuredPost = blogPosts.find((p) => p.is_featured) ?? blogPosts[0];
  const otherPosts = featuredPost ? blogPosts.filter((p) => p.id !== featuredPost.id) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Our Blog</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Insights, tutorials, and thought leadership from our team of experts in technology and innovation.
              </p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : allPosts.length === 0 ? (
          <section className="py-32">
            <div className="container mx-auto px-4 text-center">
              <p className="text-xl text-muted-foreground">No blog posts published yet. Check back soon!</p>
            </div>
          </section>
        ) : (
          <>
            {/* Category Filter */}
            {categories.length > 2 && (
              <section className="py-8 border-b">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={activeCategory === cat ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleFilter(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Featured Post */}
            {featuredPost && (
              <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                  <Badge className="mb-4">Featured Post</Badge>
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                    <div className="grid md:grid-cols-2 gap-6">
                      {featuredPost.image_url && (
                        <div className="relative h-64 md:h-auto">
                          <img
                            src={featuredPost.image_url}
                            alt={featuredPost.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={`p-6 md:p-8 flex flex-col justify-center ${!featuredPost.image_url ? "md:col-span-2" : ""}`}>
                        <Badge variant="secondary" className="w-fit mb-3">{featuredPost.category}</Badge>
                        <h2 className="font-display text-3xl font-bold mb-4">{featuredPost.title}</h2>
                        <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-2"><User className="w-4 h-4" />{featuredPost.author}</span>
                          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(featuredPost.created_at)}</span>
                          <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{featuredPost.read_time}</span>
                        </div>
                        <Button className="w-fit group" onClick={() => handleReadMore(featuredPost.id, featuredPost.title)}>
                          Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            )}

            {/* Other Posts */}
            {otherPosts.length > 0 && (
              <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4 lg:px-8">
                  <h2 className="font-display text-3xl font-bold mb-12 text-center">Latest Articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {otherPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                        {post.image_url && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                            <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.created_at)}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time}</span>
                          </div>
                          <Button variant="outline" className="w-full group" onClick={() => handleReadMore(post.id, post.title)}>
                            Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest articles, insights, and updates delivered directly to your inbox.
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

export default Blog;
