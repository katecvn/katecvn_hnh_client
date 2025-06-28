import Head from 'next/head';
import { KnowledgeBaseAdmin } from '@/components/knowledge-base-admin';

export default function KnowledgeBaseAdminPage() {
  return (
    <>
      <Head>
        <title>Knowledge Base Admin - Katec</title>
        <meta
          name="description"
          content="Quản lý knowledge base cho chatbot AI"
        />
      </Head>
      <KnowledgeBaseAdmin />
    </>
  );
}
