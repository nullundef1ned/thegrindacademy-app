import { IBanner, ICourse, IOverviewStatistics, IReferralStatistics, IStudentActiveCourse } from "@/app/(student)/_module/student.interface"
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

const activeCourses: IStudentActiveCourse[] = [
  {
    id: '1',
    name: 'Introduction to Programming',
    description: 'Learn the basics of programming and get started on your coding journey.',
    thumbnail: 'https://via.placeholder.com/150',
    progress: 100,
  },
  {
    id: '2',
    name: 'Web Development Fundamentals',
    description: 'Master HTML, CSS and JavaScript to build modern websites.',
    thumbnail: 'https://via.placeholder.com/150',
    progress: 75,
  },
  {
    id: '3',
    name: 'Data Structures and Algorithms',
    description: 'Learn essential computer science concepts and problem solving.',
    thumbnail: 'https://via.placeholder.com/150',
    progress: 0,
  },
  {
    id: '4',
    name: 'Digital Marketing Essentials',
    description: 'Learn modern digital marketing strategies, SEO, social media and analytics.',
    thumbnail: 'https://via.placeholder.com/150',
    progress: 35
  }
]

const courses: ICourse[] = [
  {
    id: '1',
    name: 'Introduction to Programming',
    description: 'Learn the basics of programming and get started on your coding journey.',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Web Development Fundamentals',
    description: 'Master HTML, CSS and JavaScript to build modern websites.',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Data Structures and Algorithms',
    description: 'Learn essential computer science concepts and problem solving.',
    thumbnail: 'https://via.placeholder.com/150',
  },
]

const fakerUtil = {
  banners,
  user,
  courses,
  referralStatistics,
  overviewStatistics,
  activeCourses,
}

export default fakerUtil;