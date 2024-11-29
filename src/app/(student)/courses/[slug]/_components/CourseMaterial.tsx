import { ICourseMaterial } from "@/app/(student)/_module/student.interface";
import IconifyIcon from "@/components/IconifyIcon";
import helperUtil from "@/utils/helper.util";
import notificationUtil from "@/utils/notification.util";
import { useMutation } from "@tanstack/react-query";
import LoadingIcons from "react-loading-icons";

interface ICourseMaterialProps {
  material: ICourseMaterial;
}

export default function CourseMaterial({ material }: ICourseMaterialProps) {
  const { name, type, link } = material;

  const typeIcon = {
    video: 'ri:video-line',
    document: 'ri:file-text-line',
    image: 'ri:image-line',
  }

  const { mutate: downloadMaterial, isPending } = useMutation({
    mutationFn: async () => {
      await helperUtil.downloadFile(link, name);
    },
    onSuccess: () => {
      notificationUtil.success('Material downloaded successfully');
    }
  })


  return (
    <div
      className="group bg-[#00246B14] border border-[#E6EEFF1A] rounded py-3 px-4 flex items-center justify-between cursor-pointer"
      onClick={() => downloadMaterial()}>
      <div className="flex items-center gap-2">
        <IconifyIcon icon={typeIcon[type]} className="size-3 text-accent flex items-center justify-center" />
        <p className="text-sm line-clamp-1">{name}</p>
      </div>
      {isPending ? <LoadingIcons.TailSpin className="size-3" /> :
        <IconifyIcon icon="ri:download-fill" className="size-3 text-accent flex items-center justify-center group-hover:text-primary-100 transition-all duration-300" />
      }
    </div>
  )
}
