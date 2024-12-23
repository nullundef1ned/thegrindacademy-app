import { appRoutes } from "@/app/_module/app.routes"

export const studentRoutes = {
  overview: '/',
  courses: '/courses',
  referrals: '/referrals',
  support: '/support',
}

export const navigationRoutes = [
  { name: 'Overview', href: studentRoutes.overview, protected: true },
  { name: 'Courses', href: studentRoutes.courses, protected: true },
  { name: 'Referrals', href: studentRoutes.referrals, protected: false },
  { name: 'Profile', href: appRoutes.profile, protected: false },
  { name: 'Support', href: studentRoutes.support, protected: false },
]