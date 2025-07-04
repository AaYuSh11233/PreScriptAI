import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Users, TestTube } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "prescription",
    title: "Prescription generated for John Doe",
    time: "2 minutes ago",
    status: "completed",
    icon: FileText,
  },
  {
    id: 2,
    type: "patient",
    title: "New patient Sarah Wilson registered",
    time: "15 minutes ago",
    status: "new",
    icon: Users,
  },
  {
    id: 3,
    type: "lab",
    title: "Lab results analyzed for Mike Johnson",
    time: "1 hour ago",
    status: "completed",
    icon: TestTube,
  },
  {
    id: 4,
    type: "prescription",
    title: "Prescription updated for Emma Davis",
    time: "2 hours ago",
    status: "updated",
    icon: FileText,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "new":
      return "bg-blue-100 text-blue-800"
    case "updated":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <activity.icon className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
