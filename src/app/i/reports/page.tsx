'use client';

import { adminRoutes } from "../_module/admin.routes";
import ModuleCard from "@/components/ModuleCard";

export default function ReportsPage() {
  const modules = [
    {
      icon: 'ri:user-6-fill', name: 'Users',
      description: 'Track total signups, active users, and engagement trends',
      linkText: 'View Report',
      link: adminRoutes.reports.users
    },
    {
      icon: 'ri:book-open-fill', name: 'Courses',
      description: 'Track course enrollments, completion rates, and user activity',
      linkText: 'View Report',
      link: adminRoutes.reports.courses
    },
    {
      icon: 'ri:star-fill', name: 'Subscriptions',
      description: 'Explore subscription trends, renewals, and cancellations',
      linkText: 'View Report',
      link: adminRoutes.reports.subscriptions
    },
    {
      icon: 'ri:wallet-fill', name: 'Revenue & Finance',
      description: 'Monitor revenue streams, payment trends and payout summaries',
      linkText: 'View Report',
      link: adminRoutes.reports.finance
    },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="space-y-1">
        <p className="text-lg font-medium">Reports</p>
        <p className="text-sm text-accent">Click on a report type to view detailed insights and export data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {modules.map((module, index) => (
          <ModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  )
}
