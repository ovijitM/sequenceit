import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsManager from "./pages/admin/ProjectsManager";
import TeamManager from "./pages/admin/TeamManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import BlogManager from "./pages/admin/BlogManager";
import CareersManager from "./pages/admin/CareersManager";
import CaseStudiesManager from "./pages/admin/CaseStudiesManager";
import DocumentationManager from "./pages/admin/DocumentationManager";
import FAQsManager from "./pages/admin/FAQsManager";
import AllProjects from "./pages/AllProjects";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CompanyPolicy from "./pages/CompanyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Documentation from "./pages/Documentation";
import CaseStudies from "./pages/CaseStudies";
import Support from "./pages/Support";
import FAQs from "./pages/FAQs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/company-policy" element={<CompanyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="careers" element={<CareersManager />} />
              <Route path="case-studies" element={<CaseStudiesManager />} />
              <Route path="documentation" element={<DocumentationManager />} />
              <Route path="faqs" element={<FAQsManager />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
