import { defineField, defineType } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Full name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "Director of Photography"',
    }),
    defineField({
      name: 'productionHouse',
      title: 'Production House',
      type: 'string',
      description: 'e.g. "Dharma Productions", "Netflix India"',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      description: 'What they said about Cine Classic Studios',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      description: 'Headshot or profile photo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'productionHouse',
      media: 'image',
    },
  },
});
