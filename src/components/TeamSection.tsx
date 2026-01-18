import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin, Github, Loader2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  team_category: string | null;
}

// Fallback data when database is empty
const fallbackTeams = [
  {
    name: "Web Development Team",
    members: [
      {
        id: "1",
        name: "Ovijit Karmakar ",
        role: "Lead Full-Stack Developer",
        image_url:
          "https://czrzkrlkqywcczazeopo.supabase.co/storage/v1/object/public/blog-images/612681509_1591945398511504_1223457993254445767_n.jpg",
        bio: null,
        linkedin_url: null,
        github_url: null,
        team_category: "Development",
      },
      {
        id: "2",
        name: "Naimur Islam ",
        role: "Senior Frontend Developer",
        image_url:
          "https://czrzkrlkqywcczazeopo.supabase.co/storage/v1/object/public/blog-images/Screenshot%202026-01-16%20at%207.16.35%20PM.png",
        bio: null,
        linkedin_url: null,
        github_url: null,
        team_category: "Development",
      },
      {
        id: "3",
        name: "Md. Rakib Hossain",
        role: "Backend Developer",
        image_url:
          "https://czrzkrlkqywcczazeopo.supabase.co/storage/v1/object/public/blog-images/Screenshot%202026-01-16%20at%207.27.59%20PM.png",
        bio: null,
        linkedin_url: null,
        github_url: null,
        team_category: "Development",
      },
    ],
  },
];

const TeamSection = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setMembers(data);
        } else {
          setUseFallback(true);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setUseFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Group members by team category
  const groupedMembers = members.reduce((acc, member) => {
    const category = member.team_category || "Team";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  const teams = Object.entries(groupedMembers).map(([name, members]) => ({
    name: `${name} Team`,
    members,
  }));

  const displayTeams = useFallback ? fallbackTeams : teams;

  return (
    <section id="team" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Meet Our Experts
          </h2>
          <p className="text-lg text-muted-foreground">
            Our talented team brings together diverse expertise to deliver
            exceptional results.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-16">
            {displayTeams.map((team) => (
              <div key={team.name}>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-8 text-center">
                  {team.name}
                </h3>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="group text-center p-6 rounded-2xl glass-card transition-all duration-300"
                    >
                      <div className="relative w-28 h-28 mx-auto mb-4">
                        <img
                          src={
                            member.image_url ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                          }
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition-colors"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {member.linkedin_url ? (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-background border border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 rounded-full bg-background border border-border">
                              <Linkedin className="w-3.5 h-3.5" />
                            </span>
                          )}
                          {member.github_url ? (
                            <a
                              href={member.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-background border border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 rounded-full bg-background border border-border">
                              <Github className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                      <h4 className="text-lg font-display font-semibold text-foreground">
                        {member.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
