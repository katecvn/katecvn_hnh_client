"use client";

import { useState, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Edit,
  Database,
  FileText,
  Tag,
  Calendar,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import type { KnowledgeDocument } from "@/lib/knowledge-base";

interface KnowledgeBaseStats {
  totalDocuments: number;
  categories: number;
  documentsWithEmbeddings: number;
  embeddingEnabled: boolean;
  lastUpdated: Date;
}

interface SearchResult {
  document: {
    id: string;
    title: string;
    category: string;
    tags: string[];
    metadata: any;
  };
  similarity: number;
  relevantChunk: string;
}

// Generate a stable document ID
let docCounter = 0;
const generateDocumentId = (prefix = "doc") => {
  docCounter += 1;
  return `${prefix}-${docCounter}`;
};

export function KnowledgeBaseAdmin() {
  const idPrefix = useId();
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [stats, setStats] = useState<KnowledgeBaseStats | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for adding new documents
  const [newDocument, setNewDocument] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  useEffect(() => {
    loadKnowledgeBaseData();
  }, []);

  const loadKnowledgeBaseData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/knowledge-base");
      const data = await response.json();

      setStats(data.stats);
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to load knowledge base data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchDocuments = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/knowledge-base?q=${encodeURIComponent(searchQuery)}&limit=10`
      );
      const data = await response.json();

      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDocumentsByCategory = async (category: string) => {
    if (category === "all") {
      setDocuments([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/knowledge-base?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();

      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDocument = async () => {
    try {
      const document: KnowledgeDocument = {
        id: newDocument.id || `${idPrefix}-${generateDocumentId()}`,
        title: newDocument.title,
        content: newDocument.content,
        category: newDocument.category,
        tags: newDocument.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        metadata: {
          lastUpdated: new Date(),
          source: "admin-panel",
          priority: 5,
        },
      };

      const response = await fetch("/api/knowledge-base", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });

      if (response.ok) {
        setShowAddForm(false);
        setNewDocument({
          id: "",
          title: "",
          content: "",
          category: "",
          tags: "",
        });
        loadKnowledgeBaseData();
        alert("Document added successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to add document: ${error.error}`);
      }
    } catch (error) {
      console.error("Failed to add document:", error);
      alert("Failed to add document");
    }
  };

  const viewDocument = async (id: string) => {
    try {
      const response = await fetch(`/api/knowledge-base/${id}`);
      const data = await response.json();

      if (data.document) {
        alert(
          `Document: ${
            data.document.title
          }\n\nContent: ${data.document.content.substring(0, 500)}...`
        );
      }
    } catch (error) {
      console.error("Failed to view document:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center">
          <Database className="h-8 w-8 mr-3" />
          Knowledge Base Admin
        </h1>
        <Button onClick={loadKnowledgeBaseData} disabled={isLoading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Embedding Status
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.embeddingEnabled ? "✅ Enabled" : "⚠️ Disabled"}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.embeddingEnabled
                  ? `${stats.documentsWithEmbeddings}/${stats.totalDocuments} with embeddings`
                  : "Using keyword search fallback"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Updated
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {new Date(stats.lastUpdated).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">Search & Test</TabsTrigger>
          <TabsTrigger value="browse">Browse Documents</TabsTrigger>
          <TabsTrigger value="add">Add Document</TabsTrigger>
        </TabsList>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter search query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchDocuments()}
                />
                <Button onClick={searchDocuments} disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Search Results ({searchResults.length})
                  </h3>
                  {searchResults.map((result, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {result.document.title}
                          </CardTitle>
                          <Badge variant="outline">
                            {(result.similarity * 100).toFixed(1)}% match
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>{result.document.category}</Badge>
                          {result.document.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {result.relevantChunk}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDocument(result.document.id)}
                        >
                          View Full Document
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Browse Tab */}
        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  loadDocumentsByCategory(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {documents.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Documents in "{selectedCategory}" ({documents.length})
                  </h3>
                  {documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewDocument(doc.id)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>{doc.category}</Badge>
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Document Tab */}
        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-id">Document ID (optional)</Label>
                  <Input
                    id="doc-id"
                    placeholder="Auto-generated if empty"
                    value={newDocument.id}
                    onChange={(e) =>
                      setNewDocument((prev) => ({
                        ...prev,
                        id: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doc-category">Category</Label>
                  <Select
                    value={newDocument.category}
                    onValueChange={(value) =>
                      setNewDocument((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                      <SelectItem value="new-category">
                        + Add New Category
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-title">Title</Label>
                <Input
                  id="doc-title"
                  placeholder="Document title"
                  value={newDocument.title}
                  onChange={(e) =>
                    setNewDocument((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-tags">Tags (comma-separated)</Label>
                <Input
                  id="doc-tags"
                  placeholder="tag1, tag2, tag3"
                  value={newDocument.tags}
                  onChange={(e) =>
                    setNewDocument((prev) => ({
                      ...prev,
                      tags: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-content">Content</Label>
                <Textarea
                  id="doc-content"
                  placeholder="Document content..."
                  rows={10}
                  value={newDocument.content}
                  onChange={(e) =>
                    setNewDocument((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={addDocument}
                  disabled={
                    !newDocument.title ||
                    !newDocument.content ||
                    !newDocument.category
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setNewDocument({
                      id: "",
                      title: "",
                      content: "",
                      category: "",
                      tags: "",
                    })
                  }
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
