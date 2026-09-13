'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { statusConfig } from '@/configs/STATUS';
import { orderService } from '@/services/Order.service';
import { CartItemWithOrderT } from '@/types/CartItemT';
import { OrderWithUserT } from '@/types/OrderT';
import {
  Calendar,
  CheckCircle2,
  Eye,
  Globe,
  Hash,
  Mail,
  MapPin,
  Package,
  User,
  XCircle,
} from 'lucide-react';
import { FC } from 'react';

interface Props {
  order: OrderWithUserT;
  cartItem: CartItemWithOrderT;
}

const DrawerSellerOrderProductDetails: FC<Props> = (props) => {
  const { order, cartItem } = props;
  const user = order.user_id;
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  const handleAccept = async () => {
    await orderService.updateOrder(order.id, { status: 'in_shipping' });
  };

  const handleReject = async () => {
    await orderService.updateOrder(order.id, { status: 'cancelled' });
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Eye />
      </DrawerTrigger>
      <DrawerContent className="w-[700px]">
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Hash className="h-3 w-3" />
              <span>{order.order_id}</span>
            </div>
            <Badge className={status.className}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
          </div>

          <div className="mb-6 flex  rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Shipping Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Country</span>
                </div>
                <p className="text-sm font-medium">{order.country}</p>
              </div>
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>City</span>
                </div>
                <p className="text-sm font-medium">{order.city}</p>
              </div>
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Postal Code</span>
                </div>
                <p className="text-sm font-medium">{order.postal_code}</p>
              </div>
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Address</span>
                </div>
                <p className="text-sm font-medium">{order.address}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-1 text-sm font-semibold text-muted-foreground">
              <Package className="h-3.5 w-3.5" />
              Items (1)
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border p-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={cartItem.product_id.images?.[0]}
                    alt={cartItem.product_id.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{cartItem.product_id.name}</p>
                  <p className="text-xs text-muted-foreground">{cartItem.product_id.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${cartItem.price}</p>
                  <p className="text-xs text-muted-foreground">x{cartItem.count}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Placed on {new Date(order.created_at).toLocaleDateString()}</span>
          </div>

          <Separator className="my-4" />

          <div className="flex gap-3">
            <Button
              onClick={handleAccept}
              variant="default"
              className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Accept Order
            </Button>
            <Button onClick={handleReject} variant="destructive" className="flex-1">
              <XCircle className="mr-2 h-4 w-4" />
              Reject Order
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSellerOrderProductDetails;
