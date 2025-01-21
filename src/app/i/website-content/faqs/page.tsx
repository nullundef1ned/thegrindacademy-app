'use client';

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { adminRoutes } from "../../_module/admin.routes";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import Table from "@/components/table";
import useURL from "@/hooks/useURL";
import { useFetchFAQs } from "./_apis/useFetchFAQs";
import { TableHeader } from "@/components/table/table.interface";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { useRouter } from "next/navigation";
import { IFAQ } from "@/interfaces/faq";
import { useModal } from "@/providers/modal.provider";
import CreateFAQModal from "./_modals/CreateFAQModal";

export default function FAQsPage() {

  const router = useRouter();
  const { showModal } = useModal();
  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'FAQs' },
  ]

  const tableHeaders: TableHeader<IFAQ>[] = [
    { key: 'question', value: 'Question' },
    { key: 'answer', value: 'Answer', type: TableHeaderTypeEnum.LONG_TEXT },
    { key: 'type', value: 'Type', type: TableHeaderTypeEnum.STATUS },
    { key: 'updatedAt', value: 'Last Updated', type: TableHeaderTypeEnum.DATE },
  ]

  const { data, isPending } = useFetchFAQs({ search: searchValue, page, limit });

  const openCreateFAQModal = () => showModal(<CreateFAQModal />);

  const goToFAQ = (faq: IFAQ) => {
    router.push(`${adminRoutes.websiteContent.faqs}/${faq.id}`);
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">FAQs</p>
          <p className="text-sm text-accent">Manage FAQs to keep your website fresh and relevant</p>
        </div>
        <Button size="sm" onClick={openCreateFAQModal}>Add New FAQ</Button>
      </div>
      <Card>
        <Table<IFAQ>
          data={data}
          searchable
          skeletonCount={4}
          loading={isPending}
          headers={tableHeaders}
          onRowClick={goToFAQ}
          emptyStateMessage={'No FAQs found'}
        />
      </Card>
    </div>
  )
}
