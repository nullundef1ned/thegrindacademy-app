export interface ISubscriptionPlanForm {
  name: string;
  frequency: string;
  duration: number;
  price: string;
  isDeal: boolean;
  features: { featureId: string }[];
}

export interface ISubscriptionPlanUpdateForm extends ISubscriptionPlanForm {
  id: string;
}