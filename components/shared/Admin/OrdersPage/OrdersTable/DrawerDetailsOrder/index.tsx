'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { statusConfig } from '@/configs/STATUS';
import { cartItemService } from '@/services/CartItem.service';
import { OrderWithUserT } from '@/types/OrderT';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Eye, Globe, Hash, Mail, MapPin, Package, User } from 'lucide-react';
import { FC } from 'react';

interface Props {
  order: OrderWithUserT;
  handleDelete: (id: string) => void;
}

const DrawerDetailsOrder: FC<Props> = (props) => {
  const { order, handleDelete } = props;
  const { data: products } = useQuery({
    queryKey: ['cartItem', order.id],
    queryFn: () => cartItemService.getItemsByOrderId(order?.id || ''),
    enabled: !!order.id,
  });
  const user = order.user_id;
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

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

          {/* Customer */}
          <div className="mb-6 flex items-center justify-between rounded-xl border p-4">
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
            <Badge variant="outline">{user.role}</Badge>
          </div>

          <Separator className="my-4" />

          {/* Shipping info (mock) */}
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

          {/* Order items */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-1 text-sm font-semibold text-muted-foreground">
              <Package className="h-3.5 w-3.5" />
              Items ({order.items_length})
            </h3>
            <div className="flex flex-col gap-3">
              {products?.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl border p-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={item.product_id.images?.[0]}
                      alt={item.product_id.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product_id.name}</p>
                    <p className="text-xs text-muted-foreground">{item.product_id.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${item.price}</p>
                    <p className="text-xs text-muted-foreground">x{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Total */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold">${order.total}</span>
          </div>

          {/* Meta */}
          <div className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Placed on {new Date(order.created_at).toLocaleDateString()}</span>
          </div>
          <div className="mt-3">
            <Button className="w-full" onClick={() => handleDelete(order.id)}>
              Delete
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailsOrder;
