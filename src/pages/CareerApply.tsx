import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, ArrowLeft, Send, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const CareerApply = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [job, setJob] = useState<Career | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    linkedin: "",
    coverLetter: "",
    resumeUrl: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobId = (location.state as any)?.jobId || slug?.split("-").pop();
        if (!jobId) { setIsLoading(false); return; }

        const db = supabase as any;
        const { data, error } = await db
          .from("careers")
          .select("*")
          .eq("id", jobId)
          .eq("published", true)
          .single();

        if (!error && data) setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [slug, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.coverLetter) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    // Simulate submission — replace with your actual API/email endpoint
    await new Promise((res) => setTimeout(res, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast({ title: "Application submitted!", description: "We'll be in touch soon." });
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

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-3xl font-bold mb-4">Position Not Found</h1>
            <p className="text-muted-foreground mb-6">This position doesn't exist or is no longer available.</p>
            <Button onClick={() => navigate("/careers")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Careers
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto px-4 py-20">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-muted-foreground mb-2 text-lg">
              Thanks for applying for <span className="font-semibold text-foreground">{job.title}</span>.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team will review your application and get back to you within 5–7 business days.
            </p>
            <Button onClick={() => navigate("/careers")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Careers
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
        {/* Hero */}
        <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <Button variant="ghost" className="mb-6" onClick={() => navigate("/careers")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Careers
            </Button>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge className="mb-3">{job.department}</Badge>
                <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{job.location}</span>
                  <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" />{job.type}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10">

              {/* Left — Job Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>About This Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </CardContent>
                </Card>

                {job.requirements && job.requirements.length > 0 && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right — Application Form */}
              <div className="lg:col-span-3">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Apply for This Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
                          <Input id="fullName" name="fullName" placeholder="Jane Doe" value={form.fullName} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                          <Input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn Profile</Label>
                          <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio / Website</Label>
                        <Input id="portfolio" name="portfolio" type="url" placeholder="https://yourportfolio.com" value={form.portfolio} onChange={handleChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resumeUrl">Resume URL</Label>
                        <Input id="resumeUrl" name="resumeUrl" type="url" placeholder="Link to your resume (Google Drive, Dropbox, etc.)" value={form.resumeUrl} onChange={handleChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Cover Letter <span className="text-destructive">*</span></Label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          rows={6}
                          placeholder="Tell us why you're a great fit for this role..."
                          value={form.coverLetter}
                          onChange={handleChange}
                          required
                          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Submitting...</>
                        ) : (
                          <><Send className="mr-2 w-4 h-4" /> Submit Application</>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to our{" "}
                        <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareerApply;
