import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, CheckCircle2, Loader2 } from "lucide-react";
import logoFoot from "/logofoot.svg";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    image_url: "",
  });
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name,
        role: formData.role,
        company: formData.company || null,
        content: formData.content,
        image_url: formData.image_url || null,
        rating: rating,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit feedback. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader className="pb-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription className="text-base">
              Your feedback has been submitted successfully. We truly appreciate
              you taking the time to share your experience with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={logoFoot}
              alt="SequenceIT"
              className="h-12 w-auto object-contain mx-auto opacity-60"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={logoFoot}
            alt="SequenceIT"
            className="h-16 w-auto object-contain mx-auto mb-4 invert dark:invert-0"
          />
        </div>

        {/* Feedback Card */}
        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl sm:text-3xl font-display">
              Share Your Feedback
            </CardTitle>
            <CardDescription className="text-base">
              We value your opinion! Please take a moment to share your
              experience working with SequenceIT.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Role and Company - Two columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">
                    Your Role/Position <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="CEO, CTO, Manager..."
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Profile Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image_url">Profile Image URL (Optional)</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  value={formData.image_url}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  You can provide a link to your profile photo if you'd like it
                  displayed with your testimonial.
                </p>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Content */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Your Feedback <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Please share your experience working with SequenceIT. What did you like most? How did we help your business?"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Your feedback may be featured on our website with your permission.
          <br />
          Thank you for helping us improve!
        </p>
      </div>
    </div>
  );
};

export default Feedback;
