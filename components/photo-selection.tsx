"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Filter,
  Check,
  X,
  ArrowRight,
  User,
  Mountain,
  Clock,
  Heart,
  ChromeIcon as Google,
  Sparkles,
  Info,
  Plus,
} from "lucide-react"

interface Photo {
  id: string
  src: string
  selected: boolean
  compatible: boolean
  faces: boolean
  landscape: boolean
  recent: boolean
  favorite: boolean
}

export function PhotoSelection() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      src: "/woman-portrait.png",
      selected: false,
      compatible: true,
      faces: true,
      landscape: false,
      recent: true,
      favorite: true,
    },
    {
      id: "2",
      src: "/mountain-landscape.png",
      selected: false,
      compatible: true,
      faces: false,
      landscape: true,
      recent: true,
      favorite: false,
    },
    {
      id: "3",
      src: "/portrait-man.png",
      selected: false,
      compatible: true,
      faces: true,
      landscape: false,
      recent: false,
      favorite: true,
    },
    {
      id: "4",
      src: "/placeholder.svg?height=300&width=400&query=beach sunset photo",
      selected: false,
      compatible: true,
      faces: false,
      landscape: true,
      recent: true,
      favorite: false,
    },
    {
      id: "5",
      src: "/placeholder.svg?height=400&width=300&query=family photo",
      selected: false,
      compatible: true,
      faces: true,
      landscape: false,
      recent: false,
      favorite: true,
    },
    {
      id: "6",
      src: "/placeholder.svg?height=300&width=400&query=city skyline photo",
      selected: false,
      compatible: true,
      faces: false,
      landscape: true,
      recent: false,
      favorite: false,
    },
    {
      id: "7",
      src: "/placeholder.svg?height=400&width=300&query=portrait photo of child",
      selected: false,
      compatible: true,
      faces: true,
      landscape: false,
      recent: true,
      favorite: true,
    },
    {
      id: "8",
      src: "/placeholder.svg?height=300&width=400&query=forest landscape photo",
      selected: false,
      compatible: true,
      faces: false,
      landscape: true,
      recent: true,
      favorite: false,
    },
  ])

  const [filter, setFilter] = useState<string>("all")
  const [showAIModal, setShowAIModal] = useState(false)

  const togglePhotoSelection = (id: string) => {
    setPhotos(photos.map((photo) => (photo.id === id ? { ...photo, selected: !photo.selected } : photo)))
  }

  const filteredPhotos = photos.filter((photo) => {
    if (filter === "all") return true
    if (filter === "faces") return photo.faces
    if (filter === "landscape") return photo.landscape
    if (filter === "recent") return photo.recent
    if (filter === "favorites") return photo.favorite
    return true
  })

  const selectedPhotos = photos.filter((photo) => photo.selected)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative mb-4">
            <input type="text" placeholder="Search photos..." className="w-full p-2 pl-10 border rounded-md" />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>
            <div className="space-y-2">
              <button
                className={`w-full p-2 rounded-md flex items-center ${
                  filter === "all" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
                onClick={() => setFilter("all")}
              >
                <Filter size={18} className="mr-2" />
                All Photos
              </button>
              <button
                className={`w-full p-2 rounded-md flex items-center ${
                  filter === "faces" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
                onClick={() => setFilter("faces")}
              >
                <User size={18} className="mr-2" />
                Faces
              </button>
              <button
                className={`w-full p-2 rounded-md flex items-center ${
                  filter === "landscape"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
                onClick={() => setFilter("landscape")}
              >
                <Mountain size={18} className="mr-2" />
                Landscapes
              </button>
              <button
                className={`w-full p-2 rounded-md flex items-center ${
                  filter === "recent" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
                onClick={() => setFilter("recent")}
              >
                <Clock size={18} className="mr-2" />
                Recent
              </button>
              <button
                className={`w-full p-2 rounded-md flex items-center ${
                  filter === "favorites"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
                onClick={() => setFilter("favorites")}
              >
                <Heart size={18} className="mr-2" />
                Favorites
              </button>
            </div>
          </div>

          <button className="w-full btn-secondary flex items-center justify-center">
            <Google size={18} className="mr-2" />
            Connect to Google Photos
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
          <p className="text-gray-600 text-sm mb-4">
            Let our AI select the best photos for your layout based on your preferences.
          </p>
          <button className="w-full btn-accent flex items-center justify-center" onClick={() => setShowAIModal(true)}>
            <Sparkles size={18} className="mr-2" />
            Get AI Suggestions
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                  !photo.compatible ? "opacity-60" : ""
                }`}
                onClick={() => togglePhotoSelection(photo.id)}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={`Photo ${photo.id}`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity ${
                    photo.selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      photo.selected ? "bg-primary" : "bg-white"
                    }`}
                  >
                    {photo.selected ? (
                      <Check size={18} className="text-white" />
                    ) : (
                      <Plus size={18} className="text-gray-700" />
                    )}
                  </div>
                </div>

                {photo.compatible && (
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <Info size={14} className="text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected photos tray */}
        <div className="sticky bottom-0 bg-white rounded-xl shadow-md p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Selected Photos ({selectedPhotos.length})</h3>
            {selectedPhotos.length > 0 && (
              <button
                className="text-red-500 text-sm hover:text-red-700 flex items-center"
                onClick={() => setPhotos(photos.map((photo) => ({ ...photo, selected: false })))}
              >
                <X size={14} className="mr-1" />
                Clear All
              </button>
            )}
          </div>

          {selectedPhotos.length > 0 ? (
            <div className="flex overflow-x-auto space-x-3 pb-2">
              {selectedPhotos.map((photo) => (
                <div key={photo.id} className="relative flex-shrink-0">
                  <div className="relative h-20 w-20">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={`Selected photo ${photo.id}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePhotoSelection(photo.id)
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No photos selected yet</p>
          )}

          <div className="flex justify-end mt-4">
            <Link
              href="/projects/new/visualization"
              className={`btn-primary flex items-center ${
                selectedPhotos.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* AI Photo Curation Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">AI Photo Selection</h2>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Let our AI select the best photos for your layout based on your preferences.
              </p>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Preferences</h3>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Prioritize faces</span>
                    </label>
                    <label className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Color harmony</span>
                    </label>
                    <label className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Recent photos</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Must Include Photos</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500 mb-2">Drag and drop key photos here</p>
                    <button className="text-primary text-sm">Or browse files</button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full btn-accent flex items-center justify-center">
                    <Sparkles size={18} className="mr-2" />
                    Generate AI Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
