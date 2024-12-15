export interface IMetaInformation {
  id: string;
  title: string;
  description: string;
  keywords: string;
  imageUrl: string;
  supportEmail: string;
  socialMediaLinks: ISocialMediaLink[];
  createdAt: string;
  updatedAt: string;
}

export interface ISocialMediaLink {
  type: string;
  url: string;
}

export interface IMetaInformationForm {
  title: string;
  description: string;
  keywords: string;
  imageUrl: string;
  supportEmail: string;
  socialMediaLinks: ISocialMediaLink[];
}