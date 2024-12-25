export interface ITestimonial {
  id: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITestimonialForm {
  imageUrl: string;
  isPublished: boolean;
}

export interface ITestimonialUpdateForm extends ITestimonialForm {
  id: string;
}