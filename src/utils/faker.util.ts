import { IBanner, IOverviewStatistics, IReferralStatistics, ISubscription } from "@/app/(student)/_module/student.interface"

const subscription: ISubscription = {
  id: '1',
  name: 'Yearly Plan',
  price: 1000000,
  duration: 365,
  renewalDate: '2025-01-01',
  status: 'active',
}

const overviewStatistics: IOverviewStatistics = {
  completedCourses: 0,
  activeCourses: 1,
  enrolledCourses: 1,
}

const referralStatistics: IReferralStatistics = {
  totalReferrals: 2,
  totalPayouts: 10,
  totalEarnings: 500000,
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


const fakerUtil = {
  banners,
  subscription,
  referralStatistics,
  overviewStatistics,
}

export default fakerUtil;