'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  /** Locale-aware internal path (e.g. "/cards"). Renders next-intl <Link>. */
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The one button to rule them all. Renders a locale-aware <Link> when an
 * `href` is provided, otherwise a native <button>. Shares the pill/glow
 * styling defined in globals.css so CTAs feel consistent everywhere.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', className, children, ...rest }, ref) {
    const classes = cn(
      variant === 'primary' ? 'btn-primary' : 'btn-ghost',
      'group',
      className,
    );

    if ('href' in rest && rest.href) {
      return (
        <Link href={rest.href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
