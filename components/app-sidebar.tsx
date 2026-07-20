"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { PlusIcon, WorkflowIcon } from "lucide-react"

const workflows = [
  { id: "1", name: "Data scraping" },
  { id: "2", name: "Form filler" },
  { id: "3", name: "Report generator" },
  { id: "4", name: "Email parser" },
  { id: "5", name: "PDF extractor" },
]

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
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
          >
            <PlusIcon className="size-4" />
            New workflow
          </Button>
        </div>
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
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
