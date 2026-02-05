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
  Settings
} from "lucide-react";

const Documentation = () => {
  const docCategories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Quick start guides and tutorials to get you up and running",
      articles: [
        { title: "Introduction to SequenceIT Services", href: "#" },
        { title: "Your First Project Setup", href: "#" },
        { title: "Authentication & Authorization", href: "#" },
        { title: "Best Practices Guide", href: "#" }
      ]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation with code examples",
      articles: [
        { title: "REST API Overview", href: "#" },
        { title: "GraphQL API Guide", href: "#" },
        { title: "Webhooks & Events", href: "#" },
        { title: "Rate Limiting & Throttling", href: "#" }
      ]
    },
    {
      icon: Blocks,
      title: "Integrations",
      description: "Connect with third-party services and platforms",
      articles: [
        { title: "Cloud Platforms Integration", href: "#" },
        { title: "Database Connections", href: "#" },
        { title: "CI/CD Pipeline Setup", href: "#" },
        { title: "Third-Party APIs", href: "#" }
      ]
    },
    {
      icon: Settings,
      title: "Configuration",
      description: "Customize and configure your applications",
      articles: [
        { title: "Environment Variables", href: "#" },
        { title: "Security Settings", href: "#" },
        { title: "Performance Optimization", href: "#" },
        { title: "Deployment Options", href: "#" }
      ]
    },
    {
      icon: Lightbulb,
      title: "Tutorials",
      description: "Step-by-step guides for common use cases",
      articles: [
        { title: "Building a Full-Stack App", href: "#" },
        { title: "Implementing AI Features", href: "#" },
        { title: "Blockchain Integration", href: "#" },
        { title: "Mobile App Development", href: "#" }
      ]
    },
    {
      icon: FileText,
      title: "Resources",
      description: "Additional documentation and reference materials",
      articles: [
        { title: "Code Samples Repository", href: "#" },
        { title: "Architecture Patterns", href: "#" },
        { title: "Troubleshooting Guide", href: "#" },
        { title: "Migration Guides", href: "#" }
      ]
    }
  ];

  const popularDocs = [
    {
      title: "Quick Start Guide",
      description: "Get started with SequenceIT in 5 minutes",
      badge: "Popular"
    },
    {
      title: "API Authentication",
      description: "Learn how to authenticate API requests",
      badge: "Essential"
    },
    {
      title: "Deployment Best Practices",
      description: "Production-ready deployment strategies",
      badge: "Recommended"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to build, deploy, and scale with SequenceIT
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-12 pr-4 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Docs */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl font-bold mb-6">Popular Documentation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {popularDocs.map((doc, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {doc.badge}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {doc.title}
                    </CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docCategories.map((category, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <category.icon className="w-10 h-10 text-primary mb-4" />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.articles.map((article, idx) => (
                        <li key={idx}>
                          <a
                            href={article.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                          >
                            <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
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
            <Button size="lg" className="group">
              Contact Support
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
