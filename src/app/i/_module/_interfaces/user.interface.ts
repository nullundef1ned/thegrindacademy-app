export interface IUserStatusUpdate {
  id: string;
  status: string;
  reason?: string;
}

interface IStatistics {
  count: number;
  percentageChange: number;
}

export interface IUserStatistics {
  total: IStatistics;
  subscribed: IStatistics;
  suspended: Omit<IStatistics, 'percentageChange'>;
}