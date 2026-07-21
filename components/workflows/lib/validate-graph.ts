import toposort from "toposort"

import type { WorkflowGraph } from "@/lib/schema"

export function validateGraph({ nodes, edges }: WorkflowGraph): string[] {
  const problem: string[] = []
  const triggers = nodes.filter((n) => n.data.kind === "trigger").length

  if (triggers !== 1) {
    problem.push(
      `A workflow needs exactly one start trigger (found ${triggers}).`
    )
  }

  if (edges.length === 0) {
    problem.push("Connect your nodes before running.")
  } else {
    try {
      toposort(edges.map((e) => [e.source, e.target]))
    } catch (error) {
      problem.push("Workflow has a cycle - remove the loop before running.")
    }
  }

  return problem
}
