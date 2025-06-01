"use client"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProgressStepper } from "@/components/progress-stepper"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  RefreshCw,
  Lock,
  Unlock,
  Save,
  ArrowRight,
  Grid,
  Plus,
  Minus,
  Ruler,
  ZoomIn,
  RotateCw,
  Undo,
  Redo,
  Menu,
  X,
  Check,
  PanelLeft,
  ZoomOut,
} from "lucide-react"

interface Frame {
  id: string
  x: number
  y: number
  width: number
  height: number
  locked: boolean
  color: string
  rotation: number
}

const layoutTemplates = [
  {
    id: "grid-3x2",
    name: "Grid 3×2",
    image: "/layout-grid-3x2.png",
  },
  {
    id: "grid-2x2",
    name: "Grid 2×2",
    image: "/layout-grid-2x2.png",
  },
  {
    id: "asymmetric-1",
    name: "Asymmetric",
    image: "/layout-asymmetric-1.png",
  },
  {
    id: "salon-style",
    name: "Salon Style",
    image: "/layout-salon-style.png",
  },
  {
    id: "horizontal-row",
    name: "Horizontal Row",
    image: "/layout-horizontal-row.png",
  },
  {
    id: "vertical-column",
    name: "Vertical Column",
    image: "/layout-vertical-column.png",
  },
]

