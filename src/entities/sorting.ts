import type { SortingOptionValue } from '@src/const';

export type SortingOption =
  (typeof SortingOptionValue)[keyof typeof SortingOptionValue];

export type SortingConfig = {
  title: string;
  value: SortingOption;
};

export type Sorting = SortingConfig[];
