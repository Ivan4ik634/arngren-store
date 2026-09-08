'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { productService } from '@/services/Product.service';
import { useQuery } from '@tanstack/react-query';
import { Minus, Plus, Star } from 'lucide-react';
import { FC } from 'react';
import DialogAddReview from './DialogAddReview';

import { useParams } from 'next/navigation';
interface Props {}

const ProductPage: FC<Props> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['product'],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
  if (!data) return null;
  return (
    <div className=" h-[calc(100vh-200px)]  space-y-12.5">
      <div className="flex gap-y-[50px] gap-x-[25px]">
        <div className="w-[600px] h-full">
          <img className="w-full aspect-square rounded-[5px]" src={data.images[0]} />
          <div className="gap-5 grid grid-cols-4">
            <img
              className="w-full aspect-square rounded-[5px]"
              src="
      /design.png"
            />
            <img
              className="w-full aspect-square rounded-[5px]"
              src="
      /design.png"
            />
            <img
              className="w-full aspect-square rounded-[5px]"
              src="
      /design.png"
            />
            <img
              className="w-full aspect-square rounded-[5px]"
              src="
      /design.png"
            />
          </div>
        </div>
        <div className="w-full h-[600px] flex flex-col space-y-4">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold">{data.name}</h3>
            <p className=" ">Product Description</p>
            <p className="text-primary font-bold text-xl">{data.category}</p>
            <div className="flex items-center gap-x-5">
              <p className=" text-4xl font-bold">${data.price}</p>
              <div className="flex items-center">
                <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
                <span className="mx-1 font-semibold text-[#0969ff]">{data.rating}</span>
                <span className="text-zinc-500"> ({data.reviews})</span>
              </div>
            </div>
            <div className="border-2 shadow border-zinc-500 w-min  rounded-[5px] p-3 flex items-center">
              <Minus className="size-7" />
              <span className="mx-5 text-xl">{1}</span>
              <Plus className="size-7" />
            </div>
          </div>

          <div className="mt-auto border-t border-zinc-500 flex flex-col gap-2">
            <div className="py-5 flex justify-between border-b font-bold text-2xl">
              <p>Total</p>
              <p>${data.price * 1}</p>
            </div>
            <div className="pt-5">
              <Button className="text-xl w-full py-8">
                <Plus />
                Add to Cart
              </Button>

              <Button variant="outline" className="text-[16px] w-full py-8">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-x-5">
            <h3 className="text-2xl font-bold">Reviews</h3>
            <div className="flex items-center">
              <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
              <span className="mx-1 font-semibold text-[#0969ff]">{4.5}</span>
              <span className="text-zinc-500"> ({10})</span>
            </div>
          </div>
          <DialogAddReview />
        </div>
        <div className="flex flex-col mt-10 gap-y-5">
          <div className="flex gap-x-5">
            <Avatar size="lg">
              <AvatarFallback>a</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-x-5">
                <p>Name</p>
                <div className="flex items-center">
                  <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
                  <span className="mx-1 font-semibold text-[#0969ff]">{4.5}</span>
                  <span className="text-zinc-500"> ({10})</span>
                </div>
                <p>Date</p>
              </div>
              <p>Review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
