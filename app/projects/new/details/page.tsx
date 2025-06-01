"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProgressStepper } from "@/components/progress-stepper"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Edit,
  Share2,
  Printer,
  ShoppingBag,
  Download,
  ChevronDown,
  ChevronUp,
  Info,
  Check,
  X,
  Sparkles,
  Heart,
  Star,
  ArrowLeft,
} from "lucide-react"

interface FrameDetail {
  id: string
  size: string
  content: string
  position: string
}

export default function DetailsPage() {
  const [layoutName, setLayoutName] = useState("Living Room Gallery")
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    frames: true,
    installation: false,
  })
  const [showToast, setShowToast] = useState(false)
  const [liked, setLiked] = useState(false)

  const frameDetails: FrameDetail[] = [
    { id: "1", size: '4" × 6"', content: "Family portrait", position: "Top left" },
    { id: "2", size: '5" × 7"', content: "Mountain landscape", position: "Top right" },
    { id: "3", size: '8" × 10"', content: "Beach sunset", position: "Bottom center" },
    { id: "4", size: '4" × 6"', content: "Child portrait", position: "Middle left" },
    { id: "5", size: '5" × 7"', content: "City skyline", position: "Middle right" },
    { id: "6", size: '8" × 10"', content: "Forest landscape", position: "Bottom right" },
  ]

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections],
    })
  }

  const saveLayout = () => {
    setIsEditing(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        <ProgressStepper
          steps={[
            { id: "frames", label: "Frame Inventory", status: "completed" },
            { id: "layout", label: "Layout Generator", status: "completed" },
            { id: "photos", label: "Photo Selection", status: "completed" },
            { id: "visualization", label: "Visualization", status: "completed" },
            { id: "details", label: "Details", status: "current" },
          ]}
        />

        <div className="mt-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 flex items-center">
              Layout Details
              <span className="ml-3 text-punch-pink text-2xl">🎉</span>
            </h1>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl">
              Review and finalize your photo wall layout. You're almost done creating your perfect photo wall!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preview */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10">
                <div className="flex justify-between items-center mb-6">
                  {isEditing ? (
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        value={layoutName}
                        onChange={(e) => setLayoutName(e.target.value)}
                        className="text-2xl font-bold border-b-2 border-neo-teal p-1 w-full focus:outline-none"
                        autoFocus
                      />
                      <button onClick={saveLayout} className="ml-2 text-neo-teal">
                        <Check size={20} />
                      </button>
                      <button onClick={() => setIsEditing(false)} className="ml-2 text-punch-pink">
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-2xl font-bold flex items-center text-gray-900">
                        {layoutName}
                        <button onClick={() => setIsEditing(true)} className="ml-2 text-gray-400 hover:text-gray-600">
                          <Edit size={16} />
                        </button>
                      </h2>
                      <motion.button
                        className={`p-2 rounded-full ${liked ? "bg-punch-pink/10 text-punch-pink" : "bg-gray-100 text-gray-400"}`}
                        onClick={() => setLiked(!liked)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={20} className={liked ? "fill-punch-pink" : ""} />
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="relative rounded-xl overflow-hidden mb-6" style={{ height: "400px" }}>
                  <Image src="/photo-wall-layout.png" alt="Layout Preview" fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-neo-teal text-white text-xs px-2 py-1 rounded-full">
                    Completed
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    className="btn-primary flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit size={18} className="mr-2" />
                    Edit Layout
                  </motion.button>
                  <motion.button
                    className="btn-secondary flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 size={18} className="mr-2" />
                    Share
                  </motion.button>
                  <motion.button
                    className="btn-secondary flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Printer size={18} className="mr-2" />
                    Print
                  </motion.button>
                  <motion.button
                    className="btn-secondary flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Shop Frames
                  </motion.button>
                  <motion.button
                    className="btn-secondary flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={18} className="mr-2" />
                    Export
                  </motion.button>
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-br from-neo-teal/5 to-punch-pink/5 rounded-2xl shadow-md p-6 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <Sparkles className="text-neo-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Share Your Creation</h3>
                    <p className="text-gray-600 mb-4">
                      Your wall looks amazing! Share it with friends and family to show off your design skills.
                    </p>
                    <div className="flex space-x-2">
                      <button className="bg-[#1877F2] text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Facebook
                      </button>
                      <button className="bg-[#1DA1F2] text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Twitter
                      </button>
                      <button className="bg-[#E60023] text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Pinterest
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Details sidebar */}
            <div className="space-y-6">
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-neo-teal">Layout Details</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <p className="text-gray-700 font-medium">Wall Size</p>
                    <p className="text-gray-900">2.5' × 2.3'</p>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <p className="text-gray-700 font-medium">Style</p>
                    <p className="text-gray-900">Grid</p>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <p className="text-gray-700 font-medium">Total Frames</p>
                    <p className="text-gray-900">6</p>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <p className="text-gray-700 font-medium">Created</p>
                    <p className="text-gray-900">May 17, 2025</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">Rating</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleSection("frames")}
                >
                  <h2 className="text-xl font-semibold text-neo-teal">Frame Details</h2>
                  {expandedSections.frames ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {expandedSections.frames && (
                  <div className="mt-4 space-y-3">
                    {frameDetails.map((frame) => (
                      <motion.div
                        key={frame.id}
                        className="border-b border-gray-100 pb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900">Frame {frame.id}</p>
                          <p className="text-gray-500">{frame.size}</p>
                        </div>
                        <p className="text-gray-700 text-sm">{frame.content}</p>
                        <p className="text-gray-500 text-sm">{frame.position}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleSection("installation")}
                >
                  <h2 className="text-xl font-semibold text-neo-teal">Installation Guide</h2>
                  {expandedSections.installation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {expandedSections.installation && (
                  <motion.div
                    className="mt-4 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700">Follow these steps to install your photo wall:</p>

                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>Measure and mark the center point of your wall.</li>
                      <li>Use painter's tape to outline the total area of your layout.</li>
                      <li>Start with the center frame and work outwards.</li>
                      <li>Use a level to ensure frames are straight.</li>
                      <li>Maintain consistent spacing between frames.</li>
                    </ol>

                    <div className="bg-neo-teal/5 p-4 rounded-xl flex items-start">
                      <Info size={20} className="text-neo-teal mr-2 flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-700">
                        For best results, use picture hanging strips or hooks rated for the weight of your frames.
                      </p>
                    </div>

                    <motion.button
                      className="w-full btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download Detailed Instructions
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-neo-teal/10 to-punch-pink/10 rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-neo-teal">Cost Estimate</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-700">Frames (6)</p>
                    <p className="font-medium text-gray-900">$120.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Printing (6)</p>
                    <p className="font-medium text-gray-900">$45.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Hanging Hardware</p>
                    <p className="font-medium text-gray-900">$15.00</p>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <p className="text-gray-900">Total</p>
                    <p className="text-neo-teal">$180.00</p>
                  </div>
                </div>

                <motion.button
                  className="w-full btn-accent mt-4 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Shop Materials
                </motion.button>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Link
              href="/projects/new/visualization"
              className="text-neo-teal hover:text-neo-teal/80 transition-colors text-sm font-medium flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Visualization
            </Link>

            <motion.button
              className="btn-primary flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Complete Project
            </motion.button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 flex items-center z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Check className="text-green-600" size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">Layout saved successfully</p>
              <p className="text-gray-500 text-sm">Your changes have been saved</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
