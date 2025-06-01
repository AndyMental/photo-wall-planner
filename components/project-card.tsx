"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Heart } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  image: string
  date: string
  likes: number
  featured?: boolean
}

export function ProjectCard({ title, image, date, likes, featured }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href="/projects/1" className="block bg-white rounded-2xl shadow-md overflow-hidden group">
        <div className="relative">
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {featured && (
            <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full">Featured</div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Heart size={14} className="mr-1 text-accent" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
