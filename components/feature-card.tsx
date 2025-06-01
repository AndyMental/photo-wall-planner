"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  image: string
  description: string
  badge?: string
}

export function FeatureCard({ title, image, description, badge }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href="/layouts" className="block bg-white rounded-2xl shadow-md overflow-hidden group">
        <div className="relative">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          {badge && (
            <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full">{badge}</div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
