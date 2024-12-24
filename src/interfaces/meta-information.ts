export interface IMetaInformation {
  id: string;
  title: string;
  description: string;
  keywords: string;
  imageUrl: string;
  landingPageThumbnailUrl: string;
  landingPageVideoUrl: string;
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
  landingPageThumbnailUrl: string;
  landingPageVideoUrl: string;
  supportEmail: string;
  socialMediaLinks: ISocialMediaLink[];
}

export interface IPrivacyPolicy {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPrivacyPolicyForm {
  content: string;
}
export interface ITermsOfService {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITermsOfServiceForm {
  content: string;
}