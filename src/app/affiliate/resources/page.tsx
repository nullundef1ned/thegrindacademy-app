'use client';

import ResourceContent from "@/app/i/resources/_components/ResourceContent";
import IconifyIcon from "@/components/IconifyIcon";
import { useAffiliateResourcesQuery } from "@/hooks/api/affiliate/useAffiliateCommunity";
import useURL from "@/hooks/useURL";
import clsx from "clsx";
import LoadingIcons from "react-loading-icons";

export default function ResourcesPage() {
  const { searchParams, updateParams } = useURL();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 12;

  const { data, isPending } = useAffiliateResourcesQuery({ page: Number(page), limit: Number(limit) });
  const resources = data?.result || [];

  const prevPage = () => {
    if (Number(page) == 1) return;
    updateParams({ key: 'page', value: Number(page) - 1 });
  }

  const nextPage = () => {
    if (Number(page) == data?.totalPages) return;
    updateParams({ key: 'page', value: Number(page) + 1 });
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="flex justify-between items-center">
        <p className="font-medium">Resources</p>
        <div className="flex items-center gap-2">
          <div
            className={clsx(page == 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer", "size-8 grid place-items-center bg-[#00246B33] border rounded border-[#B0CAFF1A]")}
            onClick={prevPage}>
            <IconifyIcon icon="ri:arrow-left-s-line" className="text-lg" />
          </div>
          <div
            className={clsx(data && data?.totalPages <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer", "size-8 grid place-items-center bg-[#00246B33] border rounded border-[#B0CAFF1A]")}
            onClick={nextPage}>
            <IconifyIcon icon="ri:arrow-right-s-line" className="text-lg" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceContent key={index} resource={resource} isAffiliate={true} />
        ))}
        {resources.length === 0 && !isPending && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center h-60">
            <p className="text-muted-foreground">No resources found</p>
          </div>
        )}
        {isPending && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center h-60">
            <LoadingIcons.TailSpin />
          </div>
        )}
      </div>
    </div>
  )
}
