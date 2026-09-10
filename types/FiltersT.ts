export interface FiltersT {
  search: string;
  category: string;
  status: string;
}
export interface FiltersProductT extends Omit<FiltersT, 'status'> {
  availability: string;
}

export interface FiltersMenuT {
  search: string;
  categories: string[];
  priceRange: [number, number];
  availability: [boolean, boolean];
  brand: string[];
  sortBy: 'Price: Low to High' | 'Price: High to Low' | 'Rating';
}
export interface FilterOrdersT extends Omit<FiltersT, 'category'> {}
