"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportUploader } from "@/components/reports/report-uploader"
import { ReportAnalysis } from "@/components/reports/report-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestTube, Upload, Brain } from "lucide-react"

export default function ReportsPage() {
  const [analysisResult, setAnalysisResult] = useState(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <TestTube className="h-8 w-8 text-white" />
              </div>
              Medical Report Analyzer
            </h1>
            <p className="text-gray-600 mt-2">Upload and analyze medical reports with advanced AI interpretation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                Upload Medical Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ReportUploader onAnalysisComplete={setAnalysisResult} />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ReportAnalysis data={analysisResult} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
