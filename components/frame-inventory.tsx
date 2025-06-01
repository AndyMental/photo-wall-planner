"use client"

import { useState, useRef } from "react"
import { Plus, Trash2, Camera, HelpCircle, ArrowRight, Sparkles, Edit2, Check, X, Grid3X3, Zap } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface Frame {
  id: string
  width: number
  height: number
  quantity: number
  color: string
}

const initialFrames: Frame[] = [
  { id: "1", width: 4, height: 6, quantity: 6, color: "Black" },
  { id: "2", width: 5, height: 7, quantity: 4, color: "White" },
  { id: "3", width: 8, height: 10, quantity: 2, color: "Natural Wood" },
]

const frameColors = [
  { name: "Black", value: "#1e1e1e" },
  { name: "White", value: "#FFFFFF" },
  { name: "Natural Wood", value: "#D2B48C" },
  { name: "Dark Wood", value: "#5D4037" },
  { name: "Silver", value: "#C0C0C0" },
  { name: "Gold", value: "#FFD700" },
  { name: "Teal", value: "#00bfa6" },
  { name: "Coral", value: "#ff4c61" },
]

const commonFrameSizes = [
  { width: 4, height: 6, name: "4×6 (Standard)" },
  { width: 5, height: 7, name: "5×7 (Standard)" },
  { width: 8, height: 10, name: "8×10 (Standard)" },
  { width: 11, height: 14, name: "11×14 (Medium)" },
  { width: 16, height: 20, name: "16×20 (Large)" },
  { width: 18, height: 24, name: "18×24 (Poster)" },
  { width: 24, height: 36, name: "24×36 (Poster)" },
]

