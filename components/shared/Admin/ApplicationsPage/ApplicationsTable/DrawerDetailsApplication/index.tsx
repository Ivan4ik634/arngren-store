'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { statusConfig } from '@/configs/STATUS';
import { ApplicationWithProductT } from '@/types/ApplicationT';
import { Calendar, CheckCircle2, Eye, Hash, Mail, Star, Tag, User, XCircle } from 'lucide-react';
import { FC } from 'react';

interface Props {
  application: ApplicationWithProductT;
  handleApprove: (application: ApplicationWithProductT) => void;
  handleReject: (application: ApplicationWithProductT) => void;
}

const DrawerDetailsApplication: FC<Props> = (props) => {
  const { application, handleApprove, handleReject } = props;
  const { product_id: product } = application;
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;

  return (
    <Drawer>
      <DrawerTrigger className="transition-colors hover:text-primary">
        <Eye className="h-5 w-5" />
      </DrawerTrigger>
      <DrawerContent className="w-[700px]">
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4">
          {/* Application ID + status */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Hash className="h-3 w-3" />
              <span>{application.id}</span>
            </div>
            <Badge className={status.className}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
          </div>

          {/* Product preview */}
          <div className="mb-6 flex gap-4">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-1 w-fit">
                <Tag className="mr-1 h-3 w-3" />
                {product.category}
              </Badge>
              <h2 className="text-lg font-bold tracking-tight">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="font-semibold">${product.price}</span>
                <span className="flex items-center gap-0.5 text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Description</h3>
            <p className="text-sm leading-relaxed">{product.description}</p>
          </div>

          <Separator className="my-4" />

          {/* Seller info */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Seller</h3>
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={product.seller?.avatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{product.seller?.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{product.seller?.email}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline">{product.seller?.role}</Badge>
            </div>
          </div>

          {/* Meta */}
          <div className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Submitted on {new Date(application.created_at).toLocaleDateString()}</span>
          </div>

          <Separator className="my-4" />

          {/* Admin actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => handleApprove(application)}
              variant="default"
              className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={() => handleReject(application)}
              variant="destructive"
              className="flex-1">
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailsApplication;
