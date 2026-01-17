import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Brain, Blocks } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-accent-foreground">
                Trusted by 500+ Companies Worldwide
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Innovative IT Solutions for{" "}
              <span className="text-gradient">Modern Business</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
              We transform ideas into powerful digital solutions. From cutting-edge web applications to AI-powered systems and blockchain innovations — we deliver excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="hero-outline">
                View Our Work
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Expert Developers</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-4 left-8 p-4 bg-card rounded-xl shadow-card animate-float border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Web Development</p>
                    <p className="text-sm text-muted-foreground">120+ Projects</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-32 -right-4 p-4 bg-card rounded-xl shadow-card animate-float border border-border" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Solutions</p>
                    <p className="text-sm text-muted-foreground">85+ Projects</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 left-4 p-4 bg-card rounded-xl shadow-card animate-float border border-border" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Blocks className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Blockchain</p>
                    <p className="text-sm text-muted-foreground">60+ Projects</p>
                  </div>
                </div>
              </div>

              {/* Main Visual Element */}
              <div className="w-full aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-2xl" />
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-secondary to-background border border-border overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-primary opacity-80 blur-xl animate-pulse-glow" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
                      <span className="text-primary-foreground font-display font-bold text-3xl">N</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
