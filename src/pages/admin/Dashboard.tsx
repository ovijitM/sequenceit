import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, Users, MessageSquareQuote, FileText, Briefcase, BookOpen, HelpCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    teamMembers: 0,
    testimonials: 0,
    blogPosts: 0,
    careers: 0,
    caseStudies: 0,
    documentation: 0,
    faqs: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, teamRes, testimonialsRes, blogRes, careersRes, caseStudiesRes, docsRes, faqsRes] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("team_members").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("careers").select("id", { count: "exact", head: true }),
          supabase.from("case_studies").select("id", { count: "exact", head: true }),
          supabase.from("documentation").select("id", { count: "exact", head: true }),
          supabase.from("faqs").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projectsRes.count || 0,
          teamMembers: teamRes.count || 0,
          testimonials: testimonialsRes.count || 0,
          blogPosts: blogRes.count || 0,
          careers: careersRes.count || 0,
          caseStudies: caseStudiesRes.count || 0,
          documentation: docsRes.count || 0,
          faqs: faqsRes.count || 0,
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
      link: "/admin/projects",
    },
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/admin/team",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/admin/testimonials",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      link: "/admin/blog",
    },
    {
      title: "Job Openings",
      value: stats.careers,
      icon: Briefcase,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      link: "/admin/careers",
    },
    {
      title: "Case Studies",
      value: stats.caseStudies,
      icon: Award,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      link: "/admin/case-studies",
    },
    {
      title: "Documentation",
      value: stats.documentation,
      icon: BookOpen,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      link: "/admin/documentation",
    },
    {
      title: "FAQs",
      value: stats.faqs,
      icon: HelpCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      link: "/admin/faqs",
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

      <div className="grid md:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform"
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
          </Link>
        ))}
      </div>

      <div className="mt-8 glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Quick Tips
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            Click on any card above to manage that content section
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            Add blog posts, careers, case studies, documentation, and FAQs to display on their respective pages
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            All changes are saved automatically to the database
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            Use the "Published" toggle to control visibility on the public site
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
