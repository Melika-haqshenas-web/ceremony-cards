/**
 * Live, animated invitation experiences (the "Atelier des Animés").
 *
 * Unlike `templates.ts` — which powers the static product catalogue — each
 * entry here is a full, self-contained invitation *experience*: a wax-seal
 * envelope that opens, a long romantic scroll, a live countdown. The data is
 * deliberately content-rich (it is the invitation, not a product blurb) and
 * locale-agnostic enough to be swapped later. The first one, `wildflower`,
 * recreates the watercolour pressed-flower invitation from the reference.
 */

import { getTemplate } from './templates';
import type { CategoryId, Template } from './types';

export interface ScheduleStop {
  /** Clock label, e.g. "16:30". */
  time: string;
  title: string;
  detail?: string;
}

export interface DetailCard {
  title: string;
  body: string;
  meta?: string;
}

export type InviteTheme = 'wildflower';

export interface Invitation {
  id: string;
  theme: InviteTheme;

  /**
   * `true` for invitations *derived* from a product template (see
   * `buildDefaultInvitation`). It tells the renderer to recolour the
   * experience from `paletteFrom`/`paletteTo`; curated invitations leave it
   * undefined so they keep their hand-tuned palette unchanged.
   */
  themed?: boolean;

  /** Couple. `initials` drives the closing wax seal, e.g. "M&J". */
  partnerA: string;
  partnerB: string;
  initials: string;

  /** Short line under the cover names. */
  coverKicker: string;

  /** Welcome section. */
  welcomeTitle: string;
  welcomeBody: string;

  /** Headline event. */
  eventName: string;
  /** Human date shown on the page, e.g. "Saturday · 12 June 2027". */
  dateLabel: string;
  /** ISO timestamp the live countdown ticks toward. */
  countdownTo: string;

  venueName: string;
  venueAddress: string;

  /** "The Weekend" timeline. */
  schedule: ScheduleStop[];

  /** Logistics / menu / hotel cards. */
  details: DetailCard[];

  /** Final line above the closing seal. */
  closingNote: string;

  /** Card-listing metadata for the Atelier grid. */
  styleLabel: string;
  paletteFrom: string;
  paletteTo: string;
}

export const invitations: Invitation[] = [
  {
    id: 'wildflower',
    theme: 'wildflower',
    partnerA: 'Martina',
    partnerB: 'Javier',
    initials: 'M&J',
    coverKicker: 'Together with their families',
    welcomeTitle: 'Welcome',
    welcomeBody:
      'With hearts full of joy, we invite you to share in the beginning of our forever. Come wander the wildflowers with us as two lives bloom into one.',
    eventName: 'Botanical Oasis',
    dateLabel: 'Saturday · 12 June 2027',
    countdownTo: '2027-06-12T17:00:00',
    venueName: 'Finca Las Glicinas',
    venueAddress: 'Camino de los Almendros 14 · Valldemossa, Mallorca',
    schedule: [
      { time: '17:00', title: 'Ceremony', detail: 'Garden of the old olive grove' },
      { time: '18:00', title: 'Cocktails & Sunset', detail: 'Terrace with sea views' },
      { time: '20:30', title: 'Dinner', detail: 'Under the strung lights' },
      { time: '23:00', title: 'Dancing', detail: 'Until the wildflowers close' },
    ],
    details: [
      {
        title: 'Wild Boho Menu',
        body: 'A long farm table of Mediterranean small plates, garden herbs and stone-fruit, finished with an almond & honey cake.',
        meta: 'Dietary needs? Tell us in your RSVP.',
      },
      {
        title: 'Hotel Booking',
        body: 'A block of rooms is held under "Martina & Javier" at Hotel Valldemossa until 1 May 2027.',
        meta: 'Use code MJ-2027',
      },
      {
        title: 'Shuttle Service',
        body: 'A shuttle departs the town square at 16:15 and returns guests after midnight, every 45 minutes.',
        meta: 'Plaça de la Vila',
      },
    ],
    closingNote: 'We cannot wait to celebrate with you',
    styleLabel: 'Watercolour · Wildflower',
    paletteFrom: '#f6c9d6',
    paletteTo: '#cde3c4',
  },
];

/* ------------------------------------------------------------------ *
 *  Default, template-derived invitations
 * ------------------------------------------------------------------ *
 * Every product template can be *previewed live* without hand-authoring a
 * full invitation: `buildDefaultInvitation` turns a `Template` into a
 * complete `Invitation`, pulling category-appropriate sample copy from
 * `categoryDefaults` and the card's own gradient as the palette. This keeps
 * the data DRY — any new template gets a live preview for free.            */

/** Shared sample date the live countdown ticks toward (kept deterministic). */
const DEFAULT_DATE_LABEL = 'Saturday · 12 June 2027';
const DEFAULT_COUNTDOWN = '2027-06-12T17:00:00';

