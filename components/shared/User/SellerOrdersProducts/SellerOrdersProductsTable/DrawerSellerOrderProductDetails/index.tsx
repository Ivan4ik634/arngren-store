'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { statusConfig } from '@/configs/STATUS';
import { CartItemT } from '@/types/CartItemT';
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

const MOCK_SHIPPING = {
  country: 'Ukraine',
  region: 'Kyiv Oblast',
  city: 'Kyiv',
  zipCode: '02000',
  address: '12 Khreshchatyk St, Apt 5',
};

// TODO: replace with real cart items fetched by order.id, this is test data
const MOCK_ITEMS: CartItemT[] = [
  {
    id: 'item_1',
    product_id: {
      id: 'prod_1',
      name: 'Wireless Headphones',
      description: 'Noise cancelling over-ear headphones',
      category: 'Electronics',
      price: 129,
      rating: '4.5',
      count: 10,
      brand: 'SoundCore',
      reviews: '230',
      application: true,
      seller: {
        id: 'seller_1',
        avatar: '',
        name: 'John Seller',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        language: 'en',
        email: 'john@example.com',
        role: 'seller',
        created_at: '2024-01-01',
      },
      created_at: '2024-01-01',
      images: [''],
    },
    count: 2,
    price: 129,
    order_id: 'order_1',
    created_at: '2024-01-01',
  },
  {
    id: 'item_2',
    product_id: {
      id: 'prod_2',
      name: 'Smart Watch',
      description: 'Fitness tracking smart watch',
      category: 'Electronics',
      price: 199,
      rating: '4.7',
      count: 5,
      brand: 'FitTrack',
      reviews: '410',
      application: true,
      seller: {
        id: 'seller_2',
        avatar: '',
        name: 'Anna Seller',
        dateOfBirth: '1992-05-10',
        gender: 'female',
        language: 'en',
        email: 'anna@example.com',
        role: 'seller',
        created_at: '2024-01-01',
      },
      created_at: '2024-01-01',
      images: [''],
    },
    count: 1,
    price: 199,
    order_id: 'order_1',
    created_at: '2024-01-01',
  },
];
interface Props {
  order: OrderWithUserT;
}

const DrawerSellerOrderProductDetails: FC<Props> = (props) => {
  const { order } = props;
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
          {/* Order ID + status */}
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
                <p className="text-sm font-medium">{MOCK_SHIPPING.country}</p>
              </div>
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Region / City</span>
                </div>
                <p className="text-sm font-medium">
                  {MOCK_SHIPPING.region}, {MOCK_SHIPPING.city}
                </p>
              </div>
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Zip Code</span>
                </div>
                <p className="text-sm font-medium">{MOCK_SHIPPING.zipCode}</p>
              </div>
              <div className="rounded-xl border p-4">
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Address</span>
                </div>
                <p className="text-sm font-medium">{MOCK_SHIPPING.address}</p>
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
              {MOCK_ITEMS.map((item) => (
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

          <Separator className="my-4" />

          {/* Admin actions */}
          <div className="flex gap-3">
            <Button variant="default" className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button variant="destructive" className="flex-1">
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSellerOrderProductDetails;
