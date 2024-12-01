import { IBanner, ICourse, ICourseEnrollment, IOverviewStatistics, IReferralStatistics, IStudentActiveCourse, ISubscription } from "@/app/(student)/_module/student.interface"

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

const activeCourses: IStudentActiveCourse[] = [
  {
    id: '1',
    name: 'Introduction to Programming',
    description: 'Learn the basics of programming and get started on your coding journey.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Learn the basics of programming and get started on your coding journey.',
    materials: [],
    introVideo: 'https://videos.pexels.com/video-files/3743056/3743056-uhd_2560_1440_24fps.mp4',
    lessons: [],
    progress: 100,
  },
  {
    id: '2',
    name: 'Web Development Fundamentals',
    description: 'Master HTML, CSS and JavaScript to build modern websites.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Master HTML, CSS and JavaScript to build modern websites.',
    materials: [],
    introVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lessons: [],
    progress: 75,
  },
  {
    id: '3',
    name: 'Data Structures and Algorithms',
    description: 'Learn essential computer science concepts and problem solving.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Learn essential computer science concepts and problem solving.',
    materials: [],
    introVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lessons: [],
    progress: 0,
  },
  {
    id: '4',
    name: 'Digital Marketing Essentials',
    description: 'Learn modern digital marketing strategies, SEO, social media and analytics.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    shortDescription: 'Learn modern digital marketing strategies, SEO, social media and analytics.',
    materials: [],
    introVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lessons: [],
    progress: 35
  }
]

const courses: ICourse[] = [
  {
    id: '1',
    name: 'Introduction to Programming',
    shortDescription: 'Learn the basics of programming and get started on your coding journey.',
    materials: [
      {
        id: '1',
        name: 'Introduction to HTML',
        link: 'https://www.google.com',
        type: 'document',
      },
      {
        id: '2',
        name: 'Screenshot of network servers in the void of nature',
        link: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'image',
      }
    ],
    description: 'Learn the basics of programming and get started on your coding journey, including variables, data types, loops, conditionals, and functions.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    introVideo: 'https://firebasestorage.googleapis.com/v0/b/suya-truck.appspot.com/o/Zahn%20Studios%2Fdammer-coffee.mp4?alt=media&token=437793d0-bd66-4544-aa6c-c7eee601cb02',
    lessons: [
      {
        id: '1',
        name: 'Introduction to HTML',
        completed: false,
        content: {
          video: 'https://firebasestorage.googleapis.com/v0/b/suya-truck.appspot.com/o/Zahn%20Studios%2Fdammer-coffee.mp4?alt=media&token=437793d0-bd66-4544-aa6c-c7eee601cb02',
        },
        studyTime: 1,
      },
      {
        id: '2',
        name: 'Introduction to CSS',
        completed: false,
        content: {
          video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          html: `
            <div class="space-y-4">
              <h2 class="text-xl font-semibold">Introduction to CSS</h2>
              
              <div class="space-y-2">
                <p>CSS (Cascading Style Sheets) is the language used to style and layout web pages. It works alongside HTML to control the visual presentation of content.</p>
                
                <h3 class="text-lg font-medium mt-4">Key Concepts:</h3>
                <ul class="list-disc pl-6 space-y-1">
                  <li>Selectors - Target HTML elements to style</li>
                  <li>Properties - Visual attributes you can modify</li>
                  <li>Values - Settings for the properties</li>
                  <li>Box Model - How elements are sized and spaced</li>
                </ul>

                <h3 class="text-lg font-medium mt-4">Basic Syntax:</h3>
                <pre class="bg-gray-100 p-3 rounded">
selector {
  property: value;
}
                </pre>

                <p class="mt-4">CSS can be added to HTML documents in 3 ways:</p>
                <ol class="list-decimal pl-6 space-y-1">
                  <li>Inline styles using the style attribute</li>
                  <li>Internal stylesheet in a &lt;style&gt; tag</li>
                  <li>External stylesheet linked with &lt;link&gt;</li>
                </ol>
              </div>
            </div>
          `
        },
        studyTime: 20,
      },
      {
        id: '3',
        name: 'Introduction to JavaScript',
        completed: false,
        content: {
          video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        studyTime: 20,
      }
    ],
  },
  {
    id: '2',
    name: 'Web Development Fundamentals',
    shortDescription: 'Master HTML, CSS and JavaScript to build modern websites.',
    materials: [],
    description: 'Master HTML, CSS and JavaScript to build modern websites, including responsive design, modern frameworks, and best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    introVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lessons: [
      {
        id: '1',
        name: 'Introduction to HTML',
        completed: false,
        content: {
          video: 'https://firebasestorage.googleapis.com/v0/b/suya-truck.appspot.com/o/Zahn%20Studios%2Fdammer-coffee.mp4?alt=media&token=437793d0-bd66-4544-aa6c-c7eee601cb02',
        },
        studyTime: 10,
      },
      {
        id: '2',
        name: 'Introduction to CSS',
        completed: false,
        content: {
          html: `
            <div class="space-y-4">
              <h2 class="text-xl font-semibold">Introduction to CSS</h2>
            </div>
          `
        },
        studyTime: 10,
      },
    ],
  },
  {
    id: '3',
    name: 'Data Structures and Algorithms',
    shortDescription: 'Learn essential computer science concepts and problem solving.',
    materials: [],
    description: 'Learn essential computer science concepts and problem solving, including arrays, linked lists, stacks, queues, trees, and graphs.',
    thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    introVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lessons: [],
  },
]

const enrollment: ICourseEnrollment = {
  lessonsCompleted: 3,
  isCompleted: false,
}

const fakerUtil = {
  banners,
  courses,
  enrollment,
  subscription,
  referralStatistics,
  overviewStatistics,
  activeCourses,
}

export default fakerUtil;