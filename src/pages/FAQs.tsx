import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, BookOpen, CreditCard, Shield, Code } from "lucide-react";

const FAQs = () => {
  const faqCategories = [
    {
      icon: BookOpen,
      title: "General",
      faqs: [
        {
          question: "What services does SequenceIT offer?",
          answer: "SequenceIT offers a comprehensive range of technology services including web development, AI & machine learning solutions, blockchain development, cloud services, mobile app development, and DevOps consulting. We work with businesses of all sizes to transform their digital presence and operations."
        },
        {
          question: "What industries do you serve?",
          answer: "We serve a wide range of industries including e-commerce, healthcare, fintech, education, manufacturing, logistics, and more. Our team has experience adapting our solutions to meet the specific regulatory and operational requirements of different sectors."
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while enterprise applications can take 3-6 months or longer. We provide detailed project timelines during the initial consultation phase and keep you updated throughout development."
        },
        {
          question: "Do you offer support after project completion?",
          answer: "Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements. We're committed to your long-term success."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Pricing & Payment",
      faqs: [
        {
          question: "How do you price your services?",
          answer: "We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing depends on project scope, complexity, timeline, and required expertise. We provide detailed proposals with transparent pricing before starting any work."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept bank transfers, credit cards, PayPal, and cryptocurrency payments. For larger projects, we typically structure payments in milestones: 30% upfront, 40% at mid-project, and 30% upon completion."
        },
        {
          question: "Do you offer discounts for long-term contracts?",
          answer: "Yes, we offer competitive rates for retainer agreements and long-term partnerships. We also provide special pricing for non-profits and educational institutions. Contact our sales team to discuss your specific needs."
        },
        {
          question: "What is your refund policy?",
          answer: "We stand behind our work with a satisfaction guarantee. If you're not satisfied with our work during the initial phases, we'll work with you to make it right or provide a refund based on completed deliverables. Specific terms are outlined in project contracts."
        }
      ]
    },
    {
      icon: Code,
      title: "Technical",
      faqs: [
        {
          question: "What technologies do you work with?",
          answer: "We work with modern, industry-standard technologies including React, Vue, Angular, Node.js, Python, Java, .NET, AWS, Azure, GCP, Kubernetes, Docker, PostgreSQL, MongoDB, and more. We choose the best technology stack for each project's specific requirements."
        },
        {
          question: "Can you integrate with our existing systems?",
          answer: "Absolutely! We have extensive experience integrating with existing systems, APIs, databases, and third-party services. We'll conduct a thorough analysis of your current infrastructure and design seamless integration solutions."
        },
        {
          question: "Do you provide documentation?",
          answer: "Yes, we provide comprehensive technical documentation including architecture diagrams, API documentation, user guides, and deployment instructions. We believe good documentation is essential for long-term project success."
        },
        {
          question: "How do you ensure code quality?",
          answer: "We follow industry best practices including code reviews, automated testing, continuous integration/continuous deployment (CI/CD), and adherence to coding standards. All code is version controlled and thoroughly tested before deployment."
        }
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      faqs: [
        {
          question: "How do you handle data security?",
          answer: "We take security seriously and implement industry-standard security practices including encryption at rest and in transit, secure authentication, regular security audits, and compliance with relevant regulations (GDPR, HIPAA, SOC 2, etc.). We can also conduct penetration testing upon request."
        },
        {
          question: "Who owns the intellectual property?",
          answer: "Upon full payment, you own all intellectual property rights to the custom code and designs we create for your project. This is clearly outlined in our contracts. We retain rights to our proprietary tools and frameworks."
        },
        {
          question: "Do you sign NDAs?",
          answer: "Yes, we're happy to sign non-disclosure agreements (NDAs) to protect your confidential information. In fact, we typically recommend it for projects involving sensitive business information or innovative ideas."
        },
        {
          question: "How do you handle GDPR compliance?",
          answer: "We build GDPR compliance into our solutions from the ground up, including data minimization, consent management, right to erasure, data portability, and privacy by design. We can also help you develop privacy policies and data processing agreements."
        }
      ]
    },
    {
      icon: MessageCircle,
      title: "Process & Communication",
      faqs: [
        {
          question: "What is your development process?",
          answer: "We follow an agile development methodology with regular sprints, milestone reviews, and iterative improvements. The process typically includes: discovery & planning, design, development, testing, deployment, and ongoing support. We keep you involved at every stage."
        },
        {
          question: "How often will you communicate with us?",
          answer: "Communication frequency is tailored to your preferences. Typically, we provide weekly progress updates, hold bi-weekly sprint reviews, and are available for ad-hoc discussions as needed. We use project management tools for transparent progress tracking."
        },
        {
          question: "Can we make changes during development?",
          answer: "Yes, we understand that requirements evolve. Our agile approach allows for flexibility and change. Minor changes can usually be accommodated within the current scope, while larger changes may require timeline and budget adjustments, which we'll discuss with you."
        },
        {
          question: "Do you offer emergency support?",
          answer: "Yes, we offer 24/7 emergency support for critical issues under our premium support plans. This includes immediate response for production outages, security incidents, and other urgent matters. Standard support is available during business hours."
        }
      ]
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
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about our services, pricing, and processes.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  className="pl-12 pr-4 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left hover:text-primary">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Still Have Questions?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help. Get in touch with us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/support">Contact Support</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="/documentation">View Documentation</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
