import { useEffect, useState } from 'react'

const breakpoints = [640, 768, 1024, 1280, 1536]

export default function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<number>(0);

  const screenSize: { [key: number]: string } = {
    0: 'sm',
    1: 'md',
    2: 'lg',
    3: 'xl',
    4: '2xl',
  }

  const isMobile = breakpoint < 2
  const isTablet = breakpoint === 2
  const isDesktop = breakpoint > 2

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const breakpoint = breakpoints.findIndex(bp => width < bp)
      setBreakpoint(breakpoint === -1 ? breakpoints.length : breakpoint)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoints])

  return { isMobile, isTablet, isDesktop, screenSize };
}
