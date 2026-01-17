import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Quote, Loader2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  content: string;
  image_url: string | null;
  rating: number | null;
}

// Fallback data when database is empty
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jennifer Lee",
    role: "CTO",
    company: "TechVentures Inc.",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    content: "NexaTech transformed our legacy systems into a modern, scalable platform. Their expertise in cloud architecture is exceptional.",
    rating: 5,
  },
  {
    id: "2",
    name: "Robert Anderson",
    role: "CEO",
    company: "FinanceFirst",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    content: "The AI solution they built for us reduced our processing time by 70%. Absolutely game-changing for our operations.",
    rating: 5,
  },
  {
    id: "3",
    name: "Maria Garcia",
    role: "Product Director",
    company: "RetailMax",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    content: "Their blockchain implementation for our supply chain brought unprecedented transparency. Highly recommend their team.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it — hear from the companies we've helped transform.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative p-6 rounded-2xl glass-card transition-all duration-300"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 relative z-10">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Client Logos */}
        <div className="border-t border-border pt-12">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["TechCorp", "FinanceFirst", "RetailMax", "HealthPlus", "LogiStream"].map((client) => (
              <div
                key={client}
                className="text-2xl font-display font-bold text-muted-foreground/40 hover:text-primary transition-colors"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
