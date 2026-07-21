import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm">
        <Spinner className="size-5" />
        <span className="text-sm text-muted-foreground">Loading workflow...</span>
      </div>
    </div>
  )
}
