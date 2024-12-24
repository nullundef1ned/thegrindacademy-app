import { clsx } from "clsx"
import Link from "next/link";

type DashboardCardProps = {
  children: React.ReactNode;
  className?: string;
  footer?: {
    text: string;
    link: string;
  }
}

export default function DashboardCard({ children, className, footer }: DashboardCardProps) {
  return (
    <div className={clsx(className, "rounded-lg border border-[#B0CAFF1A] border-opacity-45 bg-[#1C347D33] h-full p-5 space-y-4 flex flex-col justify-between")}>
      {children}
      {footer && (
        <div className='border-t border-black-400 border-opacity-45 flex items-center justify-center pt-3'>
          <Link href={footer.link} className='body-2 text-primary-400'>{footer.text}</Link>
        </div>
      )}
    </div>
  )
}
