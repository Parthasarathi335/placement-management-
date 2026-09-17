import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import DashboardCard from '@/components/DashboardCard';
import ProgressBar from '@/components/ProgressBar';
import { LucideUser, LucideBook, LucideBriefcase } from 'lucide-react';
import { calculateProfileCompletion } from '@/lib/profileCompletion';

export default async function StudentDashboard() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/auth/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const { data: student } = await supabase.from('students').select('*').eq('profile_id', user.id).single();

  // fetch counts (applications, shortlisted, selected)
  const [{ count: applications }, { count: shortlisted }, { count: selected }] = await Promise.all([
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('student_id', student?.id),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('student_id', student?.id).eq('status', 'shortlisted'),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('student_id', student?.id).eq('status', 'selected'),
  ]);

  const completion = calculateProfileCompletion(profile, student, [], [], []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Name" value={profile?.full_name ?? '-'} icon={<LucideUser size={24} />} />
        <DashboardCard title="Profile Completion" value={`${completion}%`} />
        <DashboardCard title="CGPA" value={student?.cgpa ?? '-'} icon={<LucideBook size={24} />} />
        <DashboardCard title="Applications" value={applications ?? 0} icon={<LucideBriefcase size={24} />} />
        <DashboardCard title="Shortlisted" value={shortlisted ?? 0} />
        <DashboardCard title="Selected" value={selected ?? 0} />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Profile Completion</h2>
        <ProgressBar percentage={completion} />
      </div>
    </div>
  );
}