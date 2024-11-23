export interface IOverviewStatistics {
  completedCourses: number;
  activeCourses: number;
  enrolledCourses: number;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export interface IStudentActiveCourse extends ICourse {
  progress: number;
}


export interface IBanner {
  message: string;
  link?: string;
  buttonText?: string;
  permanent: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}