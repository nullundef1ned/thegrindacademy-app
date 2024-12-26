export interface IGraphData {
  x: string;
  y: number;
}

export interface IEnrollmentsAndCompletionGraphData {
  label: string;
  enrollments: number;
  completions: number;
}

interface IReport {
  count: number;
  percentageChange: number;
}

export interface IDashboardReport {
  totalUsers: IReport;
  totalEnrollments: IReport;
  totalRevenue: IReport;
  activeSubscriptions: Omit<IReport, 'percentageChange'>;
}

export interface IUserReport {
  total: IReport;
  subscribed: IReport;
  suspended: Omit<IReport, 'percentageChange'>;
}

export interface ICourseReport {
  totalCourses: number;
  enrollmentsThisMonth: number;
  mostPopularCourse: string;
}

export interface ISubscriptionReport {
  activeSubscriptions: number;
  expiredSubscriptions: number;
  newSubscriptions: number;
  renewalRate: number;
}

export interface IFinanceReport {
  totalRevenue: number;
  processedPayouts: number;
  pendingPayouts: number;
  averageRevenuePerUser: number;
}

export interface ISubscriptionPlanPopularity {
  name: string;
  percentage: number;
}