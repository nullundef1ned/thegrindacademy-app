import { IBanner, IOverviewStatistics } from "@/app/(student)/_module/student.interface"
import { IUser } from "@/app/_module/app.interface"

const user: IUser = {
  firstName: 'Miyagi',
  lastName: 'Kun',
  name: 'Miyagi Kun',
  referralCode: 'REF-GRIND87248',
}

const overviewStatistics: IOverviewStatistics = {
  completedCourses: 0,
  activeCourses: 1,
  enrolledCourses: 1,
}

const banners: IBanner[] = [
  {
    message: 'Welcome to The Grind!',
    permanent: false,
    type: 'info',
  },
  {
    message: 'Your subscription expires in 3 days! Renew now to keep your access and referral payouts uninterrupted.',
    link: '/profile',
    buttonText: 'Renew Subscription',
    permanent: false,
    type: 'warning',
  },
  {
    message: 'Your subscription expires in 3 days! Renew now to keep your access and referral payouts uninterrupted.',
    link: '/profile',
    buttonText: 'Renew Subscription',
    permanent: false,
    type: 'warning',
  },
  {
    message: 'Your subscription has expired and your access has been suspended. Please renew to continue your learning journey.',
    link: '/profile',
    buttonText: 'Renew Subscription',
    permanent: true,
    type: 'error',
  },
]

export default {
  banners,
  user,
  overviewStatistics,
}
