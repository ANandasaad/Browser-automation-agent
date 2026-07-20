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
} from "@xyflow/react"

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  { id: "3", position: { x: 200, y: 50 }, data: { label: "Node 3" } },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
]

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  )

  return (
    <div className="size-full">
      <ReactFlow
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
