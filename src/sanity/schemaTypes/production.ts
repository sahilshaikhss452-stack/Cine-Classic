import { defineField, defineType } from 'sanity';

export const productionSchema = defineType({
  name: 'production',
  title: 'Production (Film / Show)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the film, show, or advertisement',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Film', value: 'Film' },
          { title: 'TV Series', value: 'TV Series' },
          { title: 'Web Series', value: 'Web Series' },
          { title: 'Advertisement', value: 'Advertisement' },
          { title: 'Music Video', value: 'Music Video' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Year of release or production',
      validation: (Rule) => Rule.min(1990).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: 'network',
      title: 'Network / Platform',
      type: 'string',
      description: 'e.g. "Netflix", "Amazon Prime", "Star Plus"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief synopsis or notes for the portfolio modal',
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Production poster or still (recommend 400×600 portrait)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Production?',
      type: 'boolean',
      description: 'Show as the spotlight feature on the portfolio page',
      initialValue: false,
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
      title: 'title',
      subtitle: 'type',
      media: 'posterImage',
    },
  },
});
