"use client"

import { useState } from "react"
import Link from "next/link"
import {
  RefreshCw,
  Lock,
  Unlock,
  Save,
  Download,
  Share2,
  ArrowRight,
  Grid,
  LayoutGrid,
  Shuffle,
  Maximize,
  Minimize,
  Plus,
  Minus,
} from "lucide-react"

interface Frame {
  id: string
  x: number
  y: number
  width: number
  height: number
  locked: boolean
}

export function LayoutGenerator() {
  const [wallDimensions, setWallDimensions] = useState({ width: 2.5, height: 2.3 })
  const [frames, setFrames] = useState<Frame[]>([
    { id: "1", x: 20, y: 20, width: 40, height: 60, locked: false },
    { id: "2", x: 70, y: 20, width: 50, height: 70, locked: false },
    { id: "3", x: 130, y: 20, width: 80, height: 100, locked: false },
    { id: "4", x: 20, y: 90, width: 40, height: 60, locked: false },
    { id: "5", x: 70, y: 100, width: 50, height: 70, locked: false },
    { id: "6", x: 130, y: 130, width: 80, height: 100, locked: false },
  ])
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [layoutStyle, setLayoutStyle] = useState("grid")
  const [spacing, setSpacing] = useState(2)
  const [symmetry, setSymmetry] = useState(80)

  const toggleLock = (id: string) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, locked: !frame.locked } : frame)))
  }

  const generateNewLayout = () => {
    // In a real app, this would call an AI service to generate a new layout
    // For now, we'll just randomize the positions a bit
    setFrames(
      frames.map((frame) => {
        if (frame.locked) return frame

        return {
          ...frame,
          x: Math.max(10, Math.min(200, frame.x + (Math.random() * 40 - 20))),
          y: Math.max(10, Math.min(200, frame.y + (Math.random() * 40 - 20))),
        }
      }),
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main workspace */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wall Width (ft)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                value={wallDimensions.width}
                onChange={(e) =>
                  setWallDimensions({ ...wallDimensions, width: Number.parseFloat(e.target.value) || 1 })
                }
                className="w-24 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wall Height (ft)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                value={wallDimensions.height}
                onChange={(e) =>
                  setWallDimensions({ ...wallDimensions, height: Number.parseFloat(e.target.value) || 1 })
                }
                className="w-24 p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition-colors">
              <Maximize size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition-colors">
              <Minimize size={20} />
            </button>
          </div>
        </div>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "500px" }}>
          {/* Wall canvas */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative bg-white border border-gray-300 shadow-sm"
              style={{
                width: `${wallDimensions.width * 100}px`,
                height: `${wallDimensions.height * 100}px`,
                maxWidth: "90%",
                maxHeight: "90%",
              }}
            >
              {frames.map((frame) => (
                <div
                  key={frame.id}
                  className={`absolute border-2 ${
                    selectedFrame === frame.id ? "border-primary" : frame.locked ? "border-accent" : "border-gray-400"
                  } bg-gray-50 hover:bg-gray-100 cursor-move transition-all`}
                  style={{
                    left: `${frame.x}px`,
                    top: `${frame.y}px`,
                    width: `${frame.width}px`,
                    height: `${frame.height}px`,
                  }}
                  onClick={() => setSelectedFrame(frame.id)}
                >
                  {frame.locked && (
                    <div className="absolute top-1 right-1 text-accent">
                      <Lock size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center">
              <Save size={18} className="mr-2" />
              Save
            </button>
            <button className="btn-secondary flex items-center">
              <Download size={18} className="mr-2" />
              Export
            </button>
            <button className="btn-secondary flex items-center">
              <Share2 size={18} className="mr-2" />
              Share
            </button>
          </div>

          <Link href="/projects/new/photos" className="btn-primary flex items-center">
            Continue
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Controls sidebar */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Layout Generator</h2>

          <div className="space-y-6">
            <button onClick={generateNewLayout} className="w-full btn-primary flex items-center justify-center group">
              <RefreshCw size={18} className="mr-2 group-hover:animate-spin" />
              Generate New Layout
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-2 rounded-md flex flex-col items-center ${
                    layoutStyle === "grid"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                  onClick={() => setLayoutStyle("grid")}
                >
                  <Grid size={20} />
                  <span className="text-xs mt-1">Grid</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center ${
                    layoutStyle === "salon"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                  onClick={() => setLayoutStyle("salon")}
                >
                  <LayoutGrid size={20} />
                  <span className="text-xs mt-1">Salon</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center ${
                    layoutStyle === "asymmetric"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                  onClick={() => setLayoutStyle("asymmetric")}
                >
                  <Shuffle size={20} />
                  <span className="text-xs mt-1">Asymmetric</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Spacing</label>
                <span className="text-sm text-gray-500">{spacing} inches</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setSpacing(Math.max(1, spacing - 0.5))}
                  className="p-1 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={spacing}
                  onChange={(e) => setSpacing(Number.parseFloat(e.target.value))}
                  className="w-full mx-2"
                />
                <button
                  onClick={() => setSpacing(Math.min(6, spacing + 0.5))}
                  className="p-1 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Symmetry</label>
                <span className="text-sm text-gray-500">{symmetry}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={symmetry}
                onChange={(e) => setSymmetry(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Selected Frame</h2>

          {selectedFrame ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Frame #{selectedFrame}</span>
                <button
                  onClick={() => toggleLock(selectedFrame)}
                  className={`p-2 rounded-md ${
                    frames.find((f) => f.id === selectedFrame)?.locked
                      ? "text-accent hover:text-accent/80"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {frames.find((f) => f.id === selectedFrame)?.locked ? <Lock size={18} /> : <Unlock size={18} />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={frames.find((f) => f.id === selectedFrame)?.width}
                      readOnly
                    />
                    <span className="ml-2 text-gray-500">px</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={frames.find((f) => f.id === selectedFrame)?.height}
                      readOnly
                    />
                    <span className="ml-2 text-gray-500">px</span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-secondary">Edit Frame</button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">Select a frame to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
