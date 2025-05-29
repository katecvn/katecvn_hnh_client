import type { Metadata } from "next";
import { KnowledgeBaseAdmin } from "@/components/knowledge-base-admin";

export const metadata: Metadata = {
  title: "Knowledge Base Admin - Katec",
  description: "Quản lý knowledge base cho chatbot AI",
};

export default function KnowledgeBaseAdminPage() {
  return <KnowledgeBaseAdmin />;
}
