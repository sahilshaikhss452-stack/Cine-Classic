import { defineField, defineType } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Primary phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'Use international format without +, for example 919876543210.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Primary email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'hoursText',
      title: 'Opening hours text',
      type: 'string',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address line 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address line 2',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region / state',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal code',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country code',
      type: 'string',
      initialValue: 'IN',
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'mapsEmbedUrl',
      title: 'Google Maps embed URL',
      type: 'url',
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Google Maps directions URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'featuredClients',
      title: 'Featured clients / platforms',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Used in the homepage trust strip and hero trust line.',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'businessName',
      subtitle: 'email',
      media: 'logo',
    },
  },
});
