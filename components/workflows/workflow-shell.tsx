"use client"

import { useState } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { RightSidebar } from "./right-sidebar"
import { RunFeedback } from "./run-feedback"

export function WorkflowShell({ workflowId }: { workflowId: string }) {
  const [currentRun, setCurrentRun] = useState<{ runId: string; publicAccessToken: string } | null>(null)

  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical" className="size-full">
          <ResizablePanel minSize="18rem">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Canvas
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            {currentRun ? (
              <RunFeedback runId={currentRun.runId} publicAccessToken={currentRun.publicAccessToken} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Logs
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        <RightSidebar onRunStarted={setCurrentRun} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
