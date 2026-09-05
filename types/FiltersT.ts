export interface FiltersT {
  search: string;
  category: string;
  status: string;
}
export interface FiltersProductT extends Omit<FiltersT, 'status'> {
  availability: string;
}
