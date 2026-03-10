import { defineField, defineType } from 'sanity';

export const studioSchema = defineType({
  name: 'studio',
  title: 'Studio Set',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Studio name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Legacy gallery images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Optional legacy fallback. Use Studio areas below for new uploads.',
    }),
    defineField({
      name: 'size',
      title: 'Size (sq ft)',
      type: 'number',
    }),
    defineField({
      name: 'height',
      title: 'Ceiling height (ft)',
      type: 'number',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
    }),
    defineField({
      name: 'rateHourly',
      title: 'Hourly rate',
      type: 'number',
    }),
    defineField({
      name: 'rateUnit',
      title: 'Rate unit',
      type: 'string',
      initialValue: '/hour',
      options: {
        list: [
          { title: 'Per hour', value: '/hour' },
          { title: 'Per day', value: '/day' },
          { title: 'Per shift', value: '/shift' },
        ],
      },
    }),
    defineField({
      name: 'ratePerDay',
      title: 'Day rate',
      type: 'number',
    }),
    defineField({
      name: 'ratePerShift',
      title: 'Shift rate',
      type: 'number',
    }),
    defineField({
      name: 'minBookingHours',
      title: 'Minimum booking hours',
      type: 'number',
      initialValue: 4,
    }),
    defineField({
      name: 'parking',
      title: 'Parking',
      type: 'string',
    }),
    defineField({
      name: 'powerCapacity',
      title: 'Power capacity',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      type: 'string',
      initialValue: '#d4af37',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient fallback',
      type: 'string',
    }),
    defineField({
      name: 'suitable_for',
      title: 'Suitable for',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'productions',
      title: 'Notable productions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'setPDF',
      title: 'Set deck PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'setLayoutImage',
      title: 'Layout image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload the layout or floor-plan reference used above the area gallery.',
    }),
    defineField({
      name: 'setLayoutDescription',
      title: 'Layout description',
      type: 'text',
      rows: 3,
      description: 'Optional note that helps clients orient themselves before browsing the areas.',
    }),
    defineField({
      name: 'studioAreas',
      title: 'Studio areas',
      type: 'array',
      of: [{ type: 'studioArea' }],
      description:
        'Create named parts of the set and upload the scouting images for each area.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 999,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
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
