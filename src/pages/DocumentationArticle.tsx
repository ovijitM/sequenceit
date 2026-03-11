import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code,
  Blocks,
  Rocket,
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

const DocumentationArticle = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [doc, setDoc] = useState<Doc | null>(null);
  const [siblings, setSiblings] = useState<Doc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docId = (location.state as any)?.docId || slug?.split("-").pop();
        if (!docId) { setIsLoading(false); return; }

        const db = supabase as any;
        const { data, error } = await db
          .from("documentation")
          .select("*")
          .eq("id", docId)
          .eq("published", true)
          .single();

        if (!error && data) {
          setDoc(data);
          // fetch sibling articles in same category
          const { data: sibData } = await db
            .from("documentation")
            .select("id, title, order_index, category")
            .eq("published", true)
            .eq("category", data.category)
            .order("order_index");
          setSiblings(sibData || []);
        }
      } catch (err) {
        console.error("Error fetching doc:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoc();
  }, [slug, location.state]);

  const handleSiblingClick = (d: Doc) => {
    const s = `${d.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${d.id.slice(0, 8)}`;
    navigate(`/documentation/${s}`, { state: { docId: d.id } });
  };

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

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">This documentation article doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/documentation")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Documentation
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComp = categoryIconMap[doc.category] ?? categoryIconMap.default;
  const currentIndex = siblings.findIndex((s) => s.id === doc.id);
  const prevDoc = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextDoc = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-10">
          <Button variant="ghost" className="mb-8" onClick={() => navigate("/documentation")}>
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Documentation
          </Button>

          <div className="grid lg:grid-cols-4 gap-10">

            {/* Sidebar — Category Nav */}
            {siblings.length > 1 && (
              <aside className="lg:col-span-1">
                <Card className="sticky top-24 border-2">
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2 mb-4">
                      <IconComp className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-sm">{doc.category}</span>
                    </div>
                    <ul className="space-y-1">
                      {siblings.map((s) => (
                        <li key={s.id}>
                          <button
                            onClick={() => handleSiblingClick(s)}
                            className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                              s.id === doc.id
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            {s.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </aside>
            )}

            {/* Main Article */}
            <article className={siblings.length > 1 ? "lg:col-span-3" : "lg:col-span-4"}>
              {/* Header */}
              <div className="mb-8 pb-8 border-b">
                <Badge className="mb-4 flex items-center gap-1.5 w-fit">
                  <IconComp className="w-3.5 h-3.5" />
                  {doc.category}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{doc.title}</h1>
              </div>

              {/* Content */}
              <div className="prose prose-base dark:prose-invert max-w-none mb-12">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="font-display text-4xl font-bold mt-10 mb-6 leading-tight">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-display text-3xl font-bold mt-10 mb-5 leading-tight">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-display text-2xl font-semibold mt-8 mb-4 leading-snug">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="font-display text-xl font-semibold mt-6 mb-3">{children}</h4>
                    ),
                    h5: ({ children }) => (
                      <h5 className="font-display text-lg font-semibold mt-5 mb-2">{children}</h5>
                    ),
                    h6: ({ children }) => (
                      <h6 className="font-display text-base font-semibold mt-4 mb-2 text-muted-foreground">{children}</h6>
                    ),
                    p: ({ children }) => (
                      <p className="mb-5 leading-relaxed">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">{children}</blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = !!className;
                      return isBlock ? (
                        <code className={className}>{children}</code>
                      ) : (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm font-mono">{children}</pre>
                    ),
                    hr: () => <hr className="my-8 border-border" />,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">{children}</a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full border-collapse text-sm">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-border px-4 py-2">{children}</td>
                    ),
                  }}
                >
                  {doc.content.replace(/\\n/g, "\n")}
                </ReactMarkdown>
              </div>

              {/* Prev / Next Navigation */}
              {(prevDoc || nextDoc) && (
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t">
                  {prevDoc ? (
                    <Button variant="outline" className="flex-1 justify-start group" onClick={() => handleSiblingClick(prevDoc)}>
                      <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Previous</div>
                        <div className="text-sm font-medium">{prevDoc.title}</div>
                      </div>
                    </Button>
                  ) : <div className="flex-1" />}

                  {nextDoc && (
                    <Button variant="outline" className="flex-1 justify-end group" onClick={() => handleSiblingClick(nextDoc)}>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Next</div>
                        <div className="text-sm font-medium">{nextDoc.title}</div>
                      </div>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentationArticle;
