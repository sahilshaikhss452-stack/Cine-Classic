import { defineField, defineType } from 'sanity';

export const studioAreaImageSchema = defineType({
  name: 'studioAreaImage',
  title: 'Studio area image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Short accessibility description for this image.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional scouting note shown on the studio page.',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'caption',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Studio image',
        subtitle: selection.subtitle || 'No caption',
        media: selection.media,
      };
    },
  },
});
