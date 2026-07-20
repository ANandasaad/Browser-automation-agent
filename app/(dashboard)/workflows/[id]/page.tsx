import Link from "next/link"
import { db } from "@/lib/db"
import { workflows } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { WorkflowShell } from "@/components/workflows/workflow-shell"
import { Room } from "@/components/workflows/room"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Room roomId={id}>
      <WorkflowShell workflowId={id} />;
    </Room>
  )
}
