'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { studentProfileSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LucideUser, LucideMail, LucidePhone } from 'lucide-react';

export default function StudentRegister() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentProfileSchema),
  });

  const onSubmit = async (data: any) => {
    const { email, password, ...profile } = data;
    const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      toast.error(signUpError.message);
      return;
    }
    const userId = signUpData.user?.id;
    if (!userId) {
      toast.error('Failed to get user ID');
      return;
    }
    // Insert profile with role = student
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: userId, role: 'student', ...profile });
    if (profileError) {
      toast.error(profileError.message);
      return;
    }
    // Insert empty student row linked to profile
    await supabase.from('students').insert({ profile_id: userId });
    toast.success('Student registered');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Student Registration</h2>
      <div className="flex items-center border px-3 py-2 rounded">
        <LucideUser className="mr-2" />
        <input
          type="text"
          placeholder="Full Name"
          className="flex-1 outline-none"
          {...register('full_name')}
        />
      </div>
      {errors.full_name && <p className="text-red-600">{errors.full_name.message}</p>}

      <div className="flex items-center border px-3 py-2 rounded">
        <LucideMail className="mr-2" />
        <input
          type="email"
          placeholder="Email"
          className="flex-1 outline-none"
          {...register('email')}
        />
      </div>
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}

      <div className="flex items-center border px-3 py-2 rounded">
        <LucideLock className="mr-2" />
        <input
          type="password"
          placeholder="Password"
          className="flex-1 outline-none"
          {...register('password')}
        />
      </div>
      {errors.password && <p className="text-red-600">{errors.password.message}</p>}

      <div className="flex items-center border px-3 py-2 rounded">
        <LucidePhone className="mr-2" />
        <input
          type="text"
          placeholder="Phone"
          className="flex-1 outline-none"
          {...register('phone')}
        />
      </div>
      {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

      {/* Add other fields (register_number, department, etc.) similarly */}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
}