import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Code,
  Blocks,
  Rocket,
  Search,
  ArrowRight,
  FileText,
  Lightbulb,
  Settings,
  Loader2,
} from "lucide-react";

interface Doc {
  id: string;
  title: string;
  category: string;
  content: string;
  icon: string;
  order_index: number;
  published: boolean;
}

const categoryIconMap: Record<string, React.ElementType> = {
  "Getting Started": Rocket,
  "API Reference": Code,
  "Core Features": Blocks,
  "Advanced Topics": Lightbulb,
  "Best Practices": FileText,
  "Troubleshooting": Settings,
  default: BookOpen,
};

const Documentation = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleDocClick = (doc: Doc) => {
    const slug = `${doc.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${doc.id.slice(0, 8)}`;
    navigate(`/documentation/${slug}`, { state: { docId: doc.id } });
  };

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const db = supabase as any;
        const { data, error } = await db
          .from("documentation")
          .select("*")
          .eq("published", true)
          .order("category")
          .order("order_index");
        if (error) throw error;
        setDocs(data || []);
      } catch (err) {
        console.error("Error fetching documentation:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocs();
  }, []);

  // Group docs by category
  const grouped = docs.reduce<Record<string, Doc[]>>((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  // Filter by search
  const filteredGroups = Object.entries(grouped).reduce<Record<string, Doc[]>>((acc, [cat, items]) => {
    const filtered = items.filter(
      (d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.content.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 0) acc[cat] = filtered;
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Documentation</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to build, deploy, and scale with SequenceIT
              </p>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-12 pr-4 py-6 text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : docs.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No documentation published yet.</p>
              </div>
            ) : Object.keys(filteredGroups).length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No results found for "{search}".</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(filteredGroups).map(([category, items]) => {
                  const IconComp = categoryIconMap[category] ?? categoryIconMap.default;
                  return (
                    <Card key={category} className="border-2 hover:border-primary/50 transition-all">
                      <CardHeader>
                        <IconComp className="w-10 h-10 text-primary mb-4" />
                        <CardTitle className="text-xl">{category}</CardTitle>
                        <CardDescription>{items.length} article{items.length !== 1 ? "s" : ""}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {items.map((doc) => (
                            <li key={doc.id}>
                              <button
                                onClick={() => handleDocClick(doc)}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-left w-full">
                                <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all shrink-0" />
                                {doc.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our support team is here to help. Get in touch with us for personalized assistance.
            </p>
            <Button size="lg" className="group" asChild>
              <a href="/support">
                Contact Support
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
