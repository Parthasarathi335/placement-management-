import { supabase } from './supabaseClient';
import { redirect } from 'next/navigation';

export async function protectRoute(allowedRoles: string[]) {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/auth/login');

  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileErr || !profile) redirect('/auth/login');
  if (!allowedRoles.includes(profile.role)) redirect('/auth/login');
}

export async function signOut() {
  await supabase.auth.signOut();
  redirect('/auth/login');
}

export async function getCurrentUserRole(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  return profile?.role ?? null;
}