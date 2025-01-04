export const anchor = 'i'

export const adminRoutes = {
  login: `/${anchor}/login`,
  dashboard: `/${anchor}/overview`,
  courses: `/${anchor}/courses`,
  users: `/${anchor}/users`,
  websiteContent: {
    root: `/${anchor}/website-content`,
    dynamicContent: `/${anchor}/website-content/dynamic-content`,
    influencer: `/${anchor}/website-content/influencer`,
    studentInterviews: `/${anchor}/website-content/student-interviews`,
    subscriptionPlans: `/${anchor}/website-content/subscription-plans`,
    testimonials: `/${anchor}/website-content/testimonials`,
    faqs: `/${anchor}/website-content/faqs`,
    metaInformation: `/${anchor}/website-content/meta-information`,
    privacyPolicy: `/${anchor}/website-content/privacy-policy`,
    termsOfService: `/${anchor}/website-content/terms-of-service`,
  },
  reports: {
    root: `/${anchor}/reports`,
    users: `/${anchor}/reports/users`,
    courses: `/${anchor}/reports/courses`,
    finance: `/${anchor}/reports/finance`,
    subscriptions: `/${anchor}/reports/subscriptions`,
  },
  settings: `/${anchor}/settings`,
}
