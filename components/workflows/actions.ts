"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import type { helloWorldTask } from "@/src/trigger/example"
import { tasks, runs } from "@trigger.dev/sdk"
import { getLiveblocks } from "@/lib/liveblocks"

import { createWorkflow, deleteWorkflow, saveWorkflowGraph } from "./data"
import {WorkflowGraph} from '@/lib/schema'

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/", "layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function runWorkflowAction({id, graph}:{id:string, graph: WorkflowGraph}) {

  const {orgId}= await auth()

  if(!orgId){
    throw new Error("No active organization")
  }

  await saveWorkflowGraph({orgId, id, graph})
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-dashboard", {
    message: "Hello from my app!",
  })
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

export async function cancelWorkflowRunAction(runId: string){
  const {orgId}= await auth()
  if(!orgId) throw new Error("No active organization")
    await runs.cancel(runId)
}
