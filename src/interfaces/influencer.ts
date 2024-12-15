export interface IInfluencer {
  id: string;
  title: string;
  content: string;
  mediaUrl: string;
  thumbnailUrl: string;
  buttonUrl: string;
  buttonText: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IInfluencerForm {
  title: string;
  content: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  buttonUrl?: string;
  buttonText: string;
  isPublished: boolean;
}