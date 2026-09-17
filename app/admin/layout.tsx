import { protectRoute } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await protectRoute(['admin']);
  return <>{children}</>;
}