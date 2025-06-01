"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

export function TestimonialCard({ quote, author, role, avatar, rating }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 border-2 border-primary/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 text-primary">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.667 13.333H5.33366C5.33366 8 9.33366 8 10.667 8C10.667 5.333 8.66699 2.667 5.33366 2.667C2.00033 2.667 0.000326157 6.667 0.000326157 10.667C0.000326157 20 8.00033 20 8.00033 20C8.00033 20 10.667 20 10.667 17.333V13.333ZM24.0003 13.333H18.667C18.667 8 22.667 8 24.0003 8C24.0003 5.333 22.0003 2.667 18.667 2.667C15.3337 2.667 13.3337 6.667 13.3337 10.667C13.3337 20 21.3337 20 21.3337 20C21.3337 20 24.0003 20 24.0003 17.333V13.333Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="relative w-12 h-12 mr-4">
          <Image src={avatar || "/placeholder.svg"} alt={author} fill className="object-cover rounded-full" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
