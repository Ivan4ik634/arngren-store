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
import { FC, useState } from 'react';

interface Props {}

const DialogAddProduct: FC<Props> = (props) => {
  const [form, setForm] = useState<ProductFormCreateT>({
    name: '',
    price: 0,
    category: null,
    brand: null,
  });

  const { image, ref, handleImageDelete, handleImageUpload } = useUploadImage({});

  const onSubmit = async () => {
    if (!image) return toast.close('Please upload an image');

    if (!form.name || !form.price || !form.category || !form.brand)
      return toast.close('Please fill all fields');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return toast.close('User not found');

    const { error } = await productService.addProduct({
      name: form.name,
      category: form.category,
      price: form.price,
      brand: form.brand,
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
        <form className="flex flex-col w-full gap-y-3">
          {image && <img src={image} alt="Product image" className="w-full h-40 object-cover" />}
          <div className="w-full flex justify-between">
            <Button onClick={() => ref.current?.click()} type="button">
              Add image
            </Button>
            <input type="file" ref={ref} onChange={handleImageUpload} className="hidden" />
            {image && (
              <Button variant="destructive" onClick={handleImageDelete} type="button">
                Delete image
              </Button>
            )}
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
          </div>
          <div className="flex  justify-end">
            <Button onClick={() => onSubmit()}>Add products</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
