"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProgressStepper } from "@/components/progress-stepper"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Camera,
  RotateCw,
  Smartphone,
  Download,
  ArrowRight,
  Maximize,
  Minimize,
  Move,
  Layers,
  Sparkles,
  Zap,
  ArrowLeft,
} from "lucide-react"

export default function VisualizationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const startAR = () => {
    setIsLoading(true)
    // Simulate AR initialization
    setTimeout(() => {
      setIsLoading(false)
      setIsInitialized(true)
    }, 2000)
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
            { id: "visualization", label: "Visualization", status: "current" },
            { id: "details", label: "Details", status: "upcoming" },
          ]}
        />

        <div className="mt-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 flex items-center">
              AR Wall Visualization
              <span className="ml-3 text-punch-pink text-2xl">🔮</span>
            </h1>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl">
              See how your photo wall will look in your space using augmented reality. Point your camera at a wall to
              visualize your design in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main AR view */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10">
                <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ height: "600px" }}>
                  {!isInitialized ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      {isLoading ? (
                        <>
                          <div className="w-16 h-16 border-4 border-t-neo-teal border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                          <p>Initializing AR experience...</p>
                        </>
                      ) : (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                          >
                            <div className="w-20 h-20 bg-neo-teal/20 rounded-full flex items-center justify-center mb-4">
                              <Camera size={40} className="text-neo-teal" />
                            </div>
                          </motion.div>
                          <h3 className="text-xl font-semibold mb-2">Start AR Visualization</h3>
                          <p className="text-gray-400 text-center max-w-md mb-6">
                            Point your camera at a blank wall to see how your photo wall will look in your space.
                          </p>
                          <motion.button
                            onClick={startAR}
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Start Camera
                          </motion.button>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* AR View */}
                      <div className="absolute inset-0">
                        <Image src="/ar-photo-wall.png" alt="AR Visualization" fill className="object-cover" />
                      </div>

                      {/* AR Guides */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 800 600"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="200"
                            y="150"
                            width="400"
                            height="300"
                            stroke="rgba(0, 191, 166, 0.7)"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                          />
                          <text x="400" y="130" fill="white" fontSize="14" textAnchor="middle">
                            Wall detected
                          </text>
                          <text x="400" y="470" fill="white" fontSize="14" textAnchor="middle">
                            2.5' × 2.3'
                          </text>
                        </svg>
                      </div>

                      {/* Controls overlay */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <motion.div
                          className="bg-black bg-opacity-70 rounded-full p-2 flex space-x-4"
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.button
                            className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <RotateCw size={20} />
                          </motion.button>
                          <motion.button
                            className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Move size={20} />
                          </motion.button>
                          <motion.button
                            className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Layers size={20} />
                          </motion.button>
                          <motion.button
                            className="w-10 h-10 rounded-full bg-neo-teal text-white hover:bg-neo-teal/90 flex items-center justify-center transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Camera size={20} />
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* Desktop controls */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <motion.button
                          className="p-2 bg-black bg-opacity-70 hover:bg-black hover:bg-opacity-80 rounded-md text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Maximize size={20} />
                        </motion.button>
                        <motion.button
                          className="p-2 bg-black bg-opacity-70 hover:bg-black hover:bg-opacity-80 rounded-md text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minimize size={20} />
                        </motion.button>
                      </div>

                      {/* Floating tips */}
                      <motion.div
                        className="absolute bottom-20 left-4 bg-white p-3 rounded-lg shadow-md text-sm flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >
                        <div className="w-6 h-6 bg-neo-teal/10 rounded-full flex items-center justify-center text-neo-teal">
                          <Zap size={12} />
                        </div>
                        <p className="text-gray-700">
                          <span className="font-medium">Pro tip:</span> Move around to see different angles
                        </p>
                      </motion.div>
                    </>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <div className="flex space-x-2">
                    <Link
                      href="/projects/new/photos"
                      className="text-neo-teal hover:text-neo-teal/80 transition-colors text-sm font-medium flex items-center"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back to Photos
                    </Link>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      className="btn-secondary flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download size={18} className="mr-2" />
                      Take Screenshot
                    </motion.button>
                    <motion.button
                      className="btn-secondary flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RotateCw size={18} className="mr-2" />
                      Reset View
                    </motion.button>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/projects/new/details" className="btn-primary flex items-center group">
                      Continue
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Controls sidebar */}
            <div className="space-y-6">
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-neo-teal flex items-center">
                  AR Controls
                  <Sparkles size={18} className="ml-2 text-punch-pink" />
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wall Color</label>
                    <div className="grid grid-cols-6 gap-2">
                      <button className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:scale-110 transition-transform"></button>
                      <button className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 hover:scale-110 transition-transform"></button>
                      <button className="w-8 h-8 rounded-full bg-gray-300 border border-gray-300 hover:scale-110 transition-transform"></button>
                      <button className="w-8 h-8 rounded-full bg-blue-100 border border-gray-300 hover:scale-110 transition-transform"></button>
                      <button className="w-8 h-8 rounded-full bg-green-100 border border-gray-300 hover:scale-110 transition-transform"></button>
                      <button className="w-8 h-8 rounded-full bg-yellow-100 border border-gray-300 hover:scale-110 transition-transform"></button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Lighting</label>
                      <span className="text-sm text-gray-500">50%</span>
                    </div>
                    <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-neo-teal" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Scale</label>
                      <span className="text-sm text-gray-500">100%</span>
                    </div>
                    <div className="flex items-center">
                      <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-200">
                        <Minimize size={16} />
                      </button>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        defaultValue="100"
                        className="w-full mx-2 accent-neo-teal"
                      />
                      <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-200">
                        <Maximize size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-neo-teal/10 to-punch-pink/10 rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-neo-teal flex items-center">
                  Continue on Mobile
                  <Smartphone size={18} className="ml-2 text-punch-pink" />
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  For the best AR experience, scan this QR code with your mobile device.
                </p>

                <div className="flex justify-center mb-4">
                  <motion.div
                    className="relative w-40 h-40 border-2 border-neo-teal/20 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image src="/qr-code.png" alt="QR Code" fill className="object-cover" />
                  </motion.div>
                </div>

                <motion.button
                  className="w-full btn-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Smartphone size={18} className="mr-2" />
                  Send Link to Phone
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
