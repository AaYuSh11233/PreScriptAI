"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { PatientChart } from "@/components/dashboard/patient-chart"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your practice today.</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PatientChart />
            <RecentActivity />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <UpcomingAppointments />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
