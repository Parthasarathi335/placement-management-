import { supabase } from './supabaseClient';

export async function createNotification(
  profileId: string,
  title: string,
  message: string,
  type: string = 'info'
) {
  await supabase.from('notifications').insert({
    profile_id: profileId,
    title,
    message,
    type,
    is_read: false,
  });
}