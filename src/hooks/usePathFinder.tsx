import { anchor } from '@/app/i/_module/admin.routes';
import { usePathname } from 'next/navigation';

export default function usePathFinder() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith(`/${anchor}`);
  const isAffiliate = pathname.startsWith('/affiliate');

  const rootPath = isAdmin ? `/${anchor}` : isAffiliate ? '/affiliate' : '';
  const loginPath = `${rootPath}/login`;
  const homePath = `${rootPath}/dashboard`;
  const currentPath = rootPath ? `${rootPath}/${pathname.split('/')[2]}` : `/${pathname.split('/')[1]}`;

  return { isAdmin, isAffiliate, rootPath, loginPath, homePath, currentPath }
}
