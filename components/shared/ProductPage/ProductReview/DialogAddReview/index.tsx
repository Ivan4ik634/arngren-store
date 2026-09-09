'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { useProfile } from '@/hooks/useProfile';
import { reviewService } from '@/services/Review.service';
import { useReviews } from '@/store/useReviews';
import { ReviewCreateT } from '@/types/ReviewT';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {}

const DialogAddReview: FC<Props> = (props) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { profile } = useProfile();
  const { addReview } = useReviews();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewCreateT>({
    defaultValues: {
      rating: 0,
      text: '',
      user_id: profile?.id || '',
      product_id: id,
    },
  });

  useEffect(() => {
    if (profile) {
      setValue('user_id', profile.id);
    }
  }, [profile]);

  const rating = watch('rating');
  const activeRating = hoveredRating || rating;

  const handleFormSubmit = async (data: ReviewCreateT) => {
    if (data.rating < 1 && data.rating > 5) return toast.close('Rating must be between 1 and 5');

    const res = await reviewService.addReview(data);
    addReview(res.data);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add review</DialogTitle>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
          <div className="flex items-center gap-x-1">
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= activeRating;

                return (
                  <button
                    key={index}
                    type="button"
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setValue('rating', starValue, { shouldValidate: true })}>
                    <Star
                      className={isFilled ? 'text-[#0969ff]' : 'text-gray-300'}
                      fill={isFilled ? '#0969ff' : 'none'}
                    />
                  </button>
                );
              })}
          </div>

          <Input placeholder="Review..." {...register('text', { required: true })} />
          <p className="text-red-500">{errors.text?.message}</p>
          <div className="w-full mt-3 flex justify-end">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddReview;
