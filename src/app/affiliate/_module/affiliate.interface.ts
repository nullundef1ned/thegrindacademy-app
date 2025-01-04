export interface IReferralStatistics {
  total: number;
  pending: number;
  paid: number;
}

export interface IMailMarketingForm {
  subject: string;
  bcc: string[];
  content: string;
}