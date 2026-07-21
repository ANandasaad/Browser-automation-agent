"use server"

import { and, desc, eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { workflows, WorkflowGraph } from "@/lib/schema"
import { validateGraph } from "@/components/workflows/lib/validate-graph"

export async function saveWorkflowGraph({
  orgId,
  id,
  graph,
}: {
  orgId: string
  id: string
  graph: WorkflowGraph
}) {
  const problems = validateGraph(graph)
  if (problems.length > 0) throw new Error(problems.join(" "))
  await getDb()
    .update(workflows)
    .set({ graph, updatedAt: new Date() })
    .where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
}

export async function listWorkflows(orgId: string) {
  return getDb()
    .select()
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.createdAt))
}

export async function getWorkflow(orgId: string, id: string) {
  const [workflow] = await getDb()
    .select()
    .from(workflows)
    .where(and(eq(workflows.orgId, orgId), eq(workflows.id, id)))
    .limit(1)

  return workflow
}

export async function createWorkflow(orgId: string, name: string) {
  const trimmedName = name.trim()

  if (!trimmedName) {
    throw new Error("Workflow name is required")
  }

  const [createdWorkflow] = await getDb()
    .insert(workflows)
    .values({
      orgId,
      name: trimmedName,
    })
    .returning()

  return createdWorkflow
}

export async function deleteWorkflow(orgId: string, id: string) {
  await getDb()
    .delete(workflows)
    .where(and(eq(workflows.orgId, orgId), eq(workflows.id, id)))
}
