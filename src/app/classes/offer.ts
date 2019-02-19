import {UserView} from './userView';
import {Category} from './category';

export class Offer {
  id: string;
  bookTitle: string;
  bookReleaseYear: string;
  bookPublisher: string;
  offerName: string;
  offerOwner: UserView;
  expires: string;
  active: boolean;
  city: string;
  voivodeship: string;
  fileId: string;
  category: Category;
  description: string;
}
