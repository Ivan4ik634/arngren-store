import PublicProfilePage from '@/components/shared/User/PublicProfilePage';
import { supabaseServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface PublicProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PublicProfile({ params }: PublicProfileProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = supabaseServer(cookieStore);

  // Только публичные данные — без персональных (дата рождения, пол, язык, баланс)
  const { data, error } = await supabase
    .from('profiles')
    .select('id, avatar, name, email, created_at')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  return <PublicProfilePage profile={data} />;
}
