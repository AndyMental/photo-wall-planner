"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Share2, Printer, ShoppingBag, Download, ChevronDown, ChevronUp, Info, Check, X } from "lucide-react"

interface FrameDetail {
  id: string
  size: string
  content: string
  position: string
}

export function LayoutDetails() {
  const [layoutName, setLayoutName] = useState("Living Room Gallery")
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    frames: true,
    installation: false,
  })
  const [showToast, setShowToast] = useState(false)

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Preview */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            {isEditing ? (
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={layoutName}
                  onChange={(e) => setLayoutName(e.target.value)}
                  className="text-2xl font-bold border-b border-primary p-1 w-full focus:outline-none"
                  autoFocus
                />
                <button onClick={saveLayout} className="ml-2 text-primary">
                  <Check size={20} />
                </button>
                <button onClick={() => setIsEditing(false)} className="ml-2 text-red-500">
                  <X size={20} />
                </button>
              </div>
            ) : (
              <h2 className="text-2xl font-bold flex items-center">
                {layoutName}
                <button onClick={() => setIsEditing(true)} className="ml-2 text-gray-400 hover:text-gray-600">
                  <Edit size={16} />
                </button>
              </h2>
            )}
          </div>

          <div className="relative rounded-lg overflow-hidden mb-6" style={{ height: "400px" }}>
            <Image
              src="/placeholder.svg?height=400&width=800&query=photo wall layout with frames and photos"
              alt="Layout Preview"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="btn-primary flex items-center">
              <Edit size={18} className="mr-2" />
              Edit Layout
            </button>
            <button className="btn-secondary flex items-center">
              <Share2 size={18} className="mr-2" />
              Share
            </button>
            <button className="btn-secondary flex items-center">
              <Printer size={18} className="mr-2" />
              Print
            </button>
            <button className="btn-secondary flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              Shop Frames
            </button>
            <button className="btn-secondary flex items-center">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Details sidebar */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Layout Details</h2>

          <div className="space-y-4">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Wall Size:</span> 2.5' × 2.3'
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Style:</span> Grid
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Total Frames:</span> 6
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Created:</span> May 17, 2025
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <button
            className="w-full flex justify-between items-center text-left"
            onClick={() => toggleSection("frames")}
          >
            <h2 className="text-xl font-semibold">Frame Details</h2>
            {expandedSections.frames ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expandedSections.frames && (
            <div className="mt-4 space-y-3">
              {frameDetails.map((frame) => (
                <div key={frame.id} className="border-b border-gray-100 pb-2">
                  <div className="flex justify-between">
                    <p className="font-medium">Frame {frame.id}</p>
                    <p className="text-gray-500">{frame.size}</p>
                  </div>
                  <p className="text-gray-700 text-sm">{frame.content}</p>
                  <p className="text-gray-500 text-sm">{frame.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <button
            className="w-full flex justify-between items-center text-left"
            onClick={() => toggleSection("installation")}
          >
            <h2 className="text-xl font-semibold">Installation Guide</h2>
            {expandedSections.installation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expandedSections.installation && (
            <div className="mt-4 space-y-4">
              <p className="text-gray-700">Follow these steps to install your photo wall:</p>

              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Measure and mark the center point of your wall.</li>
                <li>Use painter's tape to outline the total area of your layout.</li>
                <li>Start with the center frame and work outwards.</li>
                <li>Use a level to ensure frames are straight.</li>
                <li>Maintain consistent spacing between frames.</li>
              </ol>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <Info size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  For best results, use picture hanging strips or hooks rated for the weight of your frames.
                </p>
              </div>

              <button className="w-full btn-secondary">Download Detailed Instructions</button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Cost Estimate</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-700">Frames (6)</p>
              <p className="font-medium">$120.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Printing (6)</p>
              <p className="font-medium">$45.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Hanging Hardware</p>
              <p className="font-medium">$15.00</p>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <p>Total</p>
              <p>$180.00</p>
            </div>
          </div>

          <button className="w-full btn-accent mt-4 flex items-center justify-center">
            <ShoppingBag size={18} className="mr-2" />
            Shop Materials
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center z-50 animate-fade-in">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <Check className="text-green-600" size={20} />
          </div>
          <div>
            <p className="font-medium">Layout saved successfully</p>
            <p className="text-gray-500 text-sm">Your changes have been saved</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-4 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
