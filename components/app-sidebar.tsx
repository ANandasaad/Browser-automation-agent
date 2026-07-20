import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { createWorkflowAction } from "./workflows/actions"
import { NewWorkflowButton } from "./new-workflow-button"
import { WorkflowSidebarList } from "./workflow-sidebar-list"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <OrganizationSwitcher />

          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 pt-1 pb-3">
          <NewWorkflowButton createWorkflowAction={createWorkflowAction} />
        </div>
        <WorkflowSidebarList />
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
