import { protectRoute } from '@/lib/auth';

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  await protectRoute(['company']);
  return <>{children}</>;
}