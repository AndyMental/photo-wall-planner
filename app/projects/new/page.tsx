import { Navigation } from "@/components/navigation"
import { FrameInventory } from "@/components/frame-inventory"
import { ProgressStepper } from "@/components/progress-stepper"
import { Sparkles } from "lucide-react"

export default function NewProject() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="py-4">
          <ProgressStepper
            steps={[
              { id: "frames", label: "Frames", status: "current" },
              { id: "layout", label: "Layout", status: "upcoming" },
              { id: "photos", label: "Photos", status: "upcoming" },
              { id: "preview", label: "Preview", status: "upcoming" },
              { id: "details", label: "Details", status: "upcoming" },
            ]}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-soft-black">Frame Inventory</h1>
            <div className="ml-2 bg-dream-lemon rounded-full px-2 py-0.5 flex items-center">
              <Sparkles size={14} className="text-punch-pink mr-1" />
              <span className="text-xs font-medium">Step 1</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm max-w-md">
            Add the frames you have available to create your perfect photo wall.
          </p>
        </div>

        <div className="flex-1 overflow-hidden">
          <FrameInventory />
        </div>
      </div>
    </main>
  )
}
