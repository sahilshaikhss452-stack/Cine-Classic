import { defineField, defineType } from 'sanity';

export const studioAreaSchema = defineType({
  name: 'studioArea',
  title: 'Studio area',
  type: 'object',
  fields: [
    defineField({
      name: 'areaName',
      title: 'Area name',
      type: 'string',
      description: 'Examples: Courtyard, Kitchen, Main Floor, Entry Lane.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Optional note to help clients understand this part of the set.',
    }),
    defineField({
      name: 'images',
      title: 'Area images',
      type: 'array',
      of: [{ type: 'studioAreaImage' }],
      description: 'Upload the scouting images that belong to this area.',
    }),
  ],
  preview: {
    select: {
      title: 'areaName',
      subtitle: 'shortDescription',
      media: 'images.0.image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled area',
        subtitle: selection.subtitle || 'No description',
        media: selection.media,
      };
    },
  },
});
