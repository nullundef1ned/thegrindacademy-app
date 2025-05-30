type AuthCardProps = {
  children: React.ReactNode
  title: string
  description?: string
}

export default function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div
      style={{ background: 'linear-gradient(190.83deg, rgba(33, 50, 101, 0.384) -10.67%, rgba(32, 41, 67, 0.184) 58.75%, rgba(19, 28, 55, 0.304) 102.2%)' }}
      className='rounded-md border border-[#B0CAFF26]/10 p-7 relative overflow-hidden w-full max-w-sm flex flex-col items-center'>
      <div className='flex flex-col space-y-8 w-full'>
        <div className='space-y-2 flex flex-col items-center'>
          <p className='text-xl font-bold text-center'>{title}</p>
          <p className='text-sm text-accent text-center max-w-72'>
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
