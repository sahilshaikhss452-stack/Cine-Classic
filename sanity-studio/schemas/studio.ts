import { defineField, defineType } from 'sanity';

export const studioSchema = defineType({
  name: 'studio',
  title: 'Studio Set',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Studio Name',
      type: 'string',
      description: 'e.g. "Market 1 Set", "Court Set"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Auto-generated from name. Used in the URL: /studios/[slug]',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short description shown on cards, e.g. "Authentic Bazaar Experience"',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 4,
      description: 'Shown on the studio landing page',
    }),
    defineField({
      name: 'size',
      title: 'Size (sq ft)',
      type: 'number',
      description: 'Floor area in square feet',
    }),
    defineField({
      name: 'height',
      title: 'Ceiling Height (ft)',
      type: 'number',
    }),
    defineField({
      name: 'powerCapacity',
      title: 'Power Capacity',
      type: 'string',
      description: 'e.g. "200A 3-phase"',
    }),
    defineField({
      name: 'ratePerDay',
      title: 'Day Rate (₹)',
      type: 'number',
      description: 'Price per day in Indian Rupees',
    }),
    defineField({
      name: 'ratePerShift',
      title: 'Per-Shift Rate (₹)',
      type: 'number',
      description: 'Price per 12-hour shift in Indian Rupees',
    }),
    defineField({
      name: 'parking',
      title: 'Parking Capacity',
      type: 'string',
      description: 'e.g. "50 vehicles"',
    }),
    defineField({
      name: 'suitable_for',
      title: 'Suitable For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. ["Bollywood Films", "TV Commercials", "Web Series"]',
    }),
    defineField({
      name: 'facilities',
      title: 'Key Facilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. ["Air Conditioning", "Makeup Room", "Generator Backup"]',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main banner image (recommend 1920×1080)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Up to 6 gallery photos',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first',
      initialValue: 99,
    }),

    // ── Set Deck ──────────────────────────────────────────────────────────────
    defineField({
      name: 'setPDF',
      title: 'Set Deck PDF',
      type: 'file',
      description:
        'Upload a pre-made PDF brochure for this studio. When uploaded, the "Download Set Deck" button links directly to this file. If left empty, a PDF is auto-generated from the set data.',
      options: { accept: '.pdf' },
    }),

    // ── Set Layout ────────────────────────────────────────────────────────────
    defineField({
      name: 'setLayoutImage',
      title: 'Set Layout / Floor Plan Image',
      type: 'image',
      description:
        'Upload a floor plan, annotated layout diagram, or overhead sketch of the set. Shown in the "Set Layout" section on the landing page. Recommended: 1600×900.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'setLayoutDescription',
      title: 'Set Layout Description',
      type: 'text',
      rows: 3,
      description:
        'Brief description of the set layout — shooting zones, key areas, recommended camera positions. 2–4 sentences. Displayed below the layout image on the landing page.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
});
