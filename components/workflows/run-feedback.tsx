"use client"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import type { helloWorldTask } from "@/src/trigger/example"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LoaderCircleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

interface RunFeedbackProps {
  runId: string
  publicAccessToken: string
}

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
  QUEUED: { label: "Queued", variant: "secondary", icon: <LoaderCircleIcon className="size-3 animate-spin" /> },
  EXECUTING: { label: "Running", variant: "default", icon: <LoaderCircleIcon className="size-3 animate-spin" /> },
  COMPLETED: { label: "Completed", variant: "outline", icon: <CheckCircleIcon className="size-3 text-green-500" /> },
  FAILED: { label: "Failed", variant: "destructive", icon: <XCircleIcon className="size-3" /> },
  CANCELED: { label: "Canceled", variant: "destructive", icon: <XCircleIcon className="size-3" /> },
  REATTEMPTING: { label: "Retrying", variant: "secondary", icon: <LoaderCircleIcon className="size-3 animate-spin" /> },
  DELAYED: { label: "Delayed", variant: "secondary", icon: <LoaderCircleIcon className="size-3" /> },
  CRASHED: { label: "Crashed", variant: "destructive", icon: <XCircleIcon className="size-3" /> },
  TIMED_OUT: { label: "Timed out", variant: "destructive", icon: <XCircleIcon className="size-3" /> },
  WAITING_FOR_DEPLOY: { label: "Waiting for deploy", variant: "secondary", icon: <LoaderCircleIcon className="size-3" /> },
}

export function RunFeedback({ runId, publicAccessToken }: RunFeedbackProps) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken: publicAccessToken,
  })

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-sm text-destructive">
        Error: {error.message}
      </div>
    )
  }

  if (!run) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
        Connecting...
      </div>
    )
  }

  const config = STATUS_CONFIG[run.status] ?? { label: run.status, variant: "secondary" as const, icon: null }
  const output = run.output as { message?: string } | undefined

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-3 p-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant={config.variant} className="gap-1">
            {config.icon}
            {config.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Run ID:</span>
          <code className="text-xs">{run.id}</code>
        </div>

        {run.startedAt && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Started:</span>
            <span className="text-xs">{new Date(run.startedAt).toLocaleTimeString()}</span>
          </div>
        )}

        {run.durationMs != null && run.durationMs > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Duration:</span>
            <span className="text-xs">{(run.durationMs / 1000).toFixed(1)}s</span>
          </div>
        )}

        {output?.message && (
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Output:</span>
            <pre className="rounded-md bg-muted p-2 text-xs whitespace-pre-wrap">{output.message}</pre>
          </div>
        )}

        {run.error && (
          <div className="flex flex-col gap-1">
            <span className="text-destructive">Error:</span>
            <pre className="rounded-md bg-destructive/10 p-2 text-xs text-destructive whitespace-pre-wrap">
              {JSON.stringify(run.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
