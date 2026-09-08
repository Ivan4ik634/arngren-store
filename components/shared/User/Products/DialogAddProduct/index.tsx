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
    price: 0,
    count: 0,
    category: null,
    brand: null,
  });

  const { images, ref, handleImagesDelete, handleImagesUpload } = useUploadImages({});

  const onSubmit = async () => {
    if (!images) return toast.close('Please upload an image');

    if (!form.name || !form.price || !form.category || !form.brand)
      return toast.close('Please fill all fields');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return toast.close('User not found');

    const { data, error } = await productService.addProduct({
      name: form.name,
      category: form.category,
      price: form.price,
      brand: form.brand,
      seller: user.id,
      count: form.count,
      images: images,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-y-3">
          {images[0] && (
            <div>
              <div className="relative w-full h-40 object-cover">
                <button
                  onClick={() => handleImagesDelete(images[0])}
                  className="absolute right-2 top-2 z-10 text-zinc-400 hover:text-red-500">
                  <X />
                </button>
                <img
                  src={images[0]}
                  alt="Product image"
                  className="w-full rounded-[8px] h-40 object-cover"
                />
              </div>
              <div className="w-full mt-3 gap-3 grid grid-cols-4">
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
                      className="w-full rounded-[5px] aspect-square object-cover"
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
          <Input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="Price..."
            type="number"
          />
          <div className="flex gap-x-5">
            <Select
              value={form.category}
              onValueChange={(value) => setForm({ ...form, category: value })}>
              <SelectTrigger>
                <span className="text-muted-foreground">Category</span>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={form.brand}
              onValueChange={(value) => setForm({ ...form, brand: value })}>
              <SelectTrigger>
                <span className="text-muted-foreground">Brand</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={form.count}
              onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
              placeholder="Product count..."
            />
          </div>
          <div className="flex  justify-end">
            <Button onClick={() => onSubmit()}>Add products</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
