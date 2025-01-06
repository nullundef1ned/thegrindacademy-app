export enum FAQType {
  STUDENT = 'student',
  GENERAL = 'general',
  AFFILIATE = 'affiliate'
}

export interface IFAQ {
  id: string;
  question: string;
  answer: string;
  type: FAQType;
  createdAt: string;
  updatedAt: string;
}

export interface IFAQForm {
  question: string;
  answer: string;
  type: FAQType;
}

export interface IFAQUpdateForm extends IFAQForm {
  id: string;
}