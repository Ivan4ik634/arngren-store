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

  const { data, error } = await productService.addProduct({
    name: form.name,
    category: form.category,
    price: form.price,
    brand: form.brand,
    description: form.description,
    seller: user.id,
    count: form.count,
    images,
  });

  const { error: errorAddApplication } = await applicationService.addApplication({
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

  const { data, error } = await productService.editProduct({
    name: form.name,
    category: form.category,
    price: form.price,
    brand: form.brand,
    id,
    description: form.description,
    count: form.count,
    images,
  });

  const { error: errorAddApplication } = await applicationService.addApplication({
    product_id: id,
  });

  if (error || errorAddApplication) return toast.error('Error adding product');
  toast.success('Product added successfully');
};
