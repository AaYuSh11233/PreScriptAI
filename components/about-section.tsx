import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function AboutSection() {
  const benefits = [
    "Healthcare At Your Fingertips",
    "Accurate Diagnosis, Personalized Care",
    "Reduced Medical Errors",
    "Improved Patient Outcomes",
    "Streamlined Workflow",
    "Cost-Effective Solutions",
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-blue-600"></div>
              <span className="text-blue-600 font-semibold uppercase tracking-wide">About</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              PrescriptAI: Smarter Prescription Management
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              PrescriptAI is a cutting-edge SaaS platform designed to streamline and enhance the prescription management
              process. Leveraging the power of artificial intelligence, our system aims to eliminate the inefficiencies
              and errors associated with traditional prescription methods.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="group">
              Learn More About Our Platform
            </Button>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-600 rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
