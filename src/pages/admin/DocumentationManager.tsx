import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Doc {
  id: string;
  title: string;
  category: string;
  content: string;
  icon: string;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const categories = ["Getting Started", "Core Features", "Advanced Topics", "API Reference", "Best Practices", "Troubleshooting"];

const DocumentationManager = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Doc | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Getting Started",
    content: "",
    icon: "FileText",
    order_index: 0,
    published: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchDocs = async () => {
    try {
      const { data, error } = await supabase
        .from("documentation")
        .select("*")
        .order("category")
        .order("order_index");
      if (error) throw error;
      setDocs(data || []);
    } catch (error) {
      console.error("Error fetching documentation:", error);
      toast({ title: "Error", description: "Failed to load documentation", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Getting Started",
      content: "",
      icon: "FileText",
      order_index: 0,
      published: true,
    });
    setEditingDoc(null);
  };

  const handleEdit = (doc: Doc) => {
    setEditingDoc(doc);
    setFormData({
      title: doc.title,
      category: doc.category,
      content: doc.content,
      icon: doc.icon,
      order_index: doc.order_index,
      published: doc.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const docData = {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        icon: formData.icon,
        order_index: formData.order_index,
        published: formData.published,
      };

      if (editingDoc) {
        const { error } = await supabase.from("documentation").update(docData).eq("id", editingDoc.id);
        if (error) throw error;
        toast({ title: "Success", description: "Documentation updated successfully" });
      } else {
        const { error } = await supabase.from("documentation").insert([docData]);
        if (error) throw error;
        toast({ title: "Success", description: "Documentation created successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchDocs();
    } catch (error) {
      console.error("Error saving documentation:", error);
      toast({ title: "Error", description: "Failed to save documentation", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this documentation?")) return;
    try {
      const { error } = await supabase.from("documentation").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Documentation deleted successfully" });
      fetchDocs();
    } catch (error) {
      console.error("Error deleting documentation:", error);
      toast({ title: "Error", description: "Failed to delete documentation", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documentation Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Documentation</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDoc ? "Edit Documentation" : "Add New Documentation"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon (Lucide name)</Label>
                    <Input id="icon" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="FileText" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order_index">Order Index</Label>
                  <Input id="order_index" type="number" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="published" checked={formData.published} onCheckedChange={(checked) => setFormData({ ...formData, published: checked })} />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingDoc ? "Update" : "Create"}
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
                <TableHead>Category</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.icon}</TableCell>
                  <TableCell>{doc.order_index}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${doc.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {doc.published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(doc)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(doc.id)}><Trash2 className="w-4 h-4" /></Button>
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

export default DocumentationManager;
