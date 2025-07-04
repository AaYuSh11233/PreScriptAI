import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, FileText, TestTube } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              🚀 Powered by Advanced AI Technology
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionize Healthcare with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              AI-Powered
            </span>
            <br />
            Medical Intelligence
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Empower doctors, nurses, and medical students with cutting-edge AI for accurate diagnosis, intelligent
            prescriptions, and comprehensive medical analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-white/80 backdrop-blur-sm bg-transparent"
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Diagnosis</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms provide accurate diagnostic suggestions based on symptoms and
                medical history.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Prescriptions</h3>
              <p className="text-gray-600">
                Generate, edit, and send professional prescriptions directly to pharmacies and patients via email.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TestTube className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Report Analysis</h3>
              <p className="text-gray-600">
                Upload and analyze medical reports with AI-powered interpretation and recommendations.
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-8">Trusted by healthcare professionals worldwide</p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              <div className="text-2xl font-bold text-gray-400">10,000+</div>
              <div className="text-2xl font-bold text-gray-400">Doctors</div>
              <div className="text-2xl font-bold text-gray-400">50+</div>
              <div className="text-2xl font-bold text-gray-400">Countries</div>
              <div className="text-2xl font-bold text-gray-400">99.9%</div>
              <div className="text-2xl font-bold text-gray-400">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
