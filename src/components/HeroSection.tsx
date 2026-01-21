import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Brain, Blocks } from "lucide-react";
import Lottie from "lottie-react";
import itDealAnimation from "../../IT Deal.json";

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
                Trusted by 15+ Companies Worldwide
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Innovative IT Solutions for{" "}
              <span className="text-gradient">Modern Business</span>
            </h1>

            <p
              className="text-lg text-muted-foreground max-w-xl animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              We transform ideas into powerful digital solutions. From
              cutting-edge web applications to AI-powered systems and blockchain
              innovations — we deliver excellence.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a href="#contact">
                <Button variant="hero">
                  Say Hello
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#projects">
                <Button variant="hero-outline">View Our Work</Button>
              </a>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  30+
                </p>
                <p className="text-sm text-muted-foreground">
                  Projects Delivered
                </p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  97%
                </p>
                <p className="text-sm text-muted-foreground">
                  Client Satisfaction
                </p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">
                  7+
                </p>
                <p className="text-sm text-muted-foreground">
                  Expert Developers
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Lottie Animation */}
              <div className="w-full max-w-lg mx-auto">
                <Lottie
                  animationData={itDealAnimation}
                  loop={true}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
