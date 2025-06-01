"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Camera, RotateCw, Smartphone, Download, ArrowRight, Maximize, Minimize, Move, Layers } from "lucide-react"

export function ARVisualization() {
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main AR view */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: "600px" }}>
            {!isInitialized ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                {isLoading ? (
                  <>
                    <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                    <p>Initializing AR experience...</p>
                  </>
                ) : (
                  <>
                    <Camera size={48} className="mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Start AR Visualization</h3>
                    <p className="text-gray-400 text-center max-w-md mb-6">
                      Point your camera at a blank wall to see how your photo wall will look in your space.
                    </p>
                    <button onClick={startAR} className="btn-primary">
                      Start Camera
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                {/* AR View */}
                <div className="absolute inset-0">
                  <Image
                    src="/placeholder.svg?height=600&width=800&query=living room wall with photo frames AR visualization"
                    alt="AR Visualization"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* AR Guides */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="200"
                      y="150"
                      width="400"
                      height="300"
                      stroke="rgba(0, 128, 128, 0.7)"
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
                  <div className="bg-black bg-opacity-70 rounded-full p-2 flex space-x-4">
                    <button className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <RotateCw size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Move size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Layers size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-colors">
                      <Camera size={20} />
                    </button>
                  </div>
                </div>

                {/* Desktop controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-black bg-opacity-70 hover:bg-black hover:bg-opacity-80 rounded-md text-white transition-colors">
                    <Maximize size={20} />
                  </button>
                  <button className="p-2 bg-black bg-opacity-70 hover:bg-black hover:bg-opacity-80 rounded-md text-white transition-colors">
                    <Minimize size={20} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex space-x-2">
              <button className="btn-secondary flex items-center">
                <Download size={18} className="mr-2" />
                Take Screenshot
              </button>
              <button className="btn-secondary flex items-center">
                <RotateCw size={18} className="mr-2" />
                Reset View
              </button>
            </div>

            <Link href="/projects/new/details" className="btn-primary flex items-center">
              Continue
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Controls sidebar */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">AR Controls</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wall Color</label>
              <div className="grid grid-cols-6 gap-2">
                <button className="w-8 h-8 rounded-full bg-white border border-gray-300"></button>
                <button className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></button>
                <button className="w-8 h-8 rounded-full bg-gray-300 border border-gray-300"></button>
                <button className="w-8 h-8 rounded-full bg-blue-100 border border-gray-300"></button>
                <button className="w-8 h-8 rounded-full bg-green-100 border border-gray-300"></button>
                <button className="w-8 h-8 rounded-full bg-yellow-100 border border-gray-300"></button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lighting</label>
              <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scale</label>
              <div className="flex items-center">
                <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-200">
                  <Minimize size={16} />
                </button>
                <input type="range" min="50" max="150" defaultValue="100" className="w-full mx-2" />
                <button className="p-1 bg-gray-100 rounded-md hover:bg-gray-200">
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Continue on Mobile</h2>
          <p className="text-gray-600 text-sm mb-4">
            For the best AR experience, scan this QR code with your mobile device.
          </p>

          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40 border border-gray-200 rounded-lg">
              <Image
                src="/placeholder.svg?height=160&width=160&query=QR code"
                alt="QR Code"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <button className="w-full btn-secondary flex items-center justify-center">
            <Smartphone size={18} className="mr-2" />
            Send Link to Phone
          </button>
        </div>
      </div>
    </div>
  )
}
