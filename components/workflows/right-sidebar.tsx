"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlayIcon, LoaderCircleIcon } from "lucide-react"

import { runWorkflowAction } from "./actions"

interface RightSidebarProps {
  onRunStarted: (run: { runId: string; publicAccessToken: string }) => void
}

export function RightSidebar({ onRunStarted }: RightSidebarProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleRun() {
    setIsLoading(true)
    try {
      const result = await runWorkflowAction()
      onRunStarted(result)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <Button size="sm" className="gap-2" onClick={handleRun} disabled={isLoading}>
        {isLoading ? (
          <LoaderCircleIcon className="size-4 animate-spin" />
        ) : (
          <PlayIcon className="size-4" />
        )}
        {isLoading ? "Starting..." : "Run"}
      </Button>
    </div>
  )
}
