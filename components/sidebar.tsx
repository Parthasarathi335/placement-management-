import Link from 'next/link';
import { LucideHome, LucideUser, LucideBriefcase, LucideFileChart, LucideLogOut } from 'lucide-react';

type NavItem = { href: string; label: string; icon: JSX.Element };

export default function Sidebar({ items }: { items: NavItem[] }) {
  return (
    <nav className="w-64 bg-gray-800 text-white min-h-screen p-4 hidden md:block">
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="flex items-center p-2 rounded hover:bg-gray-700">
              {it.icon}
              <span className="ml-2">{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}