import { z } from 'zod';

export const studentProfileSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  register_number: z.string().min(2),
  department: z.string().min(1),
  course: z.string().min(1),
  year: z.enum(['1', '2', '3', '4']),
  cgpa: z.number().min(0).max(10),
  backlog_count: z.number().min(0),
});

export const companyProfileSchema = z.object({
  company_name: z.string().min(2),
  hr_name: z.string().min(2),
  mobile: z.string().min(7),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
});

export const jobSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  package: z.string().optional(),
  min_cgpa: z.number().min(0).max(10).optional(),
  max_backlogs: z.number().min(0).optional(),
  job_type: z.string().optional(),
  location: z.string().optional(),
  application_deadline: z.string().optional(),
  drive_date: z.string().optional(),
  status: z.enum(['draft', 'published', 'closed']).default('draft'),
});

export const applicationSchema = z.object({
  job_id: z.string().uuid(),
});

export const interviewSchema = z.object({
  round: z.enum(['aptitude', 'technical', 'hr', 'final']),
  scheduled_at: z.string(),
  location: z.string().optional(),
  meeting_link: z.string().url().optional(),
  notes: z.string().optional(),
});