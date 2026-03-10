import { defineField, defineType } from 'sanity';

export const productionSchema = defineType({
  name: 'production',
  title: 'Production',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Film', 'TV Series', 'Web Series', 'Advertisement', 'Music Video'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1990).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: 'network',
      title: 'Network / platform',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured production',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on homepage',
      type: 'boolean',
      initialValue: true,
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'posterImage',
    },
  },
});
