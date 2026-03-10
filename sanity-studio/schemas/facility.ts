import { defineField, defineType } from 'sanity';

export const facilitySchema = defineType({
  name: 'facility',
  title: 'Facility',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Facility name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Feature bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'note',
      title: 'Operator note',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      type: 'string',
      initialValue: '#d4af37',
    }),
    defineField({
      name: 'gradient',
      title: 'Card gradient',
      type: 'string',
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
      title: 'name',
      subtitle: 'shortDescription',
    },
  },
});
