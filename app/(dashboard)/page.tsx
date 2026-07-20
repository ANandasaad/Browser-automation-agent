import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { PlusIcon, WorkflowIcon } from "lucide-react"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Empty className="border-none">
        <EmptyHeader>
          <EmptyMedia>
            <div className="flex size-20 items-center justify-center rounded-2xl bg-muted">
              <WorkflowIcon className="size-10 text-foreground" strokeWidth={1.5} />
            </div>
          </EmptyMedia>
          <EmptyTitle className="text-2xl font-semibold tracking-tight">No workflow selected</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription className="text-base">
            Select a workflow from the sidebar
            <br />
            or create a new one to get started.
          </EmptyDescription>
        </EmptyContent>
        <Button variant="secondary" className="mt-2 h-14 rounded-2xl px-8 text-base font-medium">
          <PlusIcon className="size-5" />
          New workflow
        </Button>
      </Empty>
    </div>
  )
}
