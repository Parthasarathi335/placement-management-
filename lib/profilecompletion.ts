export function calculateProfileCompletion(
  profile: any,
  student: any,
  skills: any[] = [],
  certifications: any[] = [],
  projects: any[] = []
): number {
  const sections = [
    Boolean(profile.full_name && profile.phone && profile.email),
    Boolean(student.register_number && student.department && student.course && student.year && student.cgpa !== null),
    skills.length > 0,
    certifications.length > 0,
    projects.length > 0,
    Boolean(student.resume_url),
  ];
  const filled = sections.filter(Boolean).length;
  return Math.round((filled / sections.length) * 100);
}