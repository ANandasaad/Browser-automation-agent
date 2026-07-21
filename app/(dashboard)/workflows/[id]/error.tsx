"use client"

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { AlertCircleIcon } from "lucide-react"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Empty className="border-none">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon className="size-4" />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            We could not load this workflow. Please try again.
          </EmptyDescription>
        </EmptyContent>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Try again
        </button>
      </Empty>
    </div>
  )
}
