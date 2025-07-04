"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Brain, User, Activity, FileText } from "lucide-react"

interface PrescriptionFormProps {
  onGenerate: (data: any) => void
}

export function PrescriptionForm({ onGenerate }: PrescriptionFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
    chronicDisease: "",
    medications: "",
    symptoms: "",
    remarks: "",
  })
  const { toast } = useToast()

  const calculateBMI = (height: string, weight: string) => {
    const h = Number.parseFloat(height)
    const w = Number.parseFloat(weight)
    if (h > 0 && w > 0) {
      return (w / (h * h)).toFixed(2)
    }
    return ""
  }

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }

    if (field === "height" || field === "weight") {
      newData.bmi = calculateBMI(newData.height, newData.weight)
    }

    setFormData(newData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientData: formData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate diagnosis")
      }

      const result = await response.json()

      onGenerate({
        ...result,
        patientInfo: formData,
      })

      toast({
        title: "AI Analysis Complete! 🧠",
        description: "Advanced diagnosis and prescription generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate AI diagnosis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Patient Demographics */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <User className="h-5 w-5" />
            Patient Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Patient Name *
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter patient's full name"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                Age *
              </label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Enter age"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                Gender *
              </label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-semibold text-gray-700 mb-2">
                Height (m) *
              </label>
              <Input
                id="height"
                type="number"
                step="0.01"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="1.75"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="70"
                className="border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="bmi" className="block text-sm font-semibold text-gray-700 mb-2">
              BMI (Auto-calculated)
            </label>
            <Input
              id="bmi"
              value={formData.bmi}
              placeholder="Calculated automatically"
              readOnly
              className="bg-gray-50 border-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Activity className="h-5 w-5" />
            Medical History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="chronicDisease" className="block text-sm font-semibold text-gray-700 mb-2">
                Chronic Diseases
              </label>
              <Input
                id="chronicDisease"
                value={formData.chronicDisease}
                onChange={(e) => handleInputChange("chronicDisease", e.target.value)}
                placeholder="Diabetes, Hypertension, etc."
                className="border-2 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="medications" className="block text-sm font-semibold text-gray-700 mb-2">
                Current Medications
              </label>
              <Input
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                placeholder="List current medications"
                className="border-2 focus:border-green-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Condition */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <FileText className="h-5 w-5" />
            Current Condition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-700 mb-2">
              Current Symptoms *
            </label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => handleInputChange("symptoms", e.target.value)}
              placeholder="Describe the patient's current symptoms in detail..."
              rows={4}
              className="border-2 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="remarks" className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Remarks
            </label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              placeholder="Any additional notes, observations, or patient concerns..."
              rows={3}
              className="border-2 focus:border-orange-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              AI is Analyzing...
            </>
          ) : (
            <>
              <Brain className="mr-3 h-5 w-5" />
              Generate AI Diagnosis & Prescription
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
