class Pages {
  HOME = '/';
  ORDERS = '/orders';
  MENU = '/menu';

  FAQ = '/#faq';
  HOW_IT_WORKS = '/#how-it-works';
  HERO = '/#hero';
  ABOUT = '/#about';
  CONTACT = '/#footer';

  TERMS = '/terms';
  PRIVACY_POLICY = '/privacy-policy';

  ORDERS_SELLER = '/orders-seller';
  PRODUCTS = '/products';
  SETTINGS = '/settings';

  ADMIN_ORDERS = '/admin/orders';
  ADMIN_PRODUCTS = '/admin/products';
  ADMIN_SETTINGS = '/admin/settings';
  CUSTOMERS = '/admin/customers';
  APPLICATION = '/admin/applications';
  WITHDRAWAL = '/admin/withdrawal';
  ADMIN_DASHBOARD = '/admin/dashboard';

  CHECKOUT_SUCCESS = '/checkout/success';

  LOGIN = '/login';
  REGISTER = '/register';
  CALLBACK_GOOGLE = '/callback/google';
  CALLBACK_X = '/callback/x';

  DASHBOARD = '/dashboard';
  WISHLIST = '/wishlist';
  BALANCE = '/balance';

  PRODUCT(id: string) {
    return `/product/${id}`;
  }
  PROFILE_ID(id: string) {
    return `/profile/${id}`;
  }
  PROFILE = '/profile';
  CART = '/cart';
}
export const PAGES = new Pages();
