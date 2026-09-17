import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import DashboardCard from '@/components/DashboardCard';
import { LucideUsers, LucideBuilding2, LucideBriefcase, LucideCheckCircle } from 'lucide-react';

export default async function AdminDashboard() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/auth/login');

  const [
    { count: totalStudents },
    { count: totalCompanies },
    { count: approvedCompanies },
    { count: pendingCompanies },
    { count: totalJobs },
    { count: activeJobs },
    { count: totalApplications },
    { count: selectedStudents },
  ] = await Promise.all([
    supabase.from('students').select('id', { count: 'exact', head: true }),
    supabase.from('companies').select('id', { count: 'exact', head: true }),
    supabase.from('companies').select('id', { count: 'exact', head: true }).eq('approval_status', 'approved'),
    supabase.from('companies').select('id', { count: 'exact', head: true }).eq('approval_status', 'pending'),
    supabase.from('jobs').select('id', { count: 'exact', head: true }),
    supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('applications').select('id', { count: 'exact', head: true }),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'selected'),
  ]);

  const placementPct = totalStudents ? Math.round((selectedStudents! / totalStudents!) * 100) : 0;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Total Students" value={totalStudents ?? 0} icon={<LucideUsers size={24} />} />
        <DashboardCard title="Total Companies" value={totalCompanies ?? 0} icon={<LucideBuilding2 size={24} />} />
        <DashboardCard title="Approved Companies" value={approvedCompanies ?? 0} />
        <DashboardCard title="Pending Companies" value={pendingCompanies ?? 0} />
        <DashboardCard title="Total Jobs" value={totalJobs ?? 0} icon={<LucideBriefcase size={24} />} />
        <DashboardCard title="Active Jobs" value={activeJobs ?? 0} />
        <DashboardCard title="Total Applications" value={totalApplications ?? 0} />
        <DashboardCard title="Selected Students" value={selectedStudents ?? 0} icon={<LucideCheckCircle size={24} />} />
        <DashboardCard title="Placement %" value={`${placementPct}%`} />
      </div>
    </div>
  );
}