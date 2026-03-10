import { defineField, defineType } from 'sanity';

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero badge',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline (main line)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero highlight (accent line)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero subheadline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero primary CTA',
      type: 'ctaLink',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero secondary CTA',
      type: 'ctaLink',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero stats',
      type: 'array',
      of: [{ type: 'heroStat' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'aboutEyebrow',
      title: 'About eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutSecondaryDescription',
      title: 'About secondary description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'aboutFeatures',
      title: 'About feature bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'aboutBadge',
      title: 'About badge',
      type: 'string',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeadline',
      subtitle: 'heroHighlight',
      media: 'aboutImage',
    },
  },
});
