import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, TestTube } from "lucide-react"

const actions = [
  {
    title: "New Prescription",
    description: "Generate AI-powered prescription",
    href: "/dashboard/prescriptions/new",
    icon: FileText,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Add Patient",
    description: "Register new patient",
    href: "/dashboard/patients/new",
    icon: Users,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Lab Analysis",
    description: "Upload and analyze lab results",
    href: "/dashboard/lab-tests/new",
    icon: TestTube,
    color: "bg-purple-500 hover:bg-purple-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-gray-50 bg-transparent">
              <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-gray-500">{action.description}</div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
