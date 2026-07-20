"use client"

import { useState, useCallback, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Node,
  type Edge,
  NodeTypes,
  useNodesState,
  useEdgesState
} from "@xyflow/react"

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
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

 

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  )

  return (
    <div className="size-full">
      <ReactFlow
       nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
