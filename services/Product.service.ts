import { supabase } from '@/lib/supabase/client';
import { FiltersMenuT, FiltersProductT } from '@/types/FiltersT';
import { ProductCreateT, ProductT, ProductUpdateT } from '@/types/ProductT';

export const productService = {
  async addProduct(data: ProductCreateT) {
    const res = await supabase
      .from('products')
      .insert({ ...data })
      .select()
      .single();
    return res;
  },

  async getUserProducts(id: string, filters?: FiltersProductT): Promise<ProductT[] | null> {
    let query = supabase.from('products').select('*').eq('seller', id);
    if (filters?.search) {
      query = query.ilike('name', `%${filters?.search}%`);
    }

    if (filters?.category && filters?.category !== 'all') {
      query = query.eq('category', filters?.category);
    }

    if (filters?.availability === 'in-stock') {
      query = query.gt('count', 0);
    }

    if (filters?.availability === 'out-of-stock') {
      query = query.eq('count', 0);
    }

    const res = await query;
    return res.data;
  },
  async getProducts(filters?: FiltersProductT): Promise<any> {
    let query = supabase.from('products').select(
      `
      id,
      name,
      category,
      brand,
      price,
      images,
      count,
      seller(id, name, avatar, email),
      created_at
    `,
    );

    if (filters?.search) {
      query = query.ilike('name', `%${filters?.search}%`);
    }

    if (filters?.category && filters?.category !== 'all') {
      query = query.eq('category', filters?.category);
    }

    if (filters?.availability === 'in-stock') {
      query = query.gt('count', 0);
    }

    if (filters?.availability === 'out-of-stock') {
      query = query.eq('count', 0);
    }

    return await query;
  },
  async getProductsMenu(filters: FiltersMenuT): Promise<any> {
    let query = supabase
      .from('products')
      .select(
        `
      id,
      name,
      category,
      brand,
      price,
      images,
      count,
      rating,
      seller(id, name, avatar, email),
      created_at
    `,
      )
      .eq('application', true);

    // Search
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    // Categories
    if (!filters.categories.includes('all')) {
      query = query.in('category', filters.categories);
    }

    // Brand
    if (filters.brand.length > 0) {
      query = query.in('brand', filters.brand);
    }

    // Price
    query = query
      .gte('price', filters.priceRange[0] * 500)
      .lte('price', filters.priceRange[1] * 500);

    // Availability
    const [inStock, outOfStock] = filters.availability;

    if (inStock && !outOfStock) {
      query = query.gt('count', 0);
    }

    if (!inStock && outOfStock) {
      query = query.eq('count', 0);
    }

    // Sort
    if (filters.sortBy === 'Price: Low to High') {
      query = query.order('price', { ascending: true });
    }

    if (filters.sortBy === 'Price: High to Low') {
      query = query.order('price', { ascending: false });
    }

    if (filters.sortBy === 'Rating') {
      query = query.order('rating', { ascending: false });
    }

    return await query;
  },
  async getProduct(id: string): Promise<ProductT> {
    let query = await supabase
      .from('products')
      .select(
        `
      id,
      name,
      category,
      brand,
      price,
      images,
      count,
      seller(id, name, avatar, email),
      created_at
    `,
      )
      .eq('application', true)
      .eq('id', id)
      .single();

    return query as any as ProductT;
  },
  async editProduct(data: ProductUpdateT) {
    const res = await supabase
      .from('products')
      .update({ ...data })
      .eq('id', data.id);
    return res;
  },
};
