'use client';

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { adminRoutes } from "../../_module/admin.routes";
import { Button } from "@/components/ui/button";
import { useFetchSubscriptionPlans } from "./_apis/useFetchSubscriptionPlans";
import { useModal } from "@/providers/modal.provider";
import { ISubscriptionPlan } from "@/app/(student)/_module/student.interface";
import useCurrency from "@/hooks/useCurrency";
import IconifyIcon from "@/components/IconifyIcon";
import Link from "next/link";
import ConfirmSubscriptionPlanDeletionModal from "./_modals/ConfirmSubscriptionPlanDeletionModal";
import pluralize from "pluralize";
import LoadingIcons from "react-loading-icons";

export default function SubscriptionPlansPage() {

  const { formatCurrency } = useCurrency();
  const { showModal } = useModal();

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Subscription Plans' },
  ]

  const { data, isPending } = useFetchSubscriptionPlans();

  const subscriptionPlans = data || [];

  const generateFrequency = (duration: number, frequency: string) => {
    return `every ${duration > 1 ? `${duration} ${pluralize(frequency, duration)}` : frequency}`;
  }

  const openDeleteModal = (subscriptionPlan: ISubscriptionPlan) => showModal(<ConfirmSubscriptionPlanDeletionModal subscriptionPlan={subscriptionPlan} />)

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Subscription Plans</p>
          <p className="text-sm text-accent">Manage your subscription plans to keep your website up to date</p>
        </div>
        <Button size="sm" href={`${adminRoutes.websiteContent.subscriptionPlans}/new`}>Add New Subscription Plan</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((subscriptionPlan: ISubscriptionPlan, index) => (
          <div key={index} className="bg-[#1C347D40] border rounded border-[#1A2031]">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-accent">Name</p>
                <p className="text-sm font-semibold">{subscriptionPlan.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-accent">Price</p>
                <p className="text-sm font-semibold">{formatCurrency(subscriptionPlan.price)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-accent">Frequency</p>
                <p className="text-sm font-semibold">{generateFrequency(subscriptionPlan.duration, subscriptionPlan.frequency)}</p>
              </div>
              {subscriptionPlan.isDeal && (
                <div className="flex items-center gap-2 bg-primary text-primary-50 rounded-md px-4 py-1 h-max w-max">
                  <p className="text-xs font-semibold">Deal</p>
                </div>
              )}
            </div>
            <div className="border-t border-[#1A2031] p-4 flex items-center justify-between gap-4">
              <Link
                href={`${adminRoutes.websiteContent.subscriptionPlans}/${subscriptionPlan.id}`}
                className="flex items-center gap-1 text-primary-100">
                <IconifyIcon icon="mdi:pencil" className="text-primary-100" />
                <p className="text-primary-100 text-sm">Edit</p>
              </Link>
              <div
                onClick={() => openDeleteModal(subscriptionPlan)}
                className="flex items-center gap-1 cursor-pointer">
                <IconifyIcon icon="mdi:delete" className="text-red-300" />
                <p className="text-red-300 text-sm">Delete</p>
              </div>
            </div>
          </div>
        ))}
        {isPending && (
          <div className="col-span-3 grid place-items-center h-[50vh]">
            <LoadingIcons.TailSpin />
          </div>
        )}
        {subscriptionPlans?.length === 0 && !isPending &&
          <div className="grid place-items-center h-[50vh]">
            <p className="text-sm text-accent">No subscription plans found</p>
          </div>
        }
      </div>
    </div>
  )
}
