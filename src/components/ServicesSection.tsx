import { Button } from "@/components/ui/button";
import { Code2, Brain, Blocks, Cloud, Shield, Smartphone, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices. From responsive websites to complex enterprise platforms.",
      features: ["React & Next.js", "Node.js Backend", "Cloud Deployment"],
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Intelligent solutions that automate processes, predict outcomes, and unlock insights from your data.",
      features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics"],
    },
    {
      icon: Blocks,
      title: "Blockchain Development",
      description: "Secure, decentralized applications and smart contracts for the next generation of digital transactions.",
      features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms"],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to optimize your operations and reduce costs.",
      features: ["AWS & Azure", "DevOps", "Microservices"],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and ensure compliance.",
      features: ["Security Audits", "Penetration Testing", "Compliance"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "Flutter"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Comprehensive IT Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer a full spectrum of technology services to help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl glass-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:shadow-button transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="text-primary hover:text-primary-hover p-0 h-auto font-semibold group/btn">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
