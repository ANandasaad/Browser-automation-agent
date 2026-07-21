import { notFound } from "next/navigation"
import {auth} from "@clerk/nextjs/server"
import { ReactFlowProvider } from "@xyflow/react"
import {getWorkflow} from "@/components/workflows/data"
import { WorkflowShell } from "@/components/workflows/workflow-shell"
import { Room } from "@/components/workflows/room"
import { getLiveblocks } from "@/lib/liveblocks"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const {orgId}= await auth()

  if(!orgId) notFound()

  const roomId = `${orgId}:${id}`

  const workflow = await getWorkflow(orgId, id)
  
  if(!workflow) notFound()

    await getLiveblocks().getOrCreateRoom(roomId, {
      organizationId: orgId,
      defaultAccesses:[],
      groupsAccesses: {
        [orgId]:['room:write'],
      },
      metadata:{
        title: workflow.name
      }
    })

  return (
    <Room roomId={roomId}>
      <ReactFlowProvider>
        <WorkflowShell workflowId={id} />;
      </ReactFlowProvider>
    </Room>
  )
}
