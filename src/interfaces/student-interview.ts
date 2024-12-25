export interface IStudentInterview {
  id: string;
  fullName: string;
  description: string;
  mediaUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStudentInterviewForm {
  fullName: string;
  description: string;
  mediaUrl: string;
}

export interface IStudentInterviewUpdateForm extends IStudentInterviewForm {
  id: string;
}