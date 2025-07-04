"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Edit, Save, Plus, Trash2, AlertTriangle, CheckCircle } from "lucide-react"

interface PrescriptionEditorProps {
  data: any
  onSave: (editedData: any) => void
}

export function PrescriptionEditor({ data, onSave }: PrescriptionEditorProps) {
  const [editedData, setEditedData] = useState(data)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    onSave(editedData)
    setIsEditing(false)
    toast({
      title: "Prescription Updated! ✅",
      description: "Your changes have been saved successfully.",
    })
  }

  const addMedication = () => {
    const newMedication = {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    }
    setEditedData({
      ...editedData,
      medications: [...(editedData.medications || []), newMedication],
    })
  }

  const removeMedication = (index: number) => {
    const updatedMedications = editedData.medications.filter((_: any, i: number) => i !== index)
    setEditedData({
      ...editedData,
      medications: updatedMedications,
    })
  }

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedMedications = [...editedData.medications]
    updatedMedications[index] = { ...updatedMedications[index], [field]: value }
    setEditedData({
      ...editedData,
      medications: updatedMedications,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
                <Edit className="h-6 w-6 text-white" />
              </div>
              AI-Generated Prescription - Review & Edit
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Confidence: {data.confidence}%
              </Badge>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "destructive" : "outline"}
                size="sm"
              >
                {isEditing ? "Cancel" : "Edit Mode"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="diagnosis" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="tests">Lab Tests</TabsTrigger>
          <TabsTrigger value="precautions">Precautions</TabsTrigger>
          <TabsTrigger value="followup">Follow-up</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Primary Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedData.diagnosis}
                  onChange={(e) => setEditedData({ ...editedData, diagnosis: e.target.value })}
                  rows={3}
                  className="border-2 focus:border-blue-500"
                />
              ) : (
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900">{editedData.diagnosis}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Differential Diagnoses</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedData.differentialDiagnoses}
                  onChange={(e) => setEditedData({ ...editedData, differentialDiagnoses: e.target.value })}
                  rows={4}
                  className="border-2 focus:border-blue-500"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-wrap">{editedData.differentialDiagnoses}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prescribed Medications</h3>
            {isEditing && (
              <Button onClick={addMedication} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Medication
              </Button>
            )}
          </div>

          {editedData.medications?.map((med: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Medication {index + 1}</CardTitle>
                  {isEditing && (
                    <Button onClick={() => removeMedication(index)} size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                    {isEditing ? (
                      <Input
                        value={med.name}
                        onChange={(e) => updateMedication(index, "name", e.target.value)}
                        className="border-2 focus:border-purple-500"
                      />
                    ) : (
                      <p className="font-semibold text-purple-900">{med.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                    {isEditing ? (
                      <Input
                        value={med.dosage}
                        onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                        className="border-2 focus:border-purple-500"
                      />
                    ) : (
                      <p>{med.dosage}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    {isEditing ? (
                      <Input
                        value={med.frequency}
                        onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                        className="border-2 focus:border-purple-500"
                      />
                    ) : (
                      <p>{med.frequency}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    {isEditing ? (
                      <Input
                        value={med.duration}
                        onChange={(e) => updateMedication(index, "duration", e.target.value)}
                        className="border-2 focus:border-purple-500"
                      />
                    ) : (
                      <p>{med.duration}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  {isEditing ? (
                    <Textarea
                      value={med.instructions}
                      onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                      rows={2}
                      className="border-2 focus:border-purple-500"
                    />
                  ) : (
                    <p className="text-gray-600">{med.instructions}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Lab Tests</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedData.labTests}
                  onChange={(e) => setEditedData({ ...editedData, labTests: e.target.value })}
                  rows={6}
                  className="border-2 focus:border-blue-500"
                />
              ) : (
                <div className="space-y-2">
                  {editedData.labTests?.split("\n").map((test: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>{test}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precautions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Precautions & Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedData.precautions}
                  onChange={(e) => setEditedData({ ...editedData, precautions: e.target.value })}
                  rows={6}
                  className="border-2 focus:border-orange-500"
                />
              ) : (
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <p className="whitespace-pre-wrap">{editedData.precautions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Follow-up Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedData.followUp}
                  onChange={(e) => setEditedData({ ...editedData, followUp: e.target.value })}
                  rows={4}
                  className="border-2 focus:border-green-500"
                />
              ) : (
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="whitespace-pre-wrap">{editedData.followUp}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditing && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleSave}
            size="lg"
            className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
