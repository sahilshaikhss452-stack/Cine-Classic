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
      name: 'videoUrl',
      title: 'YouTube / video URL',
      type: 'url',
      description: 'Optional. Used for playable homepage carousels, especially the Music Videos / Ads rail.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured production',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showOnMoviesTvCarousel',
      title: 'Show on Movies / TV homepage carousel',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showOnMusicAdsCarousel',
      title: 'Show on Music Videos / Ads homepage carousel',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showOnHome',
      title: 'Legacy homepage visibility',
      type: 'boolean',
      hidden: true,
      readOnly: true,
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'posterImage',
    },
  },
});
