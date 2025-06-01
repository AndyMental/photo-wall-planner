"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProgressStepper } from "@/components/progress-stepper"
import { motion, AnimatePresence } from "framer-motion"
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
  Sparkles,
  Info,
  Plus,
  Zap,
  Upload,
  ArrowLeft,
  CloudIcon,
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

interface PhotoService {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  connected: boolean
}

export default function PhotosPage() {
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
      src: "/beach-sunset.png",
      selected: false,
      compatible: true,
      faces: false,
      landscape: true,
      recent: true,
      favorite: false,
    },
    {
      id: "5",
      src: "/diverse-family-portrait.png",
      selected: false,
      compatible: true,
      faces: true,
      landscape: false,
      recent: false,
      favorite: true,
    },
    {
      id: "6",
      src: "/vibrant-city-skyline.png",
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

  const photoServices: PhotoService[] = [
    {
      id: "google",
      name: "Google Photos",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M6.36 14.182l3.454 2.997-3.454 2.998V14.182zm11.28 0v5.995l-3.454-2.998 3.454-2.997zM12 9.818l4.09 3.545-4.09 3.545-4.09-3.545L12 9.818zm0-5.454l8.182 7.09v10.91H3.818v-10.91L12 4.364z" />
        </svg>
      ),
      color: "#DB4437",
      connected: false,
    },
    {
      id: "apple",
      name: "Apple Photos",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12.75 2.609c-.2-.61-1.3-.61-1.5 0l-2.84 8.775H3.615c-.627 0-.885.798-.377 1.156l7.022 4.947-2.687 8.304c-.193.596.494 1.088.998.714l7.43-5.234 7.428 5.234c.504.374 1.19-.118.998-.714l-2.687-8.304 7.022-4.947c.508-.358.25-1.156-.377-1.156h-4.796l-2.845-8.775z" />
        </svg>
      ),
      color: "#007AFF",
      connected: false,
    },
    {
      id: "dropbox",
      name: "Dropbox",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M6 2l6 3.75L6 9.5 0 5.75 6 2zm12 0l6 3.75-6 3.75-6-3.75L18 2zM0 13.25L6 9.5l6 3.75L6 17l-6-3.75zm18 0l6-3.75L18 17l-6-3.75 6-3.75zM6 18.5l6-3.75 6 3.75L12 22l-6-3.5z" />
        </svg>
      ),
      color: "#0061FF",
      connected: false,
    },
    {
      id: "onedrive",
      name: "OneDrive",
      icon: <CloudIcon />,
      color: "#0078D4",
      connected: false,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.047-1.37-.059-4.04-.059zm0 3.063A5.135 5.135 0 1017.135 12 5.135 5.135 0 0012 6.865zm0 8.468A3.333 3.333 0 1115.333 12 3.333 3.333 0 0112 15.333zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
        </svg>
      ),
      color: "#E1306C",
      connected: false,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "#1877F2",
      connected: false,
    },
  ]

  const [filter, setFilter] = useState<string>("all")
  const [showAIModal, setShowAIModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [selectedService, setSelectedService] = useState<PhotoService | null>(null)

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

  const handleConnectService = (service: PhotoService) => {
    setSelectedService(service)
    setShowConnectModal(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        <ProgressStepper
          steps={[
            { id: "frames", label: "Frame Inventory", status: "completed" },
            { id: "layout", label: "Layout Generator", status: "completed" },
            { id: "photos", label: "Photo Selection", status: "current" },
            { id: "visualization", label: "Visualization", status: "upcoming" },
            { id: "details", label: "Details", status: "upcoming" },
          ]}
        />

        <div className="mt-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 flex items-center">
              Photo Selection
              <span className="ml-3 text-punch-pink text-2xl">📸</span>
            </h1>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl">
              Choose the perfect photos for your wall layout. Select images that tell your story and complement your
              space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-neo-teal focus:ring focus:ring-neo-teal/20 focus:outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Filters</h3>
                  <div className="space-y-2">
                    <button
                      className={`w-full p-3 rounded-xl flex items-center ${
                        filter === "all"
                          ? "bg-neo-teal text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-neo-teal"
                      } transition-colors`}
                      onClick={() => setFilter("all")}
                    >
                      <Filter size={18} className="mr-3" />
                      All Photos
                    </button>
                    <button
                      className={`w-full p-3 rounded-xl flex items-center ${
                        filter === "faces"
                          ? "bg-neo-teal text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-neo-teal"
                      } transition-colors`}
                      onClick={() => setFilter("faces")}
                    >
                      <User size={18} className="mr-3" />
                      Faces
                    </button>
                    <button
                      className={`w-full p-3 rounded-xl flex items-center ${
                        filter === "landscape"
                          ? "bg-neo-teal text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-neo-teal"
                      } transition-colors`}
                      onClick={() => setFilter("landscape")}
                    >
                      <Mountain size={18} className="mr-3" />
                      Landscapes
                    </button>
                    <button
                      className={`w-full p-3 rounded-xl flex items-center ${
                        filter === "recent"
                          ? "bg-neo-teal text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-neo-teal"
                      } transition-colors`}
                      onClick={() => setFilter("recent")}
                    >
                      <Clock size={18} className="mr-3" />
                      Recent
                    </button>
                    <button
                      className={`w-full p-3 rounded-xl flex items-center ${
                        filter === "favorites"
                          ? "bg-neo-teal text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-neo-teal"
                      } transition-colors`}
                      onClick={() => setFilter("favorites")}
                    >
                      <Heart size={18} className="mr-3" />
                      Favorites
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Connect Photos</h3>

                  {photoServices.map((service) => (
                    <motion.button
                      key={service.id}
                      className={`w-full p-3 rounded-xl flex items-center justify-between 
                        ${
                          service.connected
                            ? "bg-gray-100 text-gray-700"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-neo-teal hover:text-neo-teal"
                        } transition-all`}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleConnectService(service)}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                          style={{ color: service.color }}
                        >
                          {service.icon}
                        </div>
                        <span>{service.name}</span>
                      </div>
                      {service.connected ? (
                        <span className="text-xs bg-neo-teal/10 text-neo-teal px-2 py-1 rounded-full">Connected</span>
                      ) : (
                        <Plus size={16} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-br from-neo-teal/5 to-punch-pink/5 rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">AI Recommendations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Let our AI select the best photos for your layout based on your preferences.
                </p>
                <motion.button
                  className="w-full btn-accent flex items-center justify-center"
                  onClick={() => setShowAIModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={18} className="mr-2" />
                  Get AI Suggestions
                </motion.button>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Upload Photos</h3>
                <p className="text-gray-600 text-sm mb-4">Add your own photos to use in your wall layout.</p>
                <motion.button
                  className="w-full bg-neo-teal/10 text-neo-teal border-2 border-dashed border-neo-teal/30 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-neo-teal/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload size={24} className="mb-2" />
                  <span className="font-medium">Upload Photos</span>
                  <span className="text-xs mt-1 text-gray-500">or drag and drop</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Main content */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-primary/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {filter === "all"
                      ? "All Photos"
                      : filter === "faces"
                        ? "People"
                        : filter === "landscape"
                          ? "Landscapes"
                          : filter === "recent"
                            ? "Recent Photos"
                            : "Favorite Photos"}
                  </h2>
                  <div className="bg-neo-teal/10 text-neo-teal px-3 py-1 rounded-full text-sm font-medium">
                    {filteredPhotos.length} photos
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      className={`relative group cursor-pointer rounded-xl overflow-hidden ${
                        !photo.compatible ? "opacity-60" : ""
                      }`}
                      onClick={() => togglePhotoSelection(photo.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
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
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            photo.selected ? "bg-neo-teal" : "bg-white"
                          }`}
                        >
                          {photo.selected ? (
                            <Check size={20} className="text-white" />
                          ) : (
                            <Plus size={20} className="text-gray-700" />
                          )}
                        </div>
                      </div>

                      {photo.compatible && (
                        <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
                          <Info size={14} className="text-neo-teal" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selected photos tray */}
              <motion.div
                className="sticky bottom-0 bg-white rounded-2xl shadow-lg p-4 border-2 border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    Selected Photos
                    <span className="ml-2 bg-neo-teal/10 text-neo-teal px-2 py-0.5 rounded-full text-sm">
                      {selectedPhotos.length}
                    </span>
                  </h3>
                  {selectedPhotos.length > 0 && (
                    <button
                      className="text-punch-pink text-sm hover:text-punch-pink/80 flex items-center"
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
                      <motion.div
                        key={photo.id}
                        className="relative flex-shrink-0"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        layout
                      >
                        <div className="relative h-20 w-20">
                          <Image
                            src={photo.src || "/placeholder.svg"}
                            alt={`Selected photo ${photo.id}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <button
                          className="absolute -top-2 -right-2 bg-punch-pink text-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            togglePhotoSelection(photo.id)
                          }}
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center text-gray-500">
                      <Zap size={18} className="mr-2 text-neo-teal" />
                      <p>Select photos to include in your wall layout</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <Link
                    href="/projects/new/layout"
                    className="text-neo-teal hover:text-neo-teal/80 transition-colors text-sm font-medium flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Layout
                  </Link>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/projects/new/visualization"
                      className={`btn-primary flex items-center group ${
                        selectedPhotos.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Photo Curation Modal */}
      <AnimatePresence>
        {showAIModal && (
          <motion.div
            className="fixed inset-0 bg-soft-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-neo-teal flex items-center">
                    AI Photo Selection
                    <Sparkles size={20} className="ml-2 text-punch-pink" />
                  </h2>
                  <button
                    onClick={() => setShowAIModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-gray-600 mb-8">
                  Let our AI select the best photos for your layout based on your preferences. We'll analyze your photos
                  and suggest the perfect combination.
                </p>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Preferences</h3>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                        <input type="checkbox" className="rounded text-neo-teal w-4 h-4" />
                        <span>Prioritize faces</span>
                      </label>
                      <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                        <input type="checkbox" className="rounded text-neo-teal w-4 h-4" />
                        <span>Color harmony</span>
                      </label>
                      <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                        <input type="checkbox" className="rounded text-neo-teal w-4 h-4" />
                        <span>Recent photos</span>
                      </label>
                      <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                        <input type="checkbox" className="rounded text-neo-teal w-4 h-4" />
                        <span>High quality only</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Must Include Photos</h3>
                    <div className="border-2 border-dashed border-neo-teal/30 rounded-xl p-8 text-center bg-neo-teal/5">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neo-teal/10 text-neo-teal mb-4">
                        <Upload size={24} />
                      </div>
                      <p className="text-gray-700 mb-2">Drag and drop key photos here</p>
                      <button className="text-neo-teal text-sm font-medium hover:text-neo-teal/80 transition-colors">
                        Or browse files
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <motion.button
                      className="w-full btn-accent flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles size={18} className="mr-2" />
                      Generate AI Selection
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Service Modal */}
      <AnimatePresence>
        {showConnectModal && selectedService && (
          <motion.div
            className="fixed inset-0 bg-soft-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-soft-black flex items-center">
                    Connect to {selectedService.name}
                    <div className="ml-2 w-6 h-6" style={{ color: selectedService.color }}>
                      {selectedService.icon}
                    </div>
                  </h2>
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600">
                    Connect your {selectedService.name} account to import photos directly into your project.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-start">
                      <Info size={20} className="text-neo-teal mr-2 flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-700">
                        We'll only access your photos with your permission. Your login credentials are secure and never
                        stored.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      className="w-full py-3 px-4 bg-soft-black text-white rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ backgroundColor: selectedService.color }}
                    >
                      <div className="mr-2 text-white">{selectedService.icon}</div>
                      Connect to {selectedService.name}
                    </motion.button>

                    <button
                      onClick={() => setShowConnectModal(false)}
                      className="w-full py-2 text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
