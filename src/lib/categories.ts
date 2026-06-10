import type { Category } from './types';

/**
 * The ceremony categories shown on the home page and used to filter
 * the catalogue. Order here is the display order.
 */
export const categories: Category[] = [
  {
    id: 'wedding',
    icon: 'Heart',
    gradient: 'from-blush-200 to-lilac-200',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'birthday',
    icon: 'Cake',
    gradient: 'from-butter-200 to-blush-200',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'party',
    icon: 'PartyPopper',
    gradient: 'from-lilac-200 to-mint-200',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'funeral',
    icon: 'Flower2',
    gradient: 'from-mint-100 to-lilac-100',
    image:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'baby',
    icon: 'Baby',
    gradient: 'from-blush-100 to-butter-100',
    image:
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 'graduation',
    icon: 'GraduationCap',
    gradient: 'from-lilac-200 to-blush-200',
    image:
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=70',
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
