"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PrescriptionForm } from "@/components/prescriptions/prescription-form"
import { PrescriptionEditor } from "@/components/prescriptions/prescription-editor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Brain, Edit, Send } from "lucide-react"

export default function NewPrescriptionPage() {
  const [prescriptionData, setPrescriptionData] = useState(null)
  const [editedPrescription, setEditedPrescription] = useState(null)
  const [activeTab, setActiveTab] = useState("form")

  const handleAIGeneration = (data: any) => {
    setPrescriptionData(data)
    setActiveTab("edit")
  }

  const handlePrescriptionEdit = (editedData: any) => {
    setEditedPrescription(editedData)
    setActiveTab("send")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              AI-Powered Prescription Generator
            </h1>
            <p className="text-gray-600 mt-2">
              Generate, edit, and send intelligent prescriptions with advanced AI assistance
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="edit" className="flex items-center gap-2" disabled={!prescriptionData}>
              <Edit className="h-4 w-4" />
              Edit & Review
            </TabsTrigger>
            <TabsTrigger value="send" className="flex items-center gap-2" disabled={!editedPrescription}>
              <Send className="h-4 w-4" />
              Send Prescription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  Patient Information & AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <PrescriptionForm onGenerate={handleAIGeneration} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit" className="space-y-6">
            {prescriptionData && <PrescriptionEditor data={prescriptionData} onSave={handlePrescriptionEdit} />}
          </TabsContent>

          <TabsContent value="send" className="space-y-6">
            {editedPrescription && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Final Prescription Preview</CardTitle>
                  </CardHeader>
                  <CardContent>{/* Prescription preview component */}</CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Send Options</CardTitle>
                  </CardHeader>
                  <CardContent>{/* Send options component */}</CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