export default function LayoutPage() {
  const [wallDimensions, setWallDimensions] = useState({ width: 2.5, height: 2.3 })
  const [frames, setFrames] = useState<Frame[]>([
    { id: "1", x: 20, y: 20, width: 40, height: 60, locked: false, color: "#000000", rotation: 0 },
    { id: "2", x: 70, y: 20, width: 50, height: 70, locked: false, color: "#FFFFFF", rotation: 0 },
    { id: "3", x: 130, y: 20, width: 80, height: 100, locked: true, color: "#D2B48C", rotation: 0 },
    { id: "4", x: 20, y: 90, width: 40, height: 60, locked: false, color: "#000000", rotation: 0 },
    { id: "5", x: 70, y: 100, width: 50, height: 70, locked: false, color: "#FFFFFF", rotation: 0 },
    { id: "6", x: 130, y: 130, width: 80, height: 100, locked: false, color: "#D2B48C", rotation: 0 },
  ])
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [layoutStyle, setLayoutStyle] = useState("grid")
  const [spacing, setSpacing] = useState(2)
  const [symmetry, setSymmetry] = useState(80)
  const [isGenerating, setIsGenerating] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [showRulers, setShowRulers] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeTab, setActiveTab] = useState("layouts")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showMeasurementModal, setShowMeasurementModal] = useState(false)
  const [roomStyle, setRoomStyle] = useState("modern")
  const [wallColor, setWallColor] = useState("#F5F5F0")

  const canvasRef = useRef<HTMLDivElement>(null)
  const wallRef = useRef<HTMLDivElement>(null)

  const toggleLock = (id: string) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, locked: !frame.locked } : frame)))

    if (frames.find((f) => f.id === id)?.locked) {
      showToastNotification("Frame unlocked")
    } else {
      showToastNotification("Frame locked")
    }
  }

  const generateNewLayout = () => {
    setIsGenerating(true)
    // In a real app, this would call an AI service to generate a new layout
    // For now, we'll just randomize the positions a bit
    setTimeout(() => {
      setFrames(
        frames.map((frame) => {
          if (frame.locked) return frame

          return {
            ...frame,
            x: Math.max(10, Math.min(200, frame.x + (Math.random() * 40 - 20))),
            y: Math.max(10, Math.min(200, frame.y + (Math.random() * 40 - 20))),
            rotation: Math.random() > 0.8 ? Math.floor(Math.random() * 6 - 3) : 0,
          }
        }),
      )
      setIsGenerating(false)
      showToastNotification("New layout generated")
    }, 1500)
  }

  const applyTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)

    // In a real app, this would apply predefined layouts
    // For now, we'll just simulate it
    setIsGenerating(true)
    setTimeout(() => {
      let newFrames = [...frames]

      if (templateId === "grid-3x2") {
        // Create a 3x2 grid layout
        const frameWidth = 60
        const frameHeight = 80
        const gapX = 20
        const gapY = 20
        const startX = 20
        const startY = 20

        newFrames = Array(6)
          .fill(null)
          .map((_, i) => {
            const row = Math.floor(i / 3)
            const col = i % 3
            return {
              id: (i + 1).toString(),
              x: startX + col * (frameWidth + gapX),
              y: startY + row * (frameHeight + gapY),
              width: frameWidth,
              height: frameHeight,
              locked: false,
              color: i % 3 === 0 ? "#000000" : i % 3 === 1 ? "#FFFFFF" : "#D2B48C",
              rotation: 0,
            }
          })
      } else if (templateId === "grid-2x2") {
        // Create a 2x2 grid layout
        const frameWidth = 80
        const frameHeight = 80
        const gapX = 30
        const gapY = 30
        const startX = 40
        const startY = 40

        newFrames = Array(4)
          .fill(null)
          .map((_, i) => {
            const row = Math.floor(i / 2)
            const col = i % 2
            return {
              id: (i + 1).toString(),
              x: startX + col * (frameWidth + gapX),
              y: startY + row * (frameHeight + gapY),
              width: frameWidth,
              height: frameHeight,
              locked: false,
              color: i % 2 === 0 ? "#000000" : "#FFFFFF",
              rotation: 0,
            }
          })
      } else if (templateId === "asymmetric-1") {
        // Create an asymmetric layout
        newFrames = [
          { id: "1", x: 20, y: 20, width: 100, height: 120, locked: false, color: "#000000", rotation: 0 },
          { id: "2", x: 140, y: 20, width: 50, height: 50, locked: false, color: "#FFFFFF", rotation: 0 },
          { id: "3", x: 140, y: 90, width: 50, height: 70, locked: false, color: "#D2B48C", rotation: 0 },
          { id: "4", x: 20, y: 160, width: 70, height: 50, locked: false, color: "#FFFFFF", rotation: 0 },
          { id: "5", x: 110, y: 180, width: 80, height: 60, locked: false, color: "#000000", rotation: 0 },
        ]
      } else if (templateId === "salon-style") {
        // Create a salon style layout with some rotation
        newFrames = [
          { id: "1", x: 60, y: 20, width: 80, height: 100, locked: false, color: "#D2B48C", rotation: -2 },
          { id: "2", x: 30, y: 60, width: 50, height: 70, locked: false, color: "#FFFFFF", rotation: 2 },
          { id: "3", x: 150, y: 40, width: 60, height: 80, locked: false, color: "#000000", rotation: -1 },
          { id: "4", x: 100, y: 140, width: 70, height: 50, locked: false, color: "#FFFFFF", rotation: 1 },
          { id: "5", x: 40, y: 150, width: 40, height: 60, locked: false, color: "#000000", rotation: -2 },
          { id: "6", x: 180, y: 130, width: 50, height: 70, locked: false, color: "#D2B48C", rotation: 3 },
        ]
      } else if (templateId === "horizontal-row") {
        // Create a horizontal row
        const frameHeight = 80
        const frameWidth = 60
        const gap = 20
        const startX = 20
        const startY = 100

        newFrames = Array(4)
          .fill(null)
          .map((_, i) => {
            return {
              id: (i + 1).toString(),
              x: startX + i * (frameWidth + gap),
              y: startY,
              width: frameWidth,
              height: frameHeight,
              locked: false,
              color: i % 2 === 0 ? "#000000" : "#FFFFFF",
              rotation: 0,
            }
          })
      } else if (templateId === "vertical-column") {
        // Create a vertical column
        const frameHeight = 60
        const frameWidth = 80
        const gap = 20
        const startX = 100
        const startY = 20

        newFrames = Array(4)
          .fill(null)
          .map((_, i) => {
            return {
              id: (i + 1).toString(),
              x: startX,
              y: startY + i * (frameHeight + gap),
              width: frameWidth,
              height: frameHeight,
              locked: false,
              color: i % 2 === 0 ? "#000000" : "#FFFFFF",
              rotation: 0,
            }
          })
      }

      setFrames(newFrames)
      setIsGenerating(false)
      showToastNotification(`Applied ${layoutTemplates.find((t) => t.id === templateId)?.name} template`)
    }, 1000)
  }

  const showToastNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const saveLayout = () => {
    // In a real app, this would save to a database
    showToastNotification("Layout saved successfully")
  }

  const rotateFrame = (id: string, direction: "clockwise" | "counterclockwise") => {
    setFrames(
      frames.map((frame) => {
        if (frame.id === id) {
          const rotationChange = direction === "clockwise" ? 1 : -1
          return {
            ...frame,
            rotation: frame.rotation + rotationChange,
          }
        }
        return frame
      }),
    )
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50))
  }

  const handleRoomStyleChange = (style: string) => {
    setRoomStyle(style)

    // Change wall color based on room style
    if (style === "modern") {
      setWallColor("#F5F5F0")
    } else if (style === "minimalist") {
      setWallColor("#FFFFFF")
    } else if (style === "classic") {
      setWallColor("#F0EAE0")
    } else if (style === "industrial") {
      setWallColor("#E0E0E0")
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-8 py-8">
        <ProgressStepper
          steps={[
            { id: "frames", label: "Frame Inventory", status: "completed" },
            { id: "layout", label: "Layout Generator", status: "current" },
            { id: "photos", label: "Photo Selection", status: "upcoming" },
            { id: "visualization", label: "Visualization", status: "upcoming" },
            { id: "details", label: "Details", status: "upcoming" },
          ]}
        />

        <div className="mt-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Layout Generator</h1>
                <p className="text-gray-600 mt-2">
                  Design your perfect photo wall layout with our AI-powered generator
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  {showSidebar ? <PanelLeft size={20} /> : <Menu size={20} />}
                </button>

                <motion.button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md flex items-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveLayout}
                >
                  <Save size={16} className="mr-2" />
                  Save
                </motion.button>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/projects/new/photos"
                    className="px-4 py-2 bg-black text-white rounded-md flex items-center hover:bg-gray-800 transition-colors"
                  >
                    Continue
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="flex">
            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  className="w-64 flex-shrink-0 mr-6 overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 256, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Sidebar tabs */}
                    <div className="flex border-b border-gray-200">
                      <button
                        className={`flex-1 py-3 px-4 text-sm font-medium ${
                          activeTab === "layouts" ? "text-black border-b-2 border-black" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("layouts")}
                      >
                        Layouts
                      </button>
                      <button
                        className={`flex-1 py-3 px-4 text-sm font-medium ${
                          activeTab === "frames" ? "text-black border-b-2 border-black" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("frames")}
                      >
                        Frames
                      </button>
                      <button
                        className={`flex-1 py-3 px-4 text-sm font-medium ${
                          activeTab === "room" ? "text-black border-b-2 border-black" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("room")}
                      >
                        Room
                      </button>
                    </div>

                    {/* Tab content */}
                    <div className="p-4">
                      {activeTab === "layouts" && (
                        <div>
                          <div className="mb-6">
                            <motion.button
                              onClick={generateNewLayout}
                              className="w-full py-2.5 px-4 bg-black text-white rounded-md flex items-center justify-center group relative overflow-hidden"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isGenerating}
                            >
                              <RefreshCw
                                size={16}
                                className={`mr-2 ${isGenerating ? "animate-spin" : "group-hover:animate-spin"}`}
                              />
                              {isGenerating ? "Generating..." : "Generate AI Layout"}
                              {isGenerating && (
                                <motion.div
                                  className="absolute inset-0 bg-black"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.5 }}
                                  style={{ opacity: 0.2 }}
                                />
                              )}
                            </motion.button>
                          </div>

                          <h3 className="font-medium text-sm mb-3 text-gray-700">Layout Templates</h3>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {layoutTemplates.map((template) => (
                              <motion.div
                                key={template.id}
                                className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${
                                  selectedTemplate === template.id ? "border-black" : "border-transparent"
                                }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => applyTemplate(template.id)}
                              >
                                <div className="relative h-20 w-full">
                                  <Image
                                    src={template.image || "/placeholder.svg"}
                                    alt={template.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all">
                                  {selectedTemplate === template.id && (
                                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                                      <Check size={14} className="text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 py-1 px-2">
                                  <p className="text-white text-xs">{template.name}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-700">Spacing</label>
                                <span className="text-xs text-gray-500">{spacing} inches</span>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => setSpacing(Math.max(1, spacing - 0.5))}
                                  className="p-1 bg-gray-100 rounded-l-md hover:bg-gray-200 text-gray-700"
                                >
                                  <Minus size={14} />
                                </button>
                                <input
                                  type="range"
                                  min="1"
                                  max="6"
                                  step="0.5"
                                  value={spacing}
                                  onChange={(e) => setSpacing(Number.parseFloat(e.target.value))}
                                  className="w-full mx-1 accent-black"
                                />
                                <button
                                  onClick={() => setSpacing(Math.min(6, spacing + 0.5))}
                                  className="p-1 bg-gray-100 rounded-r-md hover:bg-gray-200 text-gray-700"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <label className="text-xs font-medium text-gray-700">Symmetry</label>
                                <span className="text-xs text-gray-500">{symmetry}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={symmetry}
                                onChange={(e) => setSymmetry(Number.parseInt(e.target.value))}
                                className="w-full accent-black"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "frames" && (
                        <div>
                          <h3 className="font-medium text-sm mb-3 text-gray-700">Frame List</h3>
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {frames.map((frame) => (
                              <motion.div
                                key={frame.id}
                                className={`p-3 rounded-md border ${
                                  selectedFrame === frame.id
                                    ? "border-black bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300"
                                } cursor-pointer transition-colors`}
                                onClick={() => setSelectedFrame(frame.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div
                                      className="w-6 h-6 rounded-sm mr-3"
                                      style={{
                                        backgroundColor: frame.color,
                                        border: frame.color === "#FFFFFF" ? "1px solid #e5e7eb" : "none",
                                      }}
                                    ></div>
                                    <span className="text-sm font-medium">Frame {frame.id}</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleLock(frame.id)
                                    }}
                                    className={`p-1.5 rounded-full ${
                                      frame.locked
                                        ? "bg-black/10 text-black"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                                  >
                                    {frame.locked ? <Lock size={14} /> : <Unlock size={14} />}
                                  </button>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                  <span>
                                    {frame.width}×{frame.height}
                                  </span>
                                  <span>{frame.rotation !== 0 && `${frame.rotation}° rotation`}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {selectedFrame && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h3 className="font-medium text-sm mb-3 text-gray-700">Frame Options</h3>
                              <div className="flex justify-between mb-2">
                                <button
                                  onClick={() => rotateFrame(selectedFrame, "counterclockwise")}
                                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700"
                                >
                                  <RotateCw size={16} className="transform -scale-x-100" />
                                </button>
                                <button
                                  onClick={() => rotateFrame(selectedFrame, "clockwise")}
                                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700"
                                >
                                  <RotateCw size={16} />
                                </button>
                                <button
                                  onClick={() => toggleLock(selectedFrame)}
                                  className={`p-2 ${
                                    frames.find((f) => f.id === selectedFrame)?.locked
                                      ? "bg-black/10 text-black"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  } rounded-md`}
                                >
                                  {frames.find((f) => f.id === selectedFrame)?.locked ? (
                                    <Lock size={16} />
                                  ) : (
                                    <Unlock size={16} />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "room" && (
                        <div>
                          <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Room Style</label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { id: "modern", name: "Modern" },
                                { id: "minimalist", name: "Minimalist" },
                                { id: "classic", name: "Classic" },
                                { id: "industrial", name: "Industrial" },
                              ].map((style) => (
                                <button
                                  key={style.id}
                                  className={`py-2 px-3 text-xs font-medium rounded-md ${
                                    roomStyle === style.id
                                      ? "bg-black text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                  onClick={() => handleRoomStyleChange(style.id)}
                                >
                                  {style.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Wall Color</label>
                            <div className="grid grid-cols-6 gap-2">
                              {[
                                { color: "#FFFFFF", name: "White" },
                                { color: "#F5F5F0", name: "Off-White" },
                                { color: "#F0EAE0", name: "Beige" },
                                { color: "#E0E0E0", name: "Light Gray" },
                                { color: "#D6E2E0", name: "Sage" },
                                { color: "#E6D7D2", name: "Blush" },
                              ].map((color) => (
                                <button
                                  key={color.color}
                                  className={`w-8 h-8 rounded-full border ${
                                    wallColor === color.color
                                      ? "border-black ring-2 ring-black ring-offset-2"
                                      : "border-gray-300"
                                  }`}
                                  style={{ backgroundColor: color.color }}
                                  onClick={() => setWallColor(color.color)}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-xs font-medium text-gray-700">Wall Dimensions</label>
                              <button
                                className="text-xs text-black underline"
                                onClick={() => setShowMeasurementModal(true)}
                              >
                                Edit
                              </button>
                            </div>
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                              <div className="flex items-center">
                                <Ruler size={14} className="text-gray-500 mr-2" />
                                <span className="text-sm">
                                  {wallDimensions.width}' × {wallDimensions.height}'
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Display Options</label>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Show Grid</span>
                                <button
                                  className={`w-10 h-5 rounded-full ${
                                    showGrid ? "bg-black" : "bg-gray-300"
                                  } relative transition-colors`}
                                  onClick={() => setShowGrid(!showGrid)}
                                >
                                  <span
                                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                                      showGrid ? "translate-x-5" : ""
                                    }`}
                                  ></span>
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Show Rulers</span>
                                <button
                                  className={`w-10 h-5 rounded-full ${
                                    showRulers ? "bg-black" : "bg-gray-300"
                                  } relative transition-colors`}
                                  onClick={() => setShowRulers(!showRulers)}
                                >
                                  <span
                                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                                      showRulers ? "translate-x-5" : ""
                                    }`}
                                  ></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main workspace */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Toolbar */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      <Undo size={16} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      <Redo size={16} />
                    </button>
                    <div className="h-4 border-r border-gray-200 mx-1"></div>
                    <button
                      className={`p-2 rounded-md transition-colors ${
                        showGrid ? "text-black bg-gray-100" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setShowGrid(!showGrid)}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      className={`p-2 rounded-md transition-colors ${
                        showRulers ? "text-black bg-gray-100" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setShowRulers(!showRulers)}
                    >
                      <Ruler size={16} />
                    </button>
                  </div>

                  <div className="flex items-center">
                    <button
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-medium mx-2">{zoom}%</span>
                    <button
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={handleZoomIn}
                      disabled={zoom >= 200}
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>
                </div>

                {/* Canvas */}
                <div
                  className="relative bg-gray-100 overflow-auto"
                  style={{ height: "calc(100vh - 300px)", minHeight: "500px" }}
                  ref={canvasRef}
                >
                  {/* Rulers */}
                  {showRulers && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-6 bg-white border-b border-gray-200 z-10">
                        <div className="relative h-full">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute top-0 bottom-0 border-r border-gray-300 flex items-end"
                              style={{ left: `${i * 50}px` }}
                            >
                              <span className="text-[10px] text-gray-500 mb-0.5 ml-0.5">{i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 bottom-0 w-6 bg-white border-r border-gray-200 z-10">
                        <div className="relative w-full">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute left-0 right-0 border-b border-gray-300 flex items-start justify-end"
                              style={{ top: `${i * 50}px` }}
                            >
                              <span className="text-[10px] text-gray-500 mr-0.5 mt-0.5">{i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Wall canvas */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ paddingTop: showRulers ? "24px" : "0", paddingLeft: showRulers ? "24px" : "0" }}
                  >
                    <div
                      ref={wallRef}
                      className="relative shadow-md"
                      style={{
                        width: `${wallDimensions.width * 100 * (zoom / 100)}px`,
                        height: `${wallDimensions.height * 100 * (zoom / 100)}px`,
                        maxWidth: "90%",
                        maxHeight: "90%",
                        backgroundColor: wallColor,
                        backgroundImage: roomStyle === "industrial" ? "url('/concrete-wall-texture.png')" : undefined,
                        backgroundSize: "cover",
                      }}
                    >
                      {/* Grid overlay */}
                      {showGrid && (
                        <div className="absolute inset-0 pointer-events-none">
                          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                          </svg>
                        </div>
                      )}

                      {/* Frames */}
                      {frames.map((frame) => (
                        <motion.div
                          key={frame.id}
                          className={`absolute border-2 ${
                            selectedFrame === frame.id
                              ? "border-black"
                              : frame.locked
                                ? "border-gray-400"
                                : "border-gray-400"
                          } hover:shadow-lg cursor-move transition-all`}
                          style={{
                            left: `${frame.x * (zoom / 100)}px`,
                            top: `${frame.y * (zoom / 100)}px`,
                            width: `${frame.width * (zoom / 100)}px`,
                            height: `${frame.height * (zoom / 100)}px`,
                            backgroundColor: frame.color === "#FFFFFF" ? "#FAFAFA" : frame.color,
                            borderColor:
                              selectedFrame === frame.id
                                ? "#000000"
                                : frame.locked
                                  ? "#888888"
                                  : frame.color === "#FFFFFF"
                                    ? "#E5E7EB"
                                    : frame.color,
                            transform: `rotate(${frame.rotation}deg)`,
                            zIndex: selectedFrame === frame.id ? 10 : 1,
                          }}
                          onClick={() => setSelectedFrame(frame.id)}
                          whileHover={{ scale: 1.02 }}
                          animate={{ x: 0, y: 0 }}
                          drag
                          dragConstraints={wallRef}
                          dragMomentum={false}
                          dragElastic={0}
                        >
                          {frame.locked && (
                            <div className="absolute top-1 right-1 text-gray-500 bg-white bg-opacity-70 rounded-full p-0.5">
                              <Lock size={10} />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Measurement Modal */}
      <AnimatePresence>
        {showMeasurementModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Wall Dimensions</h2>
                  <button
                    onClick={() => setShowMeasurementModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width (feet)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={wallDimensions.width}
                      onChange={(e) =>
                        setWallDimensions({ ...wallDimensions, width: Number.parseFloat(e.target.value) || 1 })
                      }
                      className="w-full p-2 border-2 border-gray-200 rounded-md text-gray-900 focus:border-black focus:ring focus:ring-black/20 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (feet)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={wallDimensions.height}
                      onChange={(e) =>
                        setWallDimensions({ ...wallDimensions, height: Number.parseFloat(e.target.value) || 1 })
                      }
                      className="w-full p-2 border-2 border-gray-200 rounded-md text-gray-900 focus:border-black focus:ring focus:ring-black/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <motion.button
                    className="px-4 py-2 bg-black text-white rounded-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMeasurementModal(false)}
                  >
                    Done
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-black/5 p-2 rounded-full mr-3">
              <Check className="text-black" size={16} />
            </div>
            <p className="font-medium text-gray-900">{toastMessage}</p>
            <button onClick={() => setShowToast(false)} className="ml-4 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
