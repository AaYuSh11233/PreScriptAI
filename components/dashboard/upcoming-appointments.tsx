import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const appointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "10:00 AM",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Sarah Wilson",
    time: "11:30 AM",
    type: "Follow-up",
    status: "pending",
  },
  {
    id: 3,
    patient: "Mike Johnson",
    time: "2:00 PM",
    type: "Lab Review",
    status: "confirmed",
  },
  {
    id: 4,
    patient: "Emma Davis",
    time: "3:30 PM",
    type: "Consultation",
    status: "confirmed",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Today's Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-500">
                    {appointment.time} • {appointment.type}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
