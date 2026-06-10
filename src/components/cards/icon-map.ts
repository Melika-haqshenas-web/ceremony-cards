import {
  Heart,
  Cake,
  PartyPopper,
  Flower2,
  Baby,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps the `icon` string stored on each category to its lucide-react
 * component. Keeping data as strings (not imported components) lets the
 * data layer stay a plain, serialisable module.
 */
export const iconMap: Record<string, LucideIcon> = {
  Heart,
  Cake,
  PartyPopper,
  Flower2,
  Baby,
  GraduationCap,
};
