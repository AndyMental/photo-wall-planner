"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Bell, Search, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-8 lg:px-16 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/minimalist-frame-logo.png" alt="Wall Story Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-black">Wall Story</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/projects"
            className="text-gray-700 hover:text-black font-medium transition-colors relative group"
          >
            My Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/layouts" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
            Layouts
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/photos" className="text-gray-700 hover:text-black font-medium transition-colors relative group">
            Photos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-700 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100">
            <Search size={20} />
          </button>
          <button className="text-gray-700 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full text-white text-xs flex items-center justify-center">
              2
            </span>
          </button>
          <button className="text-gray-700 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100">
            <User size={20} />
          </button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup" className="btn-primary py-2 px-4">
              Sign up
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Projects
              </Link>
              <Link
                href="/layouts"
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Layouts
              </Link>
              <Link
                href="/photos"
                className="text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Photos
              </Link>
              <div className="flex flex-col gap-2 mt-4 pt-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-black transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link href="/signup" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
