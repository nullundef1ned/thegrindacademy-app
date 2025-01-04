'use client';

import { adminRoutes } from "../_module/admin.routes";
import ModuleCard from "@/components/ModuleCard";

export default function WebsiteContentPage() {
  const modules = [
    {
      icon: 'ri:user-6-fill', name: 'Influencer Section',
      description: 'Showcase collaborations and featured influencers',
      linkText: 'Update Influencer Section',
      link: adminRoutes.websiteContent.influencer
    },
    {
      icon: 'ri:video-on-fill', name: 'Student Interviews',
      description: 'Share inspiring stories and success journeys',
      linkText: 'Update Student Interviews',
      link: adminRoutes.websiteContent.studentInterviews
    },
    {
      icon: 'ri:wallet-fill', name: 'Subscription Plans',
      description: 'Manage subscription plans and user upgrades',
      linkText: 'Manage Subscription Plans',
      link: adminRoutes.websiteContent.subscriptionPlans
    },
    {
      icon: 'ri:star-fill', name: 'Testimonials',
      description: 'Highlight positive experiences from your users',
      linkText: 'Upload Testimonials',
      link: adminRoutes.websiteContent.testimonials
    },
    {
      icon: 'ri:question-fill', name: 'FAQs',
      description: 'Keep your FAQ section up-to-date by managing common',
      linkText: 'Update FAQs',
      link: adminRoutes.websiteContent.faqs
    },
    {
      icon: 'ri:layout-grid-fill', name: 'Dynamic Content',
      description: 'Add or modify additional sections to your website',
      linkText: 'Manage Dynamic Content',
      link: adminRoutes.websiteContent.dynamicContent
    },
    {
      icon: 'ri:code-s-slash-fill', name: 'Meta Information',
      description: "Optimize your site's SEO and social sharing details",
      linkText: 'Optimize Meta Information',
      link: adminRoutes.websiteContent.metaInformation
    },
    {
      icon: 'tabler:affiliate-filled', name: 'Referral & Affiliate Policy',
      description: "Outline how users can refer and earn from their friends and audiences",
      linkText: 'Update Referral & Affiliate Policy',
      link: adminRoutes.websiteContent.referralPolicy
    },
    {
      icon: 'ri:shield-user-fill', name: 'Privacy Policy',
      description: "Outline how user data is collected, used, and protected",
      linkText: 'Update Privacy Policy',
      link: adminRoutes.websiteContent.privacyPolicy
    },
    {
      icon: 'ri:file-list-3-fill', name: 'Terms of Service',
      description: "Set clear rules and guidelines for your website visitors",
      linkText: 'Update Terms of Service',
      link: adminRoutes.websiteContent.termsOfService
    },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="space-y-1">
        <p className="text-lg font-medium">Website Content</p>
        <p className="text-sm text-accent">Easily update FAQs, contact details, and dynamic sections to keep your website fresh and relevant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {modules.map((module, index) => (
          <ModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  )
}
