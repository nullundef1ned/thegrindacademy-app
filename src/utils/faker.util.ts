import { IOverviewStatistics } from "@/app/(student)/_module/student.interface"

const overviewStatistics: IOverviewStatistics = {
  completedCourses: 0,
  activeCourses: 1,
  enrolledCourses: 1,
}


const fakerUtil = {
  overviewStatistics,
}

export default fakerUtil;