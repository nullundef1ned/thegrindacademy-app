'use client';

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { adminRoutes } from "../../_module/admin.routes";
import { Button } from "@/components/ui/button";
import { useFetchTestimonials } from "./_apis/useFetchTestimonials";
import { useModal } from "@/providers/modal.provider";
import TestimonialModal from "./_modals/TestimonialModal";
import Image from "next/image";
import IconifyIcon from "@/components/IconifyIcon";
import { ITestimonial } from "@/interfaces/testimonial";
import ConfirmTestimonialDeletionModal from "./_modals/ConfirmTestimonialDeletionModal";
import LoadingIcons from "react-loading-icons";
import clsx from "clsx";

export default function TestimonialsPage() {

  const { showModal } = useModal();

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Testimonials' },
  ]

  const { data, isPending } = useFetchTestimonials();

  const openTestimonialModal = (testimonial?: ITestimonial) => showModal(<TestimonialModal testimonial={testimonial} />);
  const openConfirmTestimonialDeletionModal = (testimonial: ITestimonial) => showModal(<ConfirmTestimonialDeletionModal testimonial={testimonial} />);

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Testimonials</p>
          <p className="text-sm text-accent">Manage testimonials screenshots from different students</p>
        </div>
        <Button size="sm" onClick={() => openTestimonialModal()}>Add New Testimonial</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((testimonial) => (
          <div key={testimonial.id}>
            <div className="w-full aspect-video relative group">
              <div className="absolute inset-0 bg-black/50 w-full h-full z-10 group-hover:opacity-0 opacity-100 transition-all duration-300" />
              <div className="absolute top-0 right-0 flex items-center gap-2 p-2 z-10">
                <div onClick={() => openTestimonialModal(testimonial)}
                  className="grid place-items-center size-8 rounded-full cursor-pointer bg-[#00246B]/60 hover:bg-[#00246B]/90 transition-all duration-300">
                  <IconifyIcon icon='mdi:pencil' className="text-white" />
                </div>
                <div
                  onClick={() => openConfirmTestimonialDeletionModal(testimonial)}
                  className="grid place-items-center size-8 rounded-full cursor-pointer bg-red-700/60 hover:bg-red-700/90 transition-all duration-300">
                  <IconifyIcon icon='mdi:trash-can' className="text-white" />
                </div>
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-2 z-10">
                <div className={clsx("px-2 py-1 rounded", testimonial.isPublished ? 'bg-[#00246B]' : 'bg-accent')}>
                  <p className="text-xs text-white">
                    {testimonial.isPublished ? 'Published' : 'Draft'}
                  </p>
                </div>
              </div>
              <Image src={testimonial.imageUrl} alt='testimonial' fill className='object-cover absolute' />
            </div>
          </div>
        ))}
      </div>

      {isPending &&
        <div className="grid place-items-center h-[50vh]">
          <LoadingIcons.TailSpin />
        </div>
      }

      {data?.length === 0 && !isPending &&
        <div className="grid place-items-center h-[50vh]">
          <p className="text-sm text-accent">No testimonials found</p>
        </div>
      }
    </div>
  )
}
