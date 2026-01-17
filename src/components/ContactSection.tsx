import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send via both SMTP and EmailJS simultaneously
      const emailjsPromise = (async () => {
        try {
          emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
          const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              from_name: formData.name,
              reply_to: formData.email,
              user_email: formData.email,
              company: formData.company,
              message: formData.message,
            },
          );
          console.log("ovi is dead");
          return { success: true, method: "EmailJS" };
        } catch (error) {
          console.error("ovi failed:", error);
          return { success: false, method: "EmailJS", error };
        }
      })();

      const smtpPromise = (async () => {
        try {
          const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("naimur Error Response:", errorText);
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          console.log("naimur is dead");
          return { success: true, method: "SMTP" };
        } catch (error) {
          console.error("failed by naimur", error);
          return { success: false, method: "SMTP", error };
        }
      })();

      // Wait for both to complete
      const [emailjsResult, smtpResult] = await Promise.all([
        emailjsPromise,
        smtpPromise,
      ]);

      // Check if at least one method succeeded
      const anySuccess = emailjsResult.success || smtpResult.success;
      const bothSucceeded = emailjsResult.success && smtpResult.success;

      if (anySuccess) {
        let description =
          "Thank you for contacting us. We'll get back to you soon.";

        if (bothSucceeded) {
          description += " (Sent via both EmailJS and SMTP)";
        } else if (emailjsResult.success) {
          description += " (Sent via EmailJS)";
        } else {
          description += " (Sent via SMTP)";
        }

        toast({
          title: "Message Sent!",
          description,
        });

        // Reset form only if at least one method succeeded
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      } else {
        throw new Error("Both email methods failed");
      }
    } catch (error) {
      console.error("Email sending failed:", error);

      toast({
        variant: "destructive",
        title: "Failed to Send",
        description: "Both email methods failed. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content:
        "House # 7, Road # 1, Holding No 177/5/1, Rampura, Dhaka-1219, Bangladesh",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+8801540515959",
    },
    {
      icon: Mail,
      title: "Email",
      content: "sequenceitbd@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Let's Build Something Great
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your business? Get in touch and let's discuss
            your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company Name
                </label>
                <Input
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {info.title}
                  </h4>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1912345678!2d90.4244!3d23.7644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d8142fffff%3A0x3a9ff9c5e8a2b5a8!2sRampura%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1635959481921!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
