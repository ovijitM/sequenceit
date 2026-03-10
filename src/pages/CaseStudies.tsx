import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap, DollarSign, Loader2 } from "lucide-react";

interface ResultItem {
  metric: string;
  value: string;
  icon: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  image_url?: string | null;
  challenge: string;
  solution: string;
  testimonial?: string | null;
  tags: string[];
  results: ResultItem[];
  published: boolean;
  created_at: string;
}

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  Zap,
  DollarSign,
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const db = supabase as any;
        const { data, error } = await db
          .from("case_studies")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setCaseStudies(data || []);
      } catch (err) {
        console.error("Error fetching case studies:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Case Studies</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Real stories of transformation, innovation, and success from our clients across various industries.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div><div className="text-4xl font-bold text-primary mb-2">100+</div><div className="text-muted-foreground">Projects Delivered</div></div>
              <div><div className="text-4xl font-bold text-primary mb-2">50+</div><div className="text-muted-foreground">Happy Clients</div></div>
              <div><div className="text-4xl font-bold text-primary mb-2">98%</div><div className="text-muted-foreground">Success Rate</div></div>
              <div><div className="text-4xl font-bold text-primary mb-2">15+</div><div className="text-muted-foreground">Industries Served</div></div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No case studies published yet. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-16">
                {caseStudies.map((study, index) => (
                  <Card key={study.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                    <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                      {study.image_url && (
                        <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                          <img
                            src={study.image_url}
                            alt={study.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <Badge className="absolute top-4 left-4">{study.industry}</Badge>
                        </div>
                      )}
                      <div className={`p-8 flex flex-col justify-center ${!study.image_url ? "lg:col-span-2" : ""}`}>
                        {!study.image_url && (
                          <Badge className="w-fit mb-4">{study.industry}</Badge>
                        )}
                        <h3 className="font-display text-3xl font-bold mb-2">{study.title}</h3>
                        <p className="text-primary font-semibold mb-6">{study.client}</p>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">Challenge:</h4>
                          <p className="text-muted-foreground">{study.challenge}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">Solution:</h4>
                          <p className="text-muted-foreground">{study.solution}</p>
                        </div>

                        {study.results && study.results.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">Results:</h4>
                            <div className="grid grid-cols-3 gap-4">
                              {study.results.map((result, idx) => {
                                const IconComp = iconMap[result.icon] ?? TrendingUp;
                                return (
                                  <div key={idx} className="text-center p-3 bg-primary/5 rounded-lg">
                                    <IconComp className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="font-bold text-primary">{result.value}</div>
                                    <div className="text-xs text-muted-foreground">{result.metric}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {study.testimonial && (
                          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-6">
                            "{study.testimonial}"
                          </blockquote>
                        )}

                        {study.tags && study.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {study.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        )}

                        <Button className="w-fit group">
                          Read Full Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with cutting-edge technology solutions.
            </p>
            <Button size="lg" variant="secondary" className="group">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;

