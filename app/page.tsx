"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { FeatureCard } from "@/components/feature-card"
import { ProjectCard } from "@/components/project-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Footer } from "@/components/footer"
import { ArrowRight, Sparkles, Star, Zap, Layout, Frame, Eye } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                ✨ AI-Powered Photo Walls
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                Design your perfect photo wall with{" "}
                <span className="text-primary relative">
                  AI
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 100 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10C30 4 70 4 100 10"
                      fill="none"
                      stroke="#FF7F7F"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Create stunning gallery walls that showcase your memories beautifully. Our AI helps you design the
                perfect layout for your space in minutes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    href="/projects/new"
                    className="btn-primary text-center flex items-center justify-center group w-full"
                  >
                    Start New Project
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link href="/projects" className="btn-secondary text-center w-full block">
                    Continue Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                  src="/modern-living-room-photo-wall.png"
                  alt="Photo Wall Example"
                  fill
                  className="object-cover rounded-2xl shadow-lg"
                  priority
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-accent text-white p-3 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <p className="font-medium flex items-center">
                    <Sparkles size={16} className="mr-2" />
                    AI-Powered Layouts
                  </p>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -left-6 bg-white p-3 rounded-lg shadow-lg hidden md:flex items-center space-x-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Layout size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Smart Layout</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-10 bg-white p-3 rounded-lg shadow-lg hidden md:block"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Zap size={16} />
                  </div>
                  <p className="text-sm font-medium">Design in minutes!</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-xl"></div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How Wall Story Works</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Create your perfect photo wall in just a few simple steps with our AI-powered design tool.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Frame className="text-primary" size={24} />,
                emoji: "🖼️",
                title: "Add Your Frames",
                description: "Tell us what frames you have or want to use for your photo wall.",
              },
              {
                icon: <Layout className="text-primary" size={24} />,
                emoji: "✨",
                title: "Generate Layouts",
                description: "Our AI creates beautiful layout options based on your frames and wall size.",
              },
              {
                icon: <Eye className="text-primary" size={24} />,
                emoji: "👁️",
                title: "Visualize & Customize",
                description: "See how your wall will look and make adjustments until it's perfect.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {step.icon}
                    <span className="absolute text-xl" style={{ top: "-2px", right: "-2px" }}>
                      {step.emoji}
                    </span>
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Templates</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Get inspired with our professionally designed layout templates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Classic Grid"
              image="/photo-wall-grid.png"
              description="Organized and symmetrical layout"
              badge="Popular"
            />
            <FeatureCard
              title="Salon Style"
              image="/salon-photo-wall.png"
              description="Eclectic and artistic arrangement"
              badge="Trending"
            />
            <FeatureCard
              title="Asymmetric"
              image="/asymmetric-photo-wall.png"
              description="Modern and dynamic composition"
            />
            <FeatureCard
              title="Staircase"
              image="/staircase-photo-wall.png"
              description="Perfect for stairways and hallways"
            />
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex justify-between items-end mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Recent Projects</h2>
              <p className="text-lg text-gray-500 max-w-2xl">
                Check out some of the amazing photo walls our users have created.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View all projects
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard title="Living Room Gallery" image="/living-room-photo-wall.png" date="2 days ago" likes={24} />
            <ProjectCard
              title="Family Memories"
              image="/family-photos-wall.png"
              date="1 week ago"
              likes={18}
              featured
            />
            <ProjectCard title="Office Space" image="/office-photo-wall.png" date="2 weeks ago" likes={32} />
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View all projects
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              ❤️ Loved by thousands
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Users Say</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Join thousands of happy users who have transformed their spaces with Wall Story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Wall Story helped me create the perfect gallery wall for my living room. The AI suggestions were spot on!"
              author="Sarah J."
              role="Interior Design Enthusiast"
              avatar="/woman-portrait.png"
              rating={5}
            />
            <TestimonialCard
              quote="I was struggling with arranging my family photos until I found this app. Now my hallway looks amazing!"
              author="Michael T."
              role="Homeowner"
              avatar="/thoughtful-man-portrait.png"
              rating={5}
            />
            <TestimonialCard
              quote="As a professional photographer, I appreciate how this tool helps my clients visualize their photo displays."
              author="Emma R."
              role="Professional Photographer"
              avatar="/woman-photographer-portrait.png"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary text-white">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your perfect photo wall?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their spaces with Wall Story.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link
              href="/projects/new"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
