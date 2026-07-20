import { auth } from "@clerk/nextjs/server"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { WorkflowIcon } from "lucide-react"

import { listWorkflows } from "./workflows/data"

export async function WorkflowSidebarList() {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarMenu>
        {workflows.map((workflow) => (
          <SidebarMenuItem key={workflow.id}>
            <SidebarMenuButton>
              <WorkflowIcon />
              <span>{workflow.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
