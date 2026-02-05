import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock,
  Headphones,
  BookOpen,
  Users,
  Send
} from "lucide-react";

const Support = () => {
  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat",
      href: "#"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      href: "mailto:support@sequenceit.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      href: "tel:+15551234567"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users",
      availability: "Always Active",
      action: "Visit Forum",
      href: "#"
    }
  ];

  const quickLinks = [
    { icon: BookOpen, title: "Documentation", href: "/documentation" },
    { icon: MessageSquare, title: "FAQs", href: "/faqs" },
    { icon: Headphones, title: "Video Tutorials", href: "#" },
    { icon: Users, title: "Community", href: "#" }
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
                How Can We Help You?
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our dedicated support team is here to assist you with any questions or issues.
              </p>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-16 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">
              Contact Support
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <channel.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{channel.title}</CardTitle>
                    <CardDescription>{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      {channel.availability}
                    </div>
                    <Button className="w-full" asChild>
                      <a href={channel.href}>{channel.action}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold mb-4">
                  Submit a Support Request
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" placeholder="Brief description of your issue" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <select
                        id="priority"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Non-urgent issue</option>
                        <option value="high">High - Affecting work</option>
                        <option value="critical">Critical - System down</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible about your issue..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full group">
                      <Send className="mr-2 w-5 h-5" />
                      Submit Support Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">
              Self-Service Resources
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {quickLinks.map((link, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group"
                  onClick={() => window.location.href = link.href}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-center">
                Our Commitment to You
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <Card className="border-2">
                  <CardHeader>
                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                    <CardTitle>Live Chat Support</CardTitle>
                    <CardDescription>
                      Instant assistance whenever you need it
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <div className="text-4xl font-bold text-primary mb-2">&lt;1hr</div>
                    <CardTitle>Critical Issues</CardTitle>
                    <CardDescription>
                      Response time for urgent problems
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <CardTitle>Satisfaction Rate</CardTitle>
                    <CardDescription>
                      Customer satisfaction with our support
                    </CardDescription>
                  </CardHeader>
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

export default Support;