/** The category-specific content of a derived invitation. */
type CategoryContent = Omit<
  Invitation,
  'id' | 'theme' | 'themed' | 'paletteFrom' | 'paletteTo' | 'dateLabel' | 'countdownTo'
>;

/**
 * Sample copy per ceremony category. This is intentionally evocative
 * placeholder content — it shows off the animated card; real text is
 * personalised after purchase. `partnerB` is optional: single-subject events
 * (a birthday, a memorial) leave it empty and the renderer drops the "&".
 */
function categoryDefaults(category: CategoryId): CategoryContent {
  switch (category) {
    case 'wedding':
      return {
        partnerA: 'Martina',
        partnerB: 'Javier',
        initials: 'M&J',
        coverKicker: 'Together with their families',
        welcomeTitle: 'Welcome',
        welcomeBody:
          'With hearts full of joy, we invite you to share in the beginning of our forever. Come wander the wildflowers with us as two lives bloom into one.',
        eventName: 'The Celebration',
        venueName: 'Finca Las Glicinas',
        venueAddress: 'Camino de los Almendros 14 · Valldemossa, Mallorca',
        schedule: [
          { time: '17:00', title: 'Ceremony', detail: 'Garden of the old olive grove' },
          { time: '18:00', title: 'Cocktails & Sunset', detail: 'Terrace with sea views' },
          { time: '20:30', title: 'Dinner', detail: 'Under the strung lights' },
          { time: '23:00', title: 'Dancing', detail: 'Until the flowers close' },
        ],
        details: [
          { title: 'The Menu', body: 'A long farm table of Mediterranean small plates, garden herbs and stone-fruit.', meta: 'Dietary needs? Tell us in your RSVP.' },
          { title: 'Stay Over', body: 'A block of rooms is held under our names at the village hotel.', meta: 'Use code MJ-2027' },
          { title: 'Getting There', body: 'A shuttle departs the town square and returns guests after midnight.', meta: 'Plaça de la Vila' },
        ],
        closingNote: 'We cannot wait to celebrate with you',
        styleLabel: 'Live wedding invitation',
      };

    case 'birthday':
      return {
        partnerA: 'Sophia',
        partnerB: '',
        initials: 'S',
        coverKicker: "You're invited to celebrate",
        welcomeTitle: "Let's Celebrate",
        welcomeBody:
          'Another trip around the sun deserves cake, confetti and the people I love most. Come help me make this birthday one to remember.',
        eventName: 'Sophia Turns Thirty',
        venueName: 'The Rooftop Garden',
        venueAddress: '12 Rue des Lilas · Le Marais, Paris',
        schedule: [
          { time: '19:00', title: 'Arrivals', detail: 'Welcome spritz on the terrace' },
          { time: '20:00', title: 'The Toast', detail: 'A few words, a lot of bubbles' },
          { time: '21:00', title: 'Cake & Confetti', detail: 'Make a wish' },
          { time: '22:00', title: 'Dancing', detail: 'Until the city sleeps' },
        ],
        details: [
          { title: 'Dress Code', body: 'Festive and a little bit sparkly — wear something that makes you smile.', meta: 'Glitter encouraged' },
          { title: 'Gifts', body: 'Your presence is the only present — but a good bottle never hurts.', meta: 'No obligations' },
          { title: 'Good to Know', body: 'Street parking is easy after 19:00, or the metro stops two doors down.', meta: 'Line 8 · Saint-Sébastien' },
        ],
        closingNote: 'Come make memories with me',
        styleLabel: 'Live birthday invitation',
      };

    case 'funeral':
      return {
        partnerA: 'Eleanor Hayes',
        partnerB: '',
        initials: 'E',
        coverKicker: 'In loving memory',
        welcomeTitle: 'Remembering',
        welcomeBody:
          'With grateful hearts for a life beautifully lived, we invite you to gather, to remember, and to celebrate the gentle soul who touched us all.',
        eventName: 'A Celebration of Life',
        venueName: 'The Old Chapel',
        venueAddress: 'Greenfield Lane · Willowmere',
        schedule: [
          { time: '14:00', title: 'Gathering', detail: 'A quiet welcome with tea' },
          { time: '14:30', title: 'The Service', detail: 'A time of remembrance' },
          { time: '15:15', title: 'Reflections', detail: 'Stories shared by those who loved her' },
          { time: '16:00', title: 'Reception', detail: 'Stay a while in the garden' },
        ],
        details: [
          { title: 'Flowers', body: 'In lieu of flowers, the family welcomes donations to a cause close to her heart.', meta: 'Details at the service' },
          { title: 'Parking', body: 'Ample parking is available beside the chapel, with assistance on hand.', meta: 'Greenfield Lane' },
          { title: 'A Note', body: 'Soft colours are welcome; come simply as you are, with your memories.', meta: 'All are welcome' },
        ],
        closingNote: 'Forever in our hearts',
        styleLabel: 'Live memorial invitation',
      };

    case 'party':
      return {
        partnerA: 'The Soirée',
        partnerB: '',
        initials: '✦',
        coverKicker: "You're on the list",
        welcomeTitle: 'Join the Night',
        welcomeBody:
          'Lights low, music high, and good company all around. Clear your evening — this is the one you will not want to miss.',
        eventName: 'Midnight Soirée',
        venueName: 'The Glasshouse',
        venueAddress: '8 Harbour Walk · Lisbon',
        schedule: [
          { time: '21:00', title: 'Doors Open', detail: 'Signature cocktails on arrival' },
          { time: '22:00', title: 'The Set', detail: 'Live DJ takes the floor' },
          { time: '23:30', title: 'Midnight Moment', detail: 'A toast under the lights' },
          { time: '02:00', title: 'After Hours', detail: 'For the night owls' },
        ],
        details: [
          { title: 'Dress Code', body: 'Statement pieces and bold colour. Come to be seen.', meta: 'After-dark glamour' },
          { title: 'Entry', body: 'Bring this invitation — it is your key at the door.', meta: 'Strictly guestlist' },
          { title: 'Getting Home', body: 'Taxis queue on the harbour side until late; rideshare drop-off out front.', meta: 'Harbour Walk' },
        ],
        closingNote: 'See you on the dance floor',
        styleLabel: 'Live party invitation',
      };

    case 'baby':
      return {
        partnerA: 'Baby Olsen',
        partnerB: '',
        initials: 'O',
        coverKicker: 'A little one is on the way',
        welcomeTitle: 'Welcome, Little One',
        welcomeBody:
          'A tiny pair of shoes, a whole lot of love. Join us as we shower the soon-to-be parents with warmth, well-wishes and a little sweetness.',
        eventName: 'Baby Shower',
        venueName: 'The Garden Room',
        venueAddress: '24 Meadow Close · Cotswolds',
        schedule: [
          { time: '11:00', title: 'Brunch', detail: 'Pastries and fresh juices' },
          { time: '12:00', title: 'Games', detail: 'Gentle fun for everyone' },
          { time: '13:00', title: 'Gifts', detail: 'Unwrapping the little treasures' },
          { time: '14:00', title: 'Sweet Table', detail: 'Cake and good company' },
        ],
        details: [
          { title: 'The Registry', body: 'A small wish list is available, but your love is gift enough.', meta: 'Ask the hosts' },
          { title: 'Colours', body: 'Think soft and sunny — pastels of every shade are perfect.', meta: 'Come as you are' },
          { title: 'RSVP', body: 'Let us know you are coming so we can save you a seat at the table.', meta: 'By 1 June' },
        ],
        closingNote: 'We cannot wait to meet them',
        styleLabel: 'Live baby-shower invitation',
      };

    case 'graduation':
      return {
        partnerA: 'Ava',
        partnerB: '',
        initials: 'A',
        coverKicker: 'The tassel was worth the hassle',
        welcomeTitle: 'We Did It',
        welcomeBody:
          'Years of early mornings and late nights have led to this moment. Come celebrate the cap toss, the milestone, and everything that comes next.',
        eventName: 'Graduation Celebration',
        venueName: 'The Quad Lawn',
        venueAddress: 'University Avenue · Greenwood',
        schedule: [
          { time: '16:00', title: 'Gather', detail: 'Photos by the old oak' },
          { time: '16:30', title: 'The Toast', detail: 'To everything we earned' },
          { time: '17:30', title: 'Dinner', detail: 'A feast on the lawn' },
          { time: '19:00', title: 'Celebrate', detail: 'Music and the cap toss' },
        ],
        details: [
          { title: 'Parking', body: 'Visitor lots open all afternoon, a short walk from the lawn.', meta: 'Lot C' },
          { title: 'Dress Code', body: 'Smart-casual and ready for photos — the lawn can be soft underfoot.', meta: 'Flat shoes wise' },
          { title: 'Gifts', body: 'Your presence means the most; cards can be left at the welcome table.', meta: 'No obligations' },
        ],
        closingNote: 'On to the next chapter',
        styleLabel: 'Live graduation invitation',
      };
  }
}

/**
 * Build a complete, recolourable live invitation from any product template.
 * The id matches the template id, so `/invite/<templateId>` resolves here.
 */
export function buildDefaultInvitation(template: Template): Invitation {
  return {
    id: template.id,
    theme: 'wildflower',
    themed: true,
    paletteFrom: template.accentFrom,
    paletteTo: template.accentTo,
    dateLabel: DEFAULT_DATE_LABEL,
    countdownTo: DEFAULT_COUNTDOWN,
    ...categoryDefaults(template.category),
  };
}

/**
 * Resolve an invitation by id: a hand-curated experience wins, otherwise we
 * derive a default from the matching product template, otherwise `undefined`.
 */
export function getInvitation(id: string): Invitation | undefined {
  const curated = invitations.find((i) => i.id === id);
  if (curated) return curated;

  const template = getTemplate(id);
  return template ? buildDefaultInvitation(template) : undefined;
}
