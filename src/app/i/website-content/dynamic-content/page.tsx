'use client';

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { adminRoutes } from "../../_module/admin.routes";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import Table from "@/components/table";
import useURL from "@/hooks/useURL";
import { useFetchDynamicContent } from "./_apis/useFetchDynamicContent";
import { IDynamicContent } from "@/interfaces/dynamic-content";
import { TableHeader } from "@/components/table/table.interface";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { useRouter } from "next/navigation";

export default function DynamicContentPage() {

  const router = useRouter();
  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Dynamic Content' },
  ]

  const tableHeaders: TableHeader<IDynamicContent>[] = [
    { key: 'title', value: 'Title' },
    { key: 'content', value: 'Content' },
    { key: 'isPublished', value: 'Published', type: TableHeaderTypeEnum.PUBLISHED },
    { key: 'updatedAt', value: 'Last Updated', type: TableHeaderTypeEnum.DATE },
  ]

  const { data, isPending } = useFetchDynamicContent({ search: searchValue, page, limit });

  const goToDynamicContent = (dynamicContent: IDynamicContent) => {
    router.push(`${adminRoutes.websiteContent.dynamicContent}/${dynamicContent.id}`);
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Dynamic Content</p>
          <p className="text-sm text-accent">Manage dynamic content sections to keep your website fresh and relevant</p>
        </div>
        <Button href={`${adminRoutes.websiteContent.dynamicContent}/new`} size="sm">Add New Section</Button>
      </div>
      <Card>
        <Table<IDynamicContent>
          data={data}
          searchable
          skeletonCount={4}
          loading={isPending}
          headers={tableHeaders}
          onRowClick={goToDynamicContent}
          emptyStateMessage={'No dynamic content found'}
        />
      </Card>
    </div>
  )
}
