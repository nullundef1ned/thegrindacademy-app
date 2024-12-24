export interface IGraphData {
  x: string;
  y: number;
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