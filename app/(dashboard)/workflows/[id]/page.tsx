import Link from "next/link";
import { db } from "@/lib/db";
import { workflows } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { WorkflowShell } from "@/components/workflows/workflow-shell";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const [workflow] = await db
    .select()
    .from(workflows)
    .where(eq(workflows.id, id))
    .limit(1);

  if (!workflow) {
    notFound();
  }

  return <WorkflowShell workflowId={id} />;
}
