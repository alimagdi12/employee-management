import { ISortItem } from '../models/flights/sortItem.model';

export const sortItems: ISortItem[] = [
  {
    title: 'Cheapest',
    price: '',
    currency: '',
    isActive: true,
    sortCode: 1,
    totalDuration: 0,
  },
  {
    title: 'Fastest',
    price: '',
    currency: '',
    isActive: false,
    sortCode: 2,
    totalDuration: 0,
  },
];
