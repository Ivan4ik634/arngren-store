'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { useUploadImage } from '@/hooks/useUploadImage';
import { supabase } from '@/lib/supabase';
import { productService } from '@/services/Product.service';
import { ProductFormCreateT } from '@/types/ProductT';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {}

const DialogAddProduct: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormCreateT>();

  const { image, ref, handleImageDelete, handleImageUpload } = useUploadImage();

  const onSubmit: SubmitHandler<ProductFormCreateT> = async (data) => {
    if (!image) return toast.close('Please upload an image');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return toast.close('User not found');

    const { error } = await productService.addProduct({
      ...data,
      seller: user.id,
      images: [image],
    });

    if (error) return toast.close('Error adding product');
    toast.close('Product added successfully');
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Add product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-y-3">
          <div className="w-full flex justify-between">
            <Button onClick={() => ref.current?.click()} type="button">
              Add image
            </Button>
            <input type="file" ref={ref} onChange={handleImageUpload} className="hidden" />
            <Button variant="destructive" onClick={handleImageDelete} type="button">
              Delete image
            </Button>
          </div>
          <Input {...register('name')} placeholder="Product name..." />
          <Input {...register('price')} placeholder="Price..." type="number" />
          <div className="flex gap-x-5">
            <Select {...register('category')}>
              <SelectTrigger>
                <span className="text-muted-foreground">Category</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Category:Sport">Sport</SelectItem>
                <SelectItem value="Category:Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            <Select {...register('brand')}>
              <SelectTrigger>
                <span className="text-muted-foreground">Brand</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Category:Other">Other</SelectItem>
                <SelectItem value="Category:Samsung">Samsung</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex  justify-end">
            <Button>Add products</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
