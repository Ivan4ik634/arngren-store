import ProductPage from '@/components/shared/ProductPage';
import { supabaseServer } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Product({ params }: ProductPageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = supabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .or(`seller.eq.${user.id},application.eq.true`)
    .single();

  if (error || !product) {
    return notFound();
  }

  return <ProductPage product={product} />;
}
