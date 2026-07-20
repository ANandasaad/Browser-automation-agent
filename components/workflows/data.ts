"use server"

import { desc, eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { workflows } from "@/lib/schema"

export async function listWorkflows(orgId: string) {
  return db
    .select()
    .from(workflows)
    .where(eq(workflows.orgId, orgId))
    .orderBy(desc(workflows.createdAt))
}

export async function createWorkflow(orgId: string, name: string) {
  const trimmedName = name.trim()

  if (!trimmedName) {
    throw new Error("Workflow name is required")
  }

  const [createdWorkflow] = await db
    .insert(workflows)
    .values({
      orgId,
      name: trimmedName,
    })
    .returning()

  return createdWorkflow
}
