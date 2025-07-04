import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, FileText, TestTube, Shield, BarChart3, Users, Mail, Edit, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Diagnosis",
    description:
      "Advanced Gemini AI analyzes symptoms, medical history, and patient data to provide accurate diagnostic suggestions with confidence scores.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "Smart Prescription Generation",
    description:
      "Generate comprehensive prescriptions with dosage recommendations, drug interactions, and patient-specific considerations using AI.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Edit,
    title: "Editable AI Responses",
    description:
      "Review and edit AI-generated prescriptions before finalizing. Full control over medical decisions with AI assistance.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Mail,
    title: "Direct Email Integration",
    description:
      "Send prescriptions directly to patients and medical shops via email with professional formatting and secure delivery.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: TestTube,
    title: "Medical Report Checker",
    description:
      "Upload lab reports, X-rays, and medical documents for AI-powered analysis and interpretation with detailed insights.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Users,
    title: "Multi-Role Support",
    description:
      "Designed for doctors, nurses, and medical students with role-based access and specialized features for each user type.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Shield,
    title: "HIPAA Compliance",
    description:
      "Enterprise-grade security with full HIPAA compliance, encrypted data storage, and secure communication channels.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive insights into patient outcomes, prescription patterns, and practice performance with detailed reporting.",
    color: "from-pink-500 to-pink-600",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
            ✨ Comprehensive Medical AI Suite
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Modern Healthcare
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful AI-driven tools designed specifically for medical professionals to enhance patient care and
            streamline workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Free 14-day trial</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>No credit card required</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
