export type SortingOption =
  | 'popular'
  | 'price-lth'
  | 'price-htl'
  | 'rating-htl';

export type SortingConfig = {
  title: string;
  value: SortingOption;
};

export type Sorting = SortingConfig[];
