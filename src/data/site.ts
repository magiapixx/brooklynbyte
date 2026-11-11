import type { ImageMetadata } from 'astro';
import data from './site.json';

const contactEmail = 'hello@brooklynbyte.com';

export const SITE = {
  name: 'Brooklynbyte',
  url: 'https://brooklynbyte.studio',
  email: contactEmail,
  emailHref: `mailto:${contactEmail}`,
  address: ['214 Wythe Ave', 'Brooklyn, NY 11249'],
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About us', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
  ],
};

export const { services, clients, team } = data;

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.webp', { eager: true });
export function img(name: string): ImageMetadata {
  const f = files[`../assets/images/${name}.webp`];
  if (!f) throw new Error(`Image not found: ${name}`);
  return f.default;
}
