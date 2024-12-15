export interface IDynamicContent {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  mediaUrl: string;
}

export interface IDynamicContentForm {
  title: string;
  content: string;
  isPublished: boolean;
  mediaUrl: string;
}

export interface IDynamicContentUpdateForm extends IDynamicContentForm {
  id: string;
}