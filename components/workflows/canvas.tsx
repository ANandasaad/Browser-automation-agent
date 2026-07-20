"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
  type Edge,
  NodeTypes,
} from "@xyflow/react"
import { useLiveblocksFlow , Cursors} from "@liveblocks/react-flow"
import "@xyflow/react/dist/style.css";
import "@liveblocks/react-flow/styles.css"
import "@liveblocks/react-ui/styles.css";

import {StepNode} from '@/components/workflows/step-node'
import type {StepNodeType} from '@/components/workflows/nodes/node-registry'

const nodeTypes: NodeTypes= {step: StepNode }

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

const initialNodes: StepNodeType[] = [
  {
    id:"start",
    type: "step",
    position: {x:0, y:0},
    data: {type: "start", kind: "trigger", title: "Start", values:{}}
  }
]
  

const initialEdges: Edge[] = [
]

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDelete,
  } = useLiveblocksFlow({
    nodes: {
      initial: initialNodes,
    },
    edges: {
      initial: initialEdges,
    },
  })

  return (
    <div className="size-full">
      <ReactFlow
       nodeTypes={nodeTypes}
        nodes={nodes ?? undefined}
        edges={edges ?? undefined}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDelete={onDelete}
        colorMode={mounted && resolvedTheme === "dark" ? "dark" : "light"}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{stroke : "var(--border)"}}
        defaultEdgeOptions={{
          type: "smoothstep",
          style :{stroke : "var(--border)"}
        }}
        style={{
          "--xy-background-color" : "var(--background)",
          "--xy-edge-stroke-width": 2,
          "--xy-connectionline-stroke-width":2,


        }as React.CSSProperties}

        maxZoom={1}
      >
        <Background />
        <Controls />
        <Cursors />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
