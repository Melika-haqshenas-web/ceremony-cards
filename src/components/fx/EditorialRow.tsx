'use client';

import type { ReactNode } from 'react';
import { RevealText } from './RevealText';
import { Reveal } from './Reveal';

/**
 * The reference's signature layout: a hairline rule, a tiny caption
 * label on the left, and a large statement on the right. The statement
 * uses the kinetic word reveal; everything aligns to a strict baseline.
 */
export function EditorialRow({
  caption,
  statement,
  accentWords,
  children,
}: {
  caption: string;
  statement: string;
  accentWords?: number[];
  children?: ReactNode;
}) {
  return (
    <div className="border-t border-[color:var(--line)] pt-10">
      <div className="grid gap-8 md:grid-cols-[0.32fr_0.68fr] md:gap-12">
        <Reveal>
          <p className="kicker">{caption}</p>
        </Reveal>
        <div>
          <RevealText
            as="h2"
            text={statement}
            accentWords={accentWords}
            className="font-display text-3xl font-light leading-[1.08] text-bone sm:text-4xl md:text-5xl"
          />
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
}
