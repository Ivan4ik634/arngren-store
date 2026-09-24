import { supabase } from '@/lib/supabase/client';
import { applicationService } from '@/services/Application.service';
import { productService } from '@/services/Product.service';
import { ProductFormCreateT } from '@/types/ProductT';
import toast from 'react-hot-toast';

export const handleActionAddProduct = async (form: ProductFormCreateT, images: string[]) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return toast.error('User not found');

  const { data, error } = await productService.create({
    name: form.name,
    category: form.category,
    price: form.price,
    brand: form.brand,
    description: form.description,
    seller: user.id,
    count: form.count,
    images,
  });

  const { error: errorAddApplication } = await applicationService.create({
    product_id: data?.id as string,
  });

  if (error || errorAddApplication) return toast.error('Error adding product');
  toast.success('Product added successfully');
};
export const handleActionEditProduct = async (
  form: ProductFormCreateT,
  images: string[],
  id: string,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return toast.error('User not found');

  const { error } = await productService.update({
    name: form.name,
    category: form.category,
    price: form.price,
    brand: form.brand,
    id,
    description: form.description,
    count: form.count,
    images,
  });

  // Переводим продукт обратно на модерацию
  const { error: errorUpdateApplication } = await applicationService.updateStatus(id, 'pending');

  if (error || errorUpdateApplication) return toast.error('Error editing product');
  toast.success('Product edited successfully');
};
