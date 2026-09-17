import Link from 'next/link';
import { LucideArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-white py-12">
      <h1 className="text-5xl font-extrabold mb-4">Placement Hub</h1>
      <p className="text-xl text-gray-700 mb-8">
        Connecting Students, Companies and Placement Teams in One Platform.
      </p>
      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
        >
          Login <LucideArrowRight className="ml-2" size={16} />
        </Link>
        <Link
          href="/auth/register"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
        >
          Register <LucideArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    </main>
  );
}