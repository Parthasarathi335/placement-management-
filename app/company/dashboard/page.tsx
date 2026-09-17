import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import DashboardCard from '@/components/DashboardCard';
import { LucideBuilding, LucideBriefcase } from 'lucide-react';

export default async function CompanyDashboard() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/auth/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const { data: company } = await supabase.from('companies').select('*').eq('profile_id', user.id).single();

  const [{ count: activeJobs }, { count: totalApplicants }, { count: shortlisted }, { count: selected }] = await Promise.all([
    supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('company_id', company?.id).eq('status', 'published'),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('company_id', company?.id),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('company_id', company?.id).eq('status', 'shortlisted'),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('company_id', company?.id).eq('status', 'selected'),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Company" value={company?.company_name ?? '-'} icon={<LucideBuilding size={24} />} />
        <DashboardCard title="Approval Status" value={company?.approval_status ?? '-'} />
        <DashboardCard title="Active Jobs" value={activeJobs ?? 0} icon={<LucideBriefcase size={24} />} />
        <DashboardCard title="Total Applicants" value={totalApplicants ?? 0} />
        <DashboardCard title="Shortlisted" value={shortlisted ?? 0} />
        <DashboardCard title="Selected" value={selected ?? 0} />
      </div>
    </div>
  );
}