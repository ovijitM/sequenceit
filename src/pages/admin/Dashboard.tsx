import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, Users, MessageSquareQuote } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    teamMembers: 0,
    testimonials: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, teamRes, testimonialsRes] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("team_members").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projectsRes.count || 0,
          teamMembers: teamRes.count || 0,
          testimonials: testimonialsRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your admin dashboard. Manage your content here.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">
              {isLoading ? "..." : card.value}
            </p>
            <p className="text-muted-foreground mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Quick Tips
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            Navigate using the sidebar to manage different sections
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            Add projects, team members, and testimonials to display on the landing page
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            All changes are saved automatically to the database
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
