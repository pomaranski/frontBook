import {Offer} from './offer';

class Sorted {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export class Page {
  content: Array<Offer>;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: string;
  size: string;
  sort: Sorted;
  totalElements: number;
  totalPages: number;
}
