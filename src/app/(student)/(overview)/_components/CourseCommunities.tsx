import { useState } from "react"
import StudentQueries from "../../_module/student.queries"
import Card from "@/components/Card"
import IconifyIcon from "@/components/IconifyIcon"
import clsx from "clsx"
import { ICourseCommunity } from "../../_module/student.interface"
import Link from "next/link"

export default function CourseCommunities() {
  const [page, setPage] = useState(1)

  const { useFetchCourseCommunitiesQuery } = StudentQueries()
  const { data } = useFetchCourseCommunitiesQuery({ page, limit: 4 })

  const nextPage = () => {
    if (data?.totalPages && page < data.totalPages) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const courseCommunities = data?.result || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-accent">Your Telegram Communities</p>
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
      {
        courseCommunities.map((courseCommunity) => (
          <CourseCommunityCard key={courseCommunity.id} courseCommunity={courseCommunity} />
        ))
      }
      {
        courseCommunities.length == 0 && (
          <Card className="flex flex-col items-center justify-center gap-2 h-60">
            <IconifyIcon icon="ri:error-warning-line" className="text-4xl text-accent" />
            <p className="text-sm text-gray-500">No communities found</p>
            <Link href="/courses" className="text-sm text-accent"><span className="font-medium hover:underline text-primary">Enroll</span> in a course to gain access to communities</Link>
          </Card>
        )
      }
    </div>
  )
}

const CourseCommunityCard = ({ courseCommunity }: { courseCommunity: ICourseCommunity }) => {
  const withMemberCountMessage = courseCommunity.telegramChannelMemberCount > 20 ? `Join over ${courseCommunity.telegramChannelMemberCount} members` : "Join Community";
  const message = {
    pending: withMemberCountMessage,
    completed: "Go to Community"
  }[courseCommunity.status]

  return (
    <Card key={courseCommunity.id} className="flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <IconifyIcon icon="mdi:telegram" className="text-2xl" />
        <p className="text-sm font-medium text-accent">{courseCommunity.course.name}</p>
      </div>
      <Link target="_blank" href={courseCommunity.telegramChannelInviteLink} className="flex items-center gap-2 text-gray-500 whitespace-nowrap hover:text-primary-200">
        <p className="text-sm whitespace-nowrap">{message}</p>
        <IconifyIcon icon="ri:arrow-right-up-line" className="text-lg" />
      </Link>
    </Card>
  )
}