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
import SelectFilter from '@/components/ui/SelectFilter';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { brandFilters } from '@/data/Brands';
import { categoryFilters } from '@/data/Catogeries';
import { useUploadImages } from '@/hooks/useUploadImages';
import { supabase } from '@/lib/supabase/client';
import { applicationService } from '@/services/Application.service';
import { productService } from '@/services/Product.service';
import { ProductFormCreateT } from '@/types/ProductT';
import { X } from 'lucide-react';
import { FC, useState } from 'react';

interface Props {}

const DialogAddProduct: FC<Props> = (props) => {
  const [form, setForm] = useState<ProductFormCreateT>({
    name: '',
    price: undefined,
    count: undefined,
    category: null,
    brand: null,
    description: '',
  });

  const { images, ref, handleImagesDelete, handleImagesUpload } = useUploadImages({});

  const onSubmit = async () => {
    if (!images) return toast.close('Please upload an image');

    if (
      !form.name ||
      !form.count ||
      !form.description ||
      !form.count ||
      !form.price ||
      !form.category ||
      !form.brand
    )
      return toast.close('Please fill all fields');

    if (form.price <= 50000) return toast.close('Price must be greater than $50,000');
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return toast.close('User not found');

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

    if (error || errorAddApplication) return toast.close('Error adding product');
    toast.close('Product added successfully');
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Add product</Button>
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-y-3">
          {images[0] && (
            <div className="w-full flex">
              <div className="relative w-full aspect-square">
                <button
                  onClick={() => handleImagesDelete(images[0])}
                  className="absolute right-2 top-2 z-10 text-zinc-400 hover:text-red-500">
                  <X />
                </button>
                <img
                  src={images[0]}
                  alt="Product image"
                  className="w-full rounded-[8px] aspect-square object-cover"
                />
              </div>
              <div className="w-full ml-5 gap-5 grid grid-cols-2">
                {images.slice(1).map((image, index) => (
                  <div className="relative w-full aspect-square">
                    <button
                      onClick={() => handleImagesDelete(image)}
                      className="absolute right-2 top-2 z-10 text-zinc-400 hover:text-red-500">
                      <X />
                    </button>
                    <img
                      key={index}
                      src={image}
                      alt="Product image"
                      className="w-full rounded-[5px] aspect-square object-fill"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="w-full flex justify-between">
            <Button onClick={() => ref.current?.click()} type="button">
              Add images
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={ref}
              onChange={handleImagesUpload}
              className="hidden"
            />
          </div>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product name..."
          />
          <Textarea
            className="resize-none h-[100px]"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Product description..."
          />
          <Input
            value={form.price}
            max={50000}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="Price..."
            type="number"
          />
          <div className="flex gap-x-5">
            <SelectFilter
              options={categoryFilters}
              label="Category"
              onChange={(e) => setForm({ ...form, category: e })}
              value={form.category!}
            />
            <SelectFilter
              options={brandFilters}
              onChange={(e) => setForm({ ...form, brand: e })}
              value={form.brand!}
              label="Brands"
            />

            <Input
              value={form.count}
              onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
              placeholder="Count..."
              type="number"
            />
          </div>
          <div className="flex  justify-end">
            <Button onClick={() => onSubmit()}>Add product</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
