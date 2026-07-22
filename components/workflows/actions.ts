"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { tasks, runs } from "@trigger.dev/sdk"
import { getLiveblocks } from "@/lib/liveblocks"

import { createWorkflow, deleteWorkflow, saveWorkflowGraph } from "./data"
import { WorkflowGraph } from "@/lib/schema"
import type { runWorkflowTask } from "@/components/workflows/tasks/run-workflow"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/", "layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function runWorkflowAction({
  id,
  graph,
}: {
  id: string
  graph: WorkflowGraph
}) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  await saveWorkflowGraph({ orgId, id, graph })
  const handle = await tasks.trigger<typeof runWorkflowTask>(
    "run-workflow",
    {
      workflowId: id,
      orgId,
    },
    { tags: [`workflow:${id}`] }
  )
  return { runId: handle.id, publicAccessToken: handle.publicAccessToken }
}

export async function deleteWorkflowAction(workflowId: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  await deleteWorkflow(orgId, workflowId)

  const roomId = `${orgId}:${workflowId}`
  try {
    await getLiveblocks().deleteRoom(roomId)
  } catch {
    // Room may not exist yet — ignore
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function cancelWorkflowRunAction(runId: string) {
  const { orgId } = await auth()
  if (!orgId) throw new Error("No active organization")
  await runs.cancel(runId)
}
