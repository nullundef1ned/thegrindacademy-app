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

export interface ISubscriptionPlanFeatureForm {
  content: string;
}

export interface ISubscriptionPlanFeatureUpdateForm extends ISubscriptionPlanFeatureForm {
  id: string;
}