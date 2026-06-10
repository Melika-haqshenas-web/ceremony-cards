import type { Template } from './types';

/**
 * The card template catalogue. In a real app this would come from a CMS
 * or database; keeping it as typed data makes the demo deterministic and
 * the build fully static. `id` keys into messages.templates.<id>.
 */
export const templates: Template[] = [
  {
    id: 'rosewood',
    category: 'wedding',
    price: 29,
    image:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#ffc9dd',
    accentTo: '#bfa6ff',
    popular: true,
    rating: 4.9,
  },
  {
    id: 'blossom-veil',
    category: 'wedding',
    price: 27,
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#ffe4ee',
    accentTo: '#d8c9ff',
    rating: 4.8,
  },
  {
    id: 'confetti-pop',
    category: 'birthday',
    price: 19,
    image:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#fff6cf',
    accentTo: '#ffc9dd',
    popular: true,
    rating: 4.9,
  },
  {
    id: 'golden-hour',
    category: 'birthday',
    price: 22,
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#ffeb9e',
    accentTo: '#ffa6c6',
    rating: 4.7,
  },
  {
    id: 'serene-lily',
    category: 'funeral',
    price: 24,
    image:
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#d8f6e8',
    accentTo: '#ece4ff',
    rating: 4.9,
  },
  {
    id: 'eternal-peace',
    category: 'funeral',
    price: 24,
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#ece4ff',
    accentTo: '#d8f6e8',
    rating: 4.8,
  },
  {
    id: 'neon-bloom',
    category: 'party',
    price: 21,
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#bfa6ff',
    accentTo: '#84dcb7',
    popular: true,
    rating: 4.8,
  },
  {
    id: 'garden-soiree',
    category: 'party',
    price: 23,
    image:
      'https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#d8f6e8',
    accentTo: '#ffc9dd',
    rating: 4.7,
  },
  {
    id: 'little-petal',
    category: 'baby',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#ffe4ee',
    accentTo: '#fff6cf',
    rating: 4.9,
  },
  {
    id: 'laurel',
    category: 'graduation',
    price: 22,
    image:
      'https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1000&q=70',
    accentFrom: '#ffeb9e',
    accentTo: '#bfa6ff',
    rating: 4.8,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter((t) => t.category === category);
}

export function getPopularTemplates(limit = 6): Template[] {
  return templates.filter((t) => t.popular).slice(0, limit);
}

export function getRelatedTemplates(template: Template, limit = 3): Template[] {
  return templates
    .filter((t) => t.category === template.category && t.id !== template.id)
    .concat(templates.filter((t) => t.category !== template.category))
    .slice(0, limit);
}
