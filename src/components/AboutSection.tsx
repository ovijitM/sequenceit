import { Target, Eye, Lightbulb, Users } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To empower businesses with innovative technology solutions that drive growth and efficiency.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "To be the leading technology partner for enterprises seeking digital transformation.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and methodologies to deliver future-ready solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with our clients to understand their unique needs and deliver tailored solutions.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Building the Future of Technology
          </h2>
          <p className="text-lg text-muted-foreground">
            With over a decade of experience, NexaTech has been at the forefront of digital innovation. 
            We combine technical expertise with creative thinking to deliver solutions that make a real difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group p-6 rounded-2xl glass-card transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
