'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { LucideUser, LucideLock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RoleLoginPage() {
  const router = useRouter();
  const { role } = useParams() as { role: string };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      // after login, we could optionally verify role server‑side
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">{role} Login</h2>
      <div className="flex items-center border px-3 py-2 rounded">
        <LucideUser className="mr-2" />
        <input
          type="email"
          required
          placeholder="Email"
          className="flex-1 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center border px-3 py-2 rounded">
        <LucideLock className="mr-2" />
        <input
          type="password"
          required
          placeholder="Password"
          className="flex-1 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Sign In
      </button>
    </form>
  );
}