export function FrameInventory() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [newFrame, setNewFrame] = useState<Partial<Frame>>({
    width: 0,
    height: 0,
    quantity: 1,
    color: "Black",
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const [editingFrame, setEditingFrame] = useState<string | null>(null)
  const [showAddFrameModal, setShowAddFrameModal] = useState(false)
  const [showCommonSizesModal, setShowCommonSizesModal] = useState(false)
  const [hoveredFrame, setHoveredFrame] = useState<string | null>(null)

  const frameListRef = useRef<HTMLDivElement>(null)

  const addFrame = () => {
    if (newFrame.width && newFrame.height && newFrame.quantity && newFrame.color) {
      const frame: Frame = {
        id: Date.now().toString(),
        width: newFrame.width,
        height: newFrame.height,
        quantity: newFrame.quantity,
        color: newFrame.color,
      }
      setFrames([...frames, frame])
      setNewFrame({
        width: 0,
        height: 0,
        quantity: 1,
        color: "Black",
      })
      setShowAddFrameModal(false)

      // Show confetti effect
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)

      // Scroll to bottom of frame list after adding
      setTimeout(() => {
        if (frameListRef.current) {
          frameListRef.current.scrollTop = frameListRef.current.scrollHeight
        }
      }, 100)
    }
  }

  const removeFrame = (id: string) => {
    setFrames(frames.filter((frame) => frame.id !== id))
  }

  const startEditing = (frame: Frame) => {
    setEditingFrame(frame.id)
    setNewFrame({
      width: frame.width,
      height: frame.height,
      quantity: frame.quantity,
      color: frame.color,
    })
    setShowAddFrameModal(true)
  }

  const updateFrame = () => {
    if (editingFrame && newFrame.width && newFrame.height && newFrame.quantity && newFrame.color) {
      setFrames(
        frames.map((frame) =>
          frame.id === editingFrame
            ? {
                ...frame,
                width: newFrame.width,
                height: newFrame.height,
                quantity: newFrame.quantity,
                color: newFrame.color,
              }
            : frame,
        ),
      )
      setEditingFrame(null)
      setNewFrame({
        width: 0,
        height: 0,
        quantity: 1,
        color: "Black",
      })
      setShowAddFrameModal(false)
    }
  }

  const cancelEditing = () => {
    setEditingFrame(null)
    setNewFrame({
      width: 0,
      height: 0,
      quantity: 1,
      color: "Black",
    })
    setShowAddFrameModal(false)
  }

  const getColorDisplay = (colorName: string) => {
    const color = frameColors.find((c) => c.name === colorName)
    return color ? color.value : "#CCCCCC"
  }

  const selectCommonSize = (width: number, height: number) => {
    setNewFrame({ ...newFrame, width, height })
    setShowCommonSizesModal(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-auto">
        {/* Main frame list */}
        <motion.div
          className="md:flex-1 bg-white rounded-lg shadow-lg border border-gray-100 p-4 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-neo-teal/10 text-neo-teal px-2 py-1 rounded-full text-xs font-medium">
                {frames.length} frames
              </span>
              <span className="bg-punch-pink/10 text-punch-pink px-2 py-1 rounded-full text-xs font-medium">
                {frames.reduce((sum, frame) => sum + frame.quantity, 0)} total
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      className="p-2 rounded-full bg-dream-lemon text-soft-black hover:bg-dream-lemon/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCommonSizesModal(true)}
                    >
                      <Grid3X3 size={18} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use common frame sizes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      className="p-2 rounded-full bg-lime-zing text-soft-black hover:bg-lime-zing/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Camera size={18} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scan with camera</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <motion.button
                className="p-2 rounded-full bg-neo-teal text-white hover:bg-neo-teal/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingFrame(null)
                  setNewFrame({
                    width: 0,
                    height: 0,
                    quantity: 1,
                    color: "Black",
                  })
                  setShowAddFrameModal(true)
                }}
              >
                <Plus size={18} />
              </motion.button>
            </div>
          </div>

          {frames.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-auto max-h-[calc(100vh-280px)]"
              ref={frameListRef}
            >
              {frames.map((frame) => (
                <motion.div
                  key={frame.id}
                  className="bg-white rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-all border border-gray-100"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  onHoverStart={() => setHoveredFrame(frame.id)}
                  onHoverEnd={() => setHoveredFrame(null)}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: getColorDisplay(frame.color),
                        border: frame.color === "White" ? "1px solid #e5e7eb" : "none",
                        color: ["White", "Silver", "Gold"].includes(frame.color) ? "#333" : "#fff",
                      }}
                      whileHover={{ rotate: 5 }}
                    >
                      <span className="text-xs font-bold">
                        {frame.width}×{frame.height}
                      </span>
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-soft-black text-sm">
                        {frame.width}" × {frame.height}" {frame.color}
                      </h3>
                      <p className="text-gray-500 text-xs">Quantity: {frame.quantity}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {hoveredFrame === frame.id && (
                      <motion.div
                        className="flex space-x-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      >
                        <motion.button
                          onClick={() => startEditing(frame)}
                          className="p-1.5 rounded-full bg-neo-teal/10 text-neo-teal hover:bg-neo-teal/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit2 size={14} />
                        </motion.button>
                        <motion.button
                          onClick={() => removeFrame(frame.id)}
                          className="p-1.5 rounded-full bg-punch-pink/10 text-punch-pink hover:bg-punch-pink/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-8 bg-gray-50 rounded-lg h-[calc(100vh-280px)] flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neo-teal/10 text-neo-teal mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              >
                <Sparkles size={20} />
              </motion.div>
              <h3 className="text-base font-medium text-soft-black mb-1">No frames yet!</h3>
              <p className="text-gray-500 text-sm mb-4">Add your first frame to get started.</p>
              <motion.button
                onClick={() => setShowAddFrameModal(true)}
                className="px-3 py-1.5 bg-neo-teal text-white rounded-md text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Your First Frame
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* AI suggestions panel */}
        <motion.div
          className="md:w-64 bg-gradient-to-br from-neo-teal/5 to-punch-pink/5 rounded-lg shadow-lg border border-gray-100 p-4 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <motion.div
              className="w-8 h-8 bg-neo-teal/10 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles size={16} className="text-neo-teal" />
            </motion.div>
            <h2 className="text-base font-bold text-soft-black">AI Suggestions</h2>
          </div>

          <div className="space-y-3 flex-1 overflow-auto">
            <motion.div
              className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <p className="text-xs text-gray-700 font-medium mb-1">Recommended Layout</p>
              <p className="text-sm text-soft-black">{frames.length > 4 ? "Salon-style" : "Grid"} arrangement</p>
            </motion.div>

            <motion.div
              className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <p className="text-xs text-gray-700 font-medium mb-1">Optimal Spacing</p>
              <p className="text-sm text-soft-black">2-3 inches between frames</p>
            </motion.div>

            <motion.div
              className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <p className="text-xs text-gray-700 font-medium mb-1">Wall Size Needed</p>
              <p className="text-sm text-soft-black">Approx. 3' × 4' minimum</p>
            </motion.div>
          </div>

          <motion.button
            className="mt-3 w-full bg-neo-teal text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-neo-teal/90 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={14} className="mr-1" />
            Get More Suggestions
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <motion.div
        className="mt-4 flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <button className="text-gray-700 hover:text-soft-black transition-colors text-sm font-medium">Cancel</button>
          <Link
            href="/"
            className="text-neo-teal hover:text-neo-teal/80 transition-colors text-sm font-medium flex items-center"
          >
            <ArrowRight size={16} className="mr-1 rotate-180" />
            Back to Home
          </Link>
        </div>
        <Link
          href="/projects/new/layout"
          className="bg-soft-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-soft-black/90 transition-colors flex items-center group"
        >
          Continue to Layout
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut", repeatDelay: 1 }}
          >
            <ArrowRight size={16} className="ml-2" />
          </motion.span>
        </Link>
      </motion.div>

      {/* Add/Edit Frame Modal */}
      <AnimatePresence>
        {showAddFrameModal && (
          <motion.div
            className="fixed inset-0 bg-soft-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-soft-black flex items-center">
                    {editingFrame ? "Edit Frame" : "Add New Frame"}
                    {!editingFrame && (
                      <motion.span
                        className="ml-2 text-punch-pink"
                        animate={{ rotate: [0, 15, 0, -15, 0] }}
                        transition={{ repeat: 1, duration: 0.6, delay: 0.3 }}
                      >
                        <Sparkles size={16} />
                      </motion.span>
                    )}
                  </h2>
                  <motion.button
                    onClick={cancelEditing}
                    className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-medium text-gray-700">Width (inches)</label>
                        <button
                          className="text-xs text-neo-teal hover:text-neo-teal/80 underline"
                          onClick={() => setShowCommonSizesModal(true)}
                        >
                          Common sizes
                        </button>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={newFrame.width || ""}
                        onChange={(e) => setNewFrame({ ...newFrame, width: Number.parseInt(e.target.value) || 0 })}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:border-neo-teal focus:ring focus:ring-neo-teal/20 focus:outline-none transition-all"
                        placeholder="Width"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Height (inches)</label>
                      <input
                        type="number"
                        min="1"
                        value={newFrame.height || ""}
                        onChange={(e) => setNewFrame({ ...newFrame, height: Number.parseInt(e.target.value) || 0 })}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:border-neo-teal focus:ring focus:ring-neo-teal/20 focus:outline-none transition-all"
                        placeholder="Height"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Frame Color</label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {frameColors.map((color) => (
                        <motion.button
                          key={color.name}
                          type="button"
                          onClick={() => setNewFrame({ ...newFrame, color: color.name })}
                          className={`w-full aspect-square rounded-lg border-2 transition-all ${
                            newFrame.color === color.name ? "border-neo-teal scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {newFrame.color === color.name && (
                            <motion.div
                              className="flex items-center justify-center h-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                              <div className="bg-white bg-opacity-80 rounded-full p-1">
                                <Check size={10} className="text-neo-teal" />
                              </div>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    <select
                      value={newFrame.color}
                      onChange={(e) => setNewFrame({ ...newFrame, color: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:border-neo-teal focus:ring focus:ring-neo-teal/20 focus:outline-none transition-all text-sm"
                    >
                      {frameColors.map((color) => (
                        <option key={color.name} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Quantity
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="ml-1 text-gray-400 hover:text-gray-500">
                              <HelpCircle size={12} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">How many frames of this size and color do you have?</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <div className="flex items-center">
                      <motion.button
                        type="button"
                        onClick={() =>
                          setNewFrame({ ...newFrame, quantity: Math.max(1, (newFrame.quantity || 1) - 1) })
                        }
                        className="p-2 bg-gray-100 rounded-l-md hover:bg-gray-200 text-gray-700"
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        -
                      </motion.button>
                      <input
                        type="number"
                        min="1"
                        value={newFrame.quantity || ""}
                        onChange={(e) => setNewFrame({ ...newFrame, quantity: Number.parseInt(e.target.value) || 0 })}
                        className="w-full p-2 border-y border-gray-300 text-center text-gray-900"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setNewFrame({ ...newFrame, quantity: (newFrame.quantity || 0) + 1 })}
                        className="p-2 bg-gray-100 rounded-r-md hover:bg-gray-200 text-gray-700"
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    {editingFrame ? (
                      <>
                        <motion.button
                          onClick={updateFrame}
                          disabled={!newFrame.width || !newFrame.height || !newFrame.quantity || !newFrame.color}
                          className="flex-1 bg-neo-teal text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neo-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Save Changes
                        </motion.button>
                        <motion.button
                          onClick={cancelEditing}
                          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={addFrame}
                          disabled={!newFrame.width || !newFrame.height || !newFrame.quantity || !newFrame.color}
                          className="flex-1 bg-neo-teal text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neo-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Add Frame
                        </motion.button>
                        <motion.button
                          onClick={cancelEditing}
                          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Common Sizes Modal */}
      <AnimatePresence>
        {showCommonSizesModal && (
          <motion.div
            className="fixed inset-0 bg-soft-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-soft-black">Common Frame Sizes</h2>
                  <motion.button
                    onClick={() => setShowCommonSizesModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {commonFrameSizes.map((size, index) => (
                    <motion.button
                      key={`${size.width}x${size.height}`}
                      className="p-2 text-left rounded-md border border-gray-200 hover:border-neo-teal hover:bg-neo-teal/5 transition-colors"
                      onClick={() => selectCommonSize(size.width, size.height)}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-soft-black text-sm">
                          {size.width}" × {size.height}"
                        </span>
                        <span className="text-gray-500 text-xs">{size.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full absolute`}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  backgroundColor:
                    i % 5 === 0
                      ? "#00bfa6"
                      : i % 5 === 1
                        ? "#ff4c61"
                        : i % 5 === 2
                          ? "#a3e635"
                          : i % 5 === 3
                            ? "#fef08a"
                            : "#1e1e1e",
                }}
                animate={{
                  opacity: 0,
                  x: Math.random() * 500 - 250,
                  y: Math.random() * 500 - 250,
                  scale: Math.random() * 2 + 0.5,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: Math.random() * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
