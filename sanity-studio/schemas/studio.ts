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
      title: 'Tagline / Short Description',
      type: 'string',
      description: 'One-line description shown on cards and in the hero, e.g. "Authentic Bazaar Experience"',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 4,
      description: 'Shown on the studio landing page (About section)',
    }),

    // ── Physical Specs ─────────────────────────────────────────────────────────
    defineField({
      name: 'size',
      title: 'Size (sq ft)',
      type: 'number',
      description: 'Floor area in square feet, e.g. 6000',
    }),
    defineField({
      name: 'height',
      title: 'Ceiling Height (ft)',
      type: 'number',
      description: 'Ceiling height in feet, e.g. 20',
    }),
    defineField({
      name: 'capacity',
      title: 'Maximum Crew / Capacity',
      type: 'string',
      description: 'e.g. "Up to 60 people"',
    }),

    // ── Pricing ────────────────────────────────────────────────────────────────
    defineField({
      name: 'rateHourly',
      title: 'Hourly Rate (₹)',
      type: 'number',
      description: 'Price per hour in Indian Rupees (used as the "from" rate). Takes precedence over day rate.',
    }),
    defineField({
      name: 'rateUnit',
      title: 'Rate Unit',
      type: 'string',
      description: 'Unit label shown next to the rate, e.g. "/hour", "/day", "/shift"',
      initialValue: '/hour',
      options: {
        list: [
          { title: 'Per Hour (/hour)', value: '/hour' },
          { title: 'Per Day (/day)', value: '/day' },
          { title: 'Per Shift (/shift)', value: '/shift' },
        ],
      },
    }),
    defineField({
      name: 'ratePerDay',
      title: 'Day Rate (₹)',
      type: 'number',
      description: 'Price per full day in Indian Rupees',
    }),
    defineField({
      name: 'ratePerShift',
      title: 'Per-Shift Rate (₹)',
      type: 'number',
      description: 'Price per 12-hour shift in Indian Rupees',
    }),
    defineField({
      name: 'minBookingHours',
      title: 'Minimum Booking (hours)',
      type: 'number',
      description: 'Minimum booking duration in hours, e.g. 4',
      initialValue: 4,
    }),

    // ── Infrastructure ─────────────────────────────────────────────────────────
    defineField({
      name: 'parking',
      title: 'Parking Capacity',
      type: 'string',
      description: 'e.g. "50 vehicles"',
    }),
    defineField({
      name: 'powerCapacity',
      title: 'Power Capacity',
      type: 'string',
      description: 'e.g. "200A 3-phase"',
    }),

    // ── Brand / Visual Identity ────────────────────────────────────────────────
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Single emoji representing this set, e.g. "🏙️", "⚖️", "🏥"',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color (Hex)',
      type: 'string',
      description: 'Brand accent color for this studio page, e.g. "#d4af37". Used for badges and scanlines.',
      initialValue: '#d4af37',
    }),
    defineField({
      name: 'gradient',
      title: 'Background Gradient (CSS)',
      type: 'string',
      description: 'CSS gradient for use when no real photo is uploaded, e.g. "linear-gradient(135deg, #1a1a2e, #16213e)"',
    }),

    // ── Content ────────────────────────────────────────────────────────────────
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
      name: 'productions',
      title: 'Notable Productions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Productions shot in this studio, used for social proof trust pills, e.g. ["Sacred Games", "Scam 1992"]',
    }),

    // ── Images ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main banner image shown full-screen on the studio page (recommend 1920×1080)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Up to 6 gallery photos (editorial masonry layout)',
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
        'Brief description of the set layout — shooting zones, key areas, recommended camera positions. 2–4 sentences.',
    }),
    defineField({
      name: 'layoutZones',
      title: 'Layout Zone Markers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Zone Label',
              type: 'string',
              description: 'e.g. "Main Street", "Camera A", "Lighting Rig"',
            }),
            defineField({
              name: 'x',
              title: 'X Position (%)',
              type: 'string',
              description: 'Horizontal position as CSS percentage, e.g. "25%"',
            }),
            defineField({
              name: 'y',
              title: 'Y Position (%)',
              type: 'string',
              description: 'Vertical position as CSS percentage, e.g. "40%"',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'x' },
          },
        },
      ],
      description: 'Interactive zone markers overlaid on the floor plan diagram',
    }),

    // ── Listing / Search ──────────────────────────────────────────────────────
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
      description: 'Lower number appears first in listings',
      initialValue: 99,
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
