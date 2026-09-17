import { protectRoute } from '@/lib/auth';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  await protectRoute(['student']);
  return <>{children}</>;
}