import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { WorkflowIcon } from "lucide-react"

import { listWorkflows } from "./workflows/data"

export async function WorkflowSidebarList({
  activeWorkflowId,
  orgId,
}: {
  activeWorkflowId?: string
  orgId?: string | null
}) {
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarMenu>
        {workflows.map((workflow) => (
          <SidebarMenuItem key={workflow.id}>
            <SidebarMenuButton
              asChild
              isActive={workflow.id === activeWorkflowId}
            >
              <Link href={`/workflows/${workflow.id}`}>
                <span className="flex w-full items-center gap-2">
                  <WorkflowIcon />
                  <span>{workflow.name}</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
