"use client"

import { CheckCircle2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

type StepStatus = "completed" | "current" | "upcoming"

interface Step {
  id: string
  label: string
  status: StepStatus
}

interface ProgressStepperProps {
  steps: Step[]
}

export function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-100 p-3">
      {/* Desktop stepper */}
      <div className="hidden md:flex items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              {step.status === "completed" ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-full bg-neo-teal text-white flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              ) : step.status === "current" ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-full bg-neo-teal text-white flex items-center justify-center animate-pulse-glow"
                >
                  {index + 1}
                </motion.div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center">
                  {index + 1}
                </div>
              )}
              <span
                className={`mt-1 text-xs font-medium ${
                  step.status === "completed"
                    ? "text-neo-teal"
                    : step.status === "current"
                      ? "text-neo-teal"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 ${step.status === "completed" ? "bg-neo-teal" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden flex items-center justify-between">
        <div className="flex items-center">
          {steps.find((step) => step.status === "current")?.status === "completed" ? (
            <div className="w-6 h-6 rounded-full bg-neo-teal text-white flex items-center justify-center mr-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-neo-teal text-white flex items-center justify-center mr-2 text-xs animate-pulse-glow">
              {steps.findIndex((step) => step.status === "current") + 1}
            </div>
          )}
          <span className="font-medium text-sm">{steps.find((step) => step.status === "current")?.label}</span>
        </div>
        <div className="flex items-center">
          <Sparkles size={14} className="text-punch-pink mr-1" />
          <span className="text-xs bg-dream-lemon text-soft-black px-2 py-1 rounded-full">
            {steps.findIndex((step) => step.status === "current") + 1} of {steps.length}
          </span>
        </div>
      </div>
    </div>
  )
}
