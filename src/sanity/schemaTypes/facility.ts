import { defineField, defineType } from 'sanity';

export const facilitySchema = defineType({
  name: 'facility',
  title: 'Facility',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Facility Name',
      type: 'string',
      description: 'e.g. "Production Office", "Makeup Room", "Generator Backup"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Paste an emoji, e.g. 🎭 💡 🎬',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Detailed description of this facility',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Production', value: 'production' },
          { title: 'Technical', value: 'technical' },
          { title: 'Comfort', value: 'comfort' },
          { title: 'Infrastructure', value: 'infrastructure' },
        ],
      },
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
      title: 'name',
      subtitle: 'category',
    },
  },
});
