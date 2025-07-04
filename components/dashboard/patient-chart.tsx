"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export function PatientChart() {
  // Mock data for the chart
  const data = [
    { month: "Jan", patients: 65 },
    { month: "Feb", patients: 78 },
    { month: "Mar", patients: 90 },
    { month: "Apr", patients: 85 },
    { month: "May", patients: 95 },
    { month: "Jun", patients: 110 },
  ]

  const maxPatients = Math.max(...data.map((d) => d.patients))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Patient Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.patients / maxPatients) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-900 text-right">{item.patients}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
