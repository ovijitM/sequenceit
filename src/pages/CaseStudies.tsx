import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap, DollarSign } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Global E-Commerce Platform Transformation",
      client: "TechMart International",
      industry: "E-Commerce",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      challenge: "TechMart needed to modernize their legacy e-commerce platform to handle 10x traffic during peak seasons while reducing infrastructure costs.",
      solution: "We implemented a cloud-native microservices architecture using Kubernetes, integrated AI-powered recommendations, and optimized their database layer.",
      results: [
        { metric: "Performance", value: "300%", icon: Zap },
        { metric: "Cost Reduction", value: "45%", icon: DollarSign },
        { metric: "Uptime", value: "99.99%", icon: TrendingUp }
      ],
      testimonial: "SequenceIT transformed our business. We can now handle Black Friday traffic without breaking a sweat.",
      tags: ["Cloud Migration", "Microservices", "AI Integration"]
    },
    {
      id: 2,
      title: "Healthcare Data Management System",
      client: "MediCare Solutions",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      challenge: "MediCare needed a HIPAA-compliant system to manage patient records across 50+ clinics with real-time synchronization.",
      solution: "Built a secure, distributed database system with end-to-end encryption, automated backups, and a user-friendly mobile interface for healthcare providers.",
      results: [
        { metric: "Data Processing", value: "5x Faster", icon: Zap },
        { metric: "Security Score", value: "100%", icon: TrendingUp },
        { metric: "User Adoption", value: "95%", icon: Users }
      ],
      testimonial: "The system has revolutionized how we handle patient data. It's secure, fast, and incredibly user-friendly.",
      tags: ["Healthcare", "Security", "Mobile Development"]
    },
    {
      id: 3,
      title: "DeFi Trading Platform Launch",
      client: "CryptoFlow Exchange",
      industry: "Blockchain/Fintech",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
      challenge: "CryptoFlow wanted to launch a decentralized exchange with low transaction fees and high-speed trading capabilities.",
      solution: "Developed smart contracts on Polygon, implemented Layer 2 scaling solutions, and created an intuitive trading interface with real-time analytics.",
      results: [
        { metric: "Transaction Speed", value: "2000 TPS", icon: Zap },
        { metric: "Gas Fees", value: "90% Lower", icon: DollarSign },
        { metric: "Daily Users", value: "50K+", icon: Users }
      ],
      testimonial: "SequenceIT delivered a platform that exceeded our expectations. Our users love the speed and low fees.",
      tags: ["Blockchain", "Smart Contracts", "DeFi"]
    },
    {
      id: 4,
      title: "AI-Powered Customer Service Platform",
      client: "ServiceHub Inc",
      industry: "SaaS",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      challenge: "ServiceHub needed to scale customer support without proportionally increasing headcount while maintaining quality.",
      solution: "Implemented an AI chatbot using GPT-4, integrated with their CRM, and built a smart routing system for complex queries.",
      results: [
        { metric: "Response Time", value: "70% Faster", icon: Zap },
        { metric: "Resolution Rate", value: "85%", icon: TrendingUp },
        { metric: "Cost Savings", value: "$2M/year", icon: DollarSign }
      ],
      testimonial: "The AI platform handles 85% of queries automatically, letting our team focus on complex issues.",
      tags: ["AI/ML", "Chatbots", "Automation"]
    },
    {
      id: 5,
      title: "Real-Time Analytics Dashboard",
      client: "DataViz Corp",
      industry: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      challenge: "DataViz needed to process and visualize billions of data points in real-time for their enterprise clients.",
      solution: "Built a scalable data pipeline using Apache Kafka and ClickHouse, with interactive dashboards using React and D3.js.",
      results: [
        { metric: "Data Processing", value: "1B+ records/day", icon: Zap },
        { metric: "Query Speed", value: "10x Faster", icon: TrendingUp },
        { metric: "Client Growth", value: "200%", icon: Users }
      ],
      testimonial: "Our clients can now make data-driven decisions in real-time. It's been a game-changer for our business.",
      tags: ["Big Data", "Real-time Analytics", "Visualization"]
    },
    {
      id: 6,
      title: "Mobile Banking Application",
      client: "NeoBank Digital",
      industry: "Fintech",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=500&fit=crop",
      challenge: "NeoBank wanted to launch a mobile-first banking app with advanced security and seamless user experience.",
      solution: "Developed native iOS and Android apps with biometric authentication, real-time notifications, and AI-powered financial insights.",
      results: [
        { metric: "App Downloads", value: "500K+", icon: Users },
        { metric: "App Rating", value: "4.8/5", icon: TrendingUp },
        { metric: "Transaction Volume", value: "$100M+", icon: DollarSign }
      ],
      testimonial: "SequenceIT delivered a world-class mobile banking experience. Our user engagement has skyrocketed.",
      tags: ["Mobile Development", "Fintech", "Security"]
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
                Case Studies
              </h1>
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
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <Card key={study.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                  <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={study.image}
                        alt={study.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4">{study.industry}</Badge>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-display text-3xl font-bold mb-2">
                        {study.title}
                      </h3>
                      <p className="text-primary font-semibold mb-6">{study.client}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Challenge:</h4>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Solution:</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Results:</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="text-center p-3 bg-primary/5 rounded-lg">
                              <result.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                              <div className="font-bold text-primary">{result.value}</div>
                              <div className="text-xs text-muted-foreground">{result.metric}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-6">
                        "{study.testimonial}"
                      </blockquote>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      
                      <Button className="w-fit group">
                        Read Full Case Study
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
