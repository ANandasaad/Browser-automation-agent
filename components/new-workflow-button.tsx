"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

import { generateSlug } from "./workflows/lib/generate-slug"

type NewWorkflowButtonProps = {
  createWorkflowAction: (name: string) => Promise<void>
}

export function NewWorkflowButton({ createWorkflowAction }: NewWorkflowButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleCreate = () => {
    startTransition(() => {
      const name = generateSlug()
      void createWorkflowAction(name)
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full justify-start gap-2"
      onClick={handleCreate}
      disabled={isPending}
    >
      <PlusIcon className="size-4" />
      New workflow
    </Button>
  )
}
