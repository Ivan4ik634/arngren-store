'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const DialogAddReview: FC<Props> = (props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add review</DialogTitle>

        <div className="space-y-3">
          <div className="flex items-center gap-x-1">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Star key={index} className="text-[#0969ff]" />
              ))}
          </div>
          <Input placeholder="Review..." />
          <div className="w-full mt-3 flex justify-end ">
            <Button>Send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddReview;
