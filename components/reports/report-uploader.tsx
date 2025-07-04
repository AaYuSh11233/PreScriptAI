"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Loader2 } from "lucide-react"

interface ReportUploaderProps {
  onAnalysisComplete: (result: any) => void
}

export function ReportUploader({ onAnalysisComplete }: ReportUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState("")
  const [patientInfo, setPatientInfo] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file || !reportType) {
      toast({
        title: "Missing Information",
        description: "Please select a file and report type.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("reportType", reportType)
      formData.append("patientInfo", patientInfo)

      const response = await fetch("/api/ai/analyze-report", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze report")
      }

      const result = await response.json()
      onAnalysisComplete(result)

      toast({
        title: "Analysis Complete! 🔬",
        description: "Your medical report has been analyzed successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Report Type *</label>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="border-2 focus:border-purple-500">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blood-test">Blood Test</SelectItem>
            <SelectItem value="urine-test">Urine Test</SelectItem>
            <SelectItem value="x-ray">X-Ray</SelectItem>
            <SelectItem value="mri">MRI Scan</SelectItem>
            <SelectItem value="ct-scan">CT Scan</SelectItem>
            <SelectItem value="ecg">ECG/EKG</SelectItem>
            <SelectItem value="ultrasound">Ultrasound</SelectItem>
            <SelectItem value="pathology">Pathology Report</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Medical Report *</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Context (Optional)</label>
        <Textarea
          value={patientInfo}
          onChange={(e) => setPatientInfo(e.target.value)}
          placeholder="Provide additional patient information, symptoms, or context for better analysis..."
          rows={3}
          className="border-2 focus:border-purple-500"
        />
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !file || !reportType}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Report...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-5 w-5" />
            Analyze with AI
          </>
        )}
      </Button>
    </div>
  )
}
