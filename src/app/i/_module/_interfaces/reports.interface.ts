export interface IGraphData {
  x: string;
  y: number;
}

export interface IActiveInactiveUserTrendGraphData {
  name: string;
  active: number;
  inactive: number;
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

export interface IUserDashboardReport {
  total: IReport;
  newSignups: IReport;
  active: IReport;
  inactive: IReport;
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
  active: Exclude<IReport, 'percentageChange'>;
  expired: Exclude<IReport, 'percentageChange'>;
  new: IReport;
}

export interface IFinanceReport {
  totalRevenue: IReport;
  processedPayouts: number;
  pendingPayouts: number;
}

export interface IPieChartDataResponse {
  name: string;
  count: number;
  percentage: number;
}