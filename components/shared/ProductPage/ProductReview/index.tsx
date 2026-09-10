'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { reviewService } from '@/services/Review.service';
import { useReviews } from '@/store/useReviews';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import DialogAddReview from './DialogAddReview';

interface Props {}

const ProductReview: FC<Props> = (props) => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewService.getAll(id),
    enabled: !!id,
  });
  const { setReviews, reviews } = useReviews();
  useEffect(() => {
    if (data) setReviews(data);
  }, [data]);
  return (
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
        {reviews?.map((review) => (
          <div className="flex gap-x-5">
            <Avatar size="lg">
              <AvatarFallback>{review.user_id.name[0]}</AvatarFallback>
              <AvatarImage src={review.user_id.avatar} />
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-x-5">
                <p className="font-bold">{review.user_id.name}</p>

                <p>{dayjs(review.created_at).format('MMM DD YYYY')}</p>
              </div>
              <div className="flex items-center">
                {Array(review.rating)
                  .fill(0)
                  .map((_, index) => (
                    <Star key={index} className="size-4 fill-[#0969ff] text-[#0969ff]" />
                  ))}
              </div>

              <p>Review</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
