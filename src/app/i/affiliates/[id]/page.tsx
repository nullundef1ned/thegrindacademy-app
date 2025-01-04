'use client';

import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar";
import IconifyIcon from "@/components/IconifyIcon";
import helperUtil from "@/utils/helper.util";
import Status from "@/components/table/Status";
import Link from "next/link";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import Table from "@/components/table";
import { TableHeader } from "@/components/table/table.interface";
import { useModal } from "@/providers/modal.provider";
import { adminRoutes } from "../../_module/admin.routes";
import LoadingIcons from "react-loading-icons";
import { useTitle } from "@/providers/title.provider";
import useAdminMutations from "../../_module/admin.mutations";
import notificationUtil from "@/utils/notification.util";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { useFetchAffiliateDetails, useFetchAffiliateReferrals } from "../../_module/_apis/useAdminAffiliates";
import DeleteAffiliateModal from "./_modals/DeleteAffiliateModal";
import SuspendAffiliateModal from "./_modals/SuspendAffiliateModal";
import UpdateAffiliateTelegramModal from "./_modals/UpdateAffiliateTelegramModal";
import { IUserReferral } from "@/app/(student)/_module/student.interface";
import useCurrency from "@/hooks/useCurrency";

export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const { setTitle } = useTitle();
  const { showModal } = useModal();
  const { formatCurrency } = useCurrency();
  const { data: affiliate, isPending } = useFetchAffiliateDetails(id);
  const { data: referrals, isPending: isReferralsPending } = useFetchAffiliateReferrals(id);


  const { updateAffiliateStatusMutation } = useAdminMutations();

  if (isPending) return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center">
      <LoadingIcons.TailSpin />
    </div>
  )

  if (!affiliate) return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center place-content-center gap-4">
      <p className="text-sm text-accent">Affiliate not found</p>
      <Link href={adminRoutes.affiliates} className="text-sm underline">Go back to affiliates</Link>
    </div>
  )

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Affiliates', link: adminRoutes.affiliates },
    { name: `${affiliate.info.firstName} ${affiliate.info.lastName}` },
  ]

  const tableHeaders: TableHeader<IUserReferral>[] = [
    // @ts-expect-error nested object
    { key: 'referee.firstName+referee.lastName', value: 'Student Name' },
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
  ]

  const goToUser = (referral: IUserReferral) => {
    router.push(`/i/users/${referral.userId}`);
  }

  setTitle(`${affiliate.info.firstName} ${affiliate.info.lastName} | Affiliate`);

  const reactivateUser = () => {
    updateAffiliateStatusMutation.mutate({ id: affiliate.id, status: 'active' }, {
      onSuccess: () => notificationUtil.success('Affiliate reactivated successfully')
    });
  }

  const openDeleteAffiliateModal = () => showModal(<DeleteAffiliateModal affiliate={affiliate} />);
  const openSuspendAffiliateModal = () => showModal(<SuspendAffiliateModal affiliate={affiliate} />);
  const openUpdateAffiliateTelegramModal = () => showModal(<UpdateAffiliateTelegramModal affiliate={affiliate} />);

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <p className="text-xl font-medium">User Information</p>
        <div className="flex items-center gap-3">
          {affiliate.status !== 'suspended' ? <Button onClick={openSuspendAffiliateModal} size="sm">Suspend Affiliate</Button> :
            <Button onClick={reactivateUser} loading={updateAffiliateStatusMutation.isPending} size="sm">Reactivate Affiliate</Button>
          }
          <Button onClick={openDeleteAffiliateModal} size="sm" variant="destructive">Delete Affiliate</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-5 border-b pb-6">
        <Avatar src={affiliate.info.avi} size={60} alt={`${affiliate.info.firstName} ${affiliate.info.lastName}`} type="square" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:account-circle-fill" className="text-xl" />
            <p className="text-sm font-medium">{affiliate.info.firstName} {affiliate.info.lastName}</p>
          </div>
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:mail-fill" className="text-xl" />
            <a href={`mailto:${affiliate.email}`} className="text-sm font-medium">{affiliate.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:telegram-fill" className="text-xl" />
            <p className="text-sm font-medium">{affiliate.info.telegramUserName}</p>
            <p onClick={openUpdateAffiliateTelegramModal} className="text-xs text-accent cursor-pointer">Edit</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Registration Date</p>
          <p className="text-sm font-medium">{helperUtil.formatDate(affiliate.createdAt)}</p>
        </div>
        {affiliate.lastLogin && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-accent">Last Login</p>
            <p className="text-sm font-medium">{helperUtil.formatDate(affiliate.lastLogin)}</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Status</p>
          <Status status={affiliate.status} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Total Payout</p>
          <p className="text-sm font-medium">{formatCurrency(affiliate.payout)}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Total Referrals</p>
          <p className="text-sm font-medium">{affiliate.referrals}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Total Views</p>
          <p className="text-sm font-medium">{affiliate.views}</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-accent">Referrals</p>
        <Card>
          <Table<IUserReferral>
            data={referrals}
            skeletonCount={4}
            searchable={false}
            headers={tableHeaders}
            onRowClick={goToUser}
            loading={isReferralsPending}
            emptyStateMessage={`No referrals found for this affiliate`}
          />
        </Card>
      </div>
    </div>
  )
}

