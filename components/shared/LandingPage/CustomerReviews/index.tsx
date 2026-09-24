'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { Quote, Star } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const reviews = [
  {
    name: 'Sarah Mitchell',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    text: 'Great quality and fast delivery.',
  },
  {
    name: 'James Carter',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Amazing products and a super smooth checkout experience.',
  },
  {
    name: 'Emily Johnson',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    text: 'Everything arrived on time and exactly as described. Highly recommend!',
  },
];

const CustomerReviews: FC<Props> = (props) => {
  return (
    <main
      id="reviews"
      className="relative isolate flex flex-col justify-center min-h-[600px] py-24 overflow-hidden ">
      <div className="relative flex max-w-[1400px] items-center py-16 lg:py-20">
        <div className="w-full max-w-[800px]">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            CUSTOMER REVIEWS
          </p>
          <Title>What Our Customers Say.</Title>
          <Description>Real feedback from people who love shopping with us.</Description>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
        {reviews.map((review, index) => (
          <Card key={index} className="relative overflow-hidden">
            <Quote className="absolute right-0 top-0 size-10 text-primary/10" />
            <CardContent className="flex h-full flex-col gap-3">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Title className="text-lg font-bold">{review.name}</Title>
                  <p className="text-sm text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="size-5 fill-[#0969ff] text-[#0969ff]" />
                  ))}
              </div>
              <Description className="text-[20px] leading-relaxed">“{review.text}”</Description>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default CustomerReviews;
