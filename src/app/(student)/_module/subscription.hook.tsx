import StudentQueries from './student.queries';
import { usePathname } from 'next/navigation';
import { navigationRoutes } from './student.routes';

export default function useSubscriptionHook() {

  const pathname = usePathname();
  const { useFetchSubscriptionQuery } = StudentQueries();
  const { data: subscription, isPending } = useFetchSubscriptionQuery();

  const isSubscriptionActive = subscription?.active;

  const rootPath = pathname.startsWith('/i') ? `/i/${pathname.split('/')[2]}` : `/${pathname.split('/')[1]}`

  const isProtectedRoute = navigationRoutes.some(route => route.protected && rootPath === route.href);

  const disableAccess = !isSubscriptionActive && isProtectedRoute && subscription?.unpaid;

  return { subscription, isPending, isSubscriptionActive, disableAccess }
}
