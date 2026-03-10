import { defineField, defineType } from 'sanity';

export const bookingInquirySchema = defineType({
  name: 'bookingInquiry',
  title: 'Booking Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / brand',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shootType',
      title: 'Shoot type',
      type: 'string',
    }),
    defineField({
      name: 'requestedStudio',
      title: 'Requested studio',
      type: 'string',
    }),
    defineField({
      name: 'preferredDate',
      title: 'Preferred date',
      type: 'string',
    }),
    defineField({
      name: 'crewSize',
      title: 'Crew size',
      type: 'string',
    }),
    defineField({
      name: 'package',
      title: 'Package / duration',
      type: 'string',
    }),
    defineField({
      name: 'projectBrief',
      title: 'Project brief',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source page',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In progress', value: 'in-progress' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'requestedStudio',
      description: 'phone',
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title ?? 'Unknown inquiry',
        subtitle: [subtitle, description].filter(Boolean).join(' · '),
      };
    },
  },
});
