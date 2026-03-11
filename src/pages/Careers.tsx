import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, ArrowRight, Loader2 } from "lucide-react";

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  published: boolean;
  created_at: string;
}

const Careers = () => {
  const navigate = useNavigate();
  const [openPositions, setOpenPositions] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleApply = (job: Career) => {
    const slug = `${job.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${job.id.slice(0, 8)}`;
    navigate(`/careers/${slug}/apply`, { state: { jobId: job.id } });
  };

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const db = supabase as any;
        const { data, error } = await db
          .from("careers")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setOpenPositions(data || []);
      } catch (err) {
        console.error("Error fetching careers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Build the future with us. We're always looking for talented individuals who are passionate about technology and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our current openings and find your perfect role.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : openPositions.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No open positions at this time.</p>
                <p className="mt-2">Check back soon or send us a general application below.</p>
              </div>
            ) : (
              <div className="grid gap-6 max-w-5xl mx-auto">
                {openPositions.map((position) => (
                  <Card key={position.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                          <CardDescription className="text-base">{position.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          {position.department}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />{position.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />{position.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {position.requirements && position.requirements.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Requirements:</h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, idx) => (
                              <li key={idx} className="text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button className="w-full sm:w-auto group" onClick={() => handleApply(position)}>
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
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
              Don't See a Perfect Fit?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" variant="secondary" className="group">
              Send General Application
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
