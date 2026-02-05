import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  image_url: string;
  challenge: string;
  solution: string;
  testimonial: string;
  tags: string[];
  results: { metric: string; value: string; icon: string }[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface ResultItem {
  metric: string;
  value: string;
  icon: string;
}

const CaseStudiesManager = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    industry: "",
    image_url: "",
    challenge: "",
    solution: "",
    testimonial: "",
    tags: [] as string[],
    results: [] as ResultItem[],
    published: true,
  });
  const [newTag, setNewTag] = useState("");
  const [newResult, setNewResult] = useState<ResultItem>({ metric: "", value: "", icon: "TrendingUp" });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      toast({ title: "Error", description: "Failed to load case studies", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      client: "",
      industry: "",
      image_url: "",
      challenge: "",
      solution: "",
      testimonial: "",
      tags: [],
      results: [],
      published: true,
    });
    setNewTag("");
    setNewResult({ metric: "", value: "", icon: "TrendingUp" });
    setEditingCase(null);
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
    setFormData({
      title: caseStudy.title,
      client: caseStudy.client,
      industry: caseStudy.industry,
      image_url: caseStudy.image_url,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      testimonial: caseStudy.testimonial,
      tags: caseStudy.tags || [],
      results: caseStudy.results || [],
      published: caseStudy.published,
    });
    setIsDialogOpen(true);
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  };

  const addResult = () => {
    if (newResult.metric.trim() && newResult.value.trim()) {
      setFormData({ ...formData, results: [...formData.results, newResult] });
      setNewResult({ metric: "", value: "", icon: "TrendingUp" });
    }
  };

  const removeResult = (index: number) => {
    setFormData({ ...formData, results: formData.results.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const caseData = {
        title: formData.title,
        client: formData.client,
        industry: formData.industry,
        image_url: formData.image_url,
        challenge: formData.challenge,
        solution: formData.solution,
        testimonial: formData.testimonial,
        tags: formData.tags,
        results: formData.results,
        published: formData.published,
      };

      if (editingCase) {
        const { error } = await supabase.from("case_studies").update(caseData).eq("id", editingCase.id);
        if (error) throw error;
        toast({ title: "Success", description: "Case study updated successfully" });
      } else {
        const { error } = await supabase.from("case_studies").insert([caseData]);
        if (error) throw error;
        toast({ title: "Success", description: "Case study created successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchCaseStudies();
    } catch (error) {
      console.error("Error saving case study:", error);
      toast({ title: "Error", description: "Failed to save case study", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Case study deleted successfully" });
      fetchCaseStudies();
    } catch (error) {
      console.error("Error deleting case study:", error);
      toast({ title: "Error", description: "Failed to delete case study", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Case Studies Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Case Study</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCase ? "Edit Case Study" : "Add New Case Study"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Input id="client" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Input id="industry" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challenge">Challenge *</Label>
                  <Textarea id="challenge" value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} rows={4} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solution">Solution *</Label>
                  <Textarea id="solution" value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} rows={4} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial">Testimonial</Label>
                  <Textarea id="testimonial" value={formData.testimonial} onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add tag" onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                    <Button type="button" onClick={addTag}>Add</Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {tag}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(index)} />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Results</Label>
                  <div className="grid md:grid-cols-4 gap-2">
                    <Input value={newResult.metric} onChange={(e) => setNewResult({ ...newResult, metric: e.target.value })} placeholder="Metric" />
                    <Input value={newResult.value} onChange={(e) => setNewResult({ ...newResult, value: e.target.value })} placeholder="Value" />
                    <Input value={newResult.icon} onChange={(e) => setNewResult({ ...newResult, icon: e.target.value })} placeholder="Icon" />
                    <Button type="button" onClick={addResult}>Add Result</Button>
                  </div>
                  {formData.results.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {formData.results.map((result, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                          <div className="text-sm">
                            <strong>{result.metric}:</strong> {result.value} <span className="text-gray-500">({result.icon})</span>
                          </div>
                          <X className="w-4 h-4 cursor-pointer text-red-500" onClick={() => removeResult(index)} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="published" checked={formData.published} onCheckedChange={(checked) => setFormData({ ...formData, published: checked })} />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingCase ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseStudies.map((cs) => (
                <TableRow key={cs.id}>
                  <TableCell className="font-medium">{cs.title}</TableCell>
                  <TableCell>{cs.client}</TableCell>
                  <TableCell>{cs.industry}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cs.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{tag}</span>
                      ))}
                      {cs.tags?.length > 3 && <span className="text-xs text-gray-500">+{cs.tags.length - 3}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${cs.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {cs.published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(cs)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(cs.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesManager;
