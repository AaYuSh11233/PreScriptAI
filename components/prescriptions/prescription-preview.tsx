"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PrescriptionPreviewProps {
  data: any
}

export function PrescriptionPreview({ data }: PrescriptionPreviewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { toast } = useToast()

  const generatePDF = async () => {
    setIsGeneratingPDF(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "PDF Generated",
      description: "Prescription PDF has been generated and downloaded.",
    })

    setIsGeneratingPDF(false)
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-lg font-medium mb-2">No prescription generated yet</div>
          <div className="text-sm">Fill out the patient form and click generate to see the prescription preview</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">PrescriptAI</h2>
        <p className="text-gray-600">AI-Powered Medical Prescription</p>
        <p className="text-sm text-gray-500 mt-2">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Name:</span> {data.patientInfo.name}
          </div>
          <div>
            <span className="font-medium">Age:</span> {data.patientInfo.age} years
          </div>
          <div>
            <span className="font-medium">Gender:</span> {data.patientInfo.gender}
          </div>
          <div>
            <span className="font-medium">BMI:</span> {data.patientInfo.bmi}
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="text-base px-3 py-1">
            {data.diagnosis}
          </Badge>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prescribed Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.medications.map((med: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="font-semibold text-lg mb-2">{med.name}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Dosage:</span> {med.dosage}
                </div>
                <div>
                  <span className="font-medium">Frequency:</span> {med.frequency}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {med.duration}
                </div>
                <div>
                  <span className="font-medium">Instructions:</span> {med.instructions}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Lab Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended Lab Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.labTests.map((test: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">{test}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Precautions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Precautions & Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.precautions.map((precaution: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-sm">{precaution}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow-up</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{data.followUp}</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <Button onClick={generatePDF} disabled={isGeneratingPDF} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
