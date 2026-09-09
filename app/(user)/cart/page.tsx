import CartPage from '@/components/shared/Cart';
import { FC, Suspense } from 'react';

const Cart: FC = () => {
  return (
    <Suspense>
      <CartPage />
    </Suspense>
  );
};

export default Cart;
