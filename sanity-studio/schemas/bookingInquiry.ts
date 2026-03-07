import { defineField, defineType } from 'sanity';

export const bookingInquirySchema = defineType({
  name: 'bookingInquiry',
  title: 'Booking Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productionName',
      title: 'Production Company / Brand',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'shootType',
      title: 'Shoot Type',
      type: 'string',
      options: {
        list: [
          'Feature Film',
          'OTT / Web Series',
          'TV Serial',
          'Television Commercial',
          'Music Video',
          'Fashion / Editorial',
          'Documentary',
          'Reality Show',
          'Photoshoot',
          'Product Launch / Corporate',
          'Other',
        ],
      },
    }),
    defineField({
      name: 'studioRequired',
      title: 'Studio Interest',
      type: 'string',
    }),
    defineField({
      name: 'shootDates',
      title: 'Shoot Date (From)',
      type: 'string',
    }),
    defineField({
      name: 'crewSize',
      title: 'Crew Size',
      type: 'string',
    }),
    defineField({
      name: 'package',
      title: 'Duration / Package',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Additional Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
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
      title: 'Received At',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shootType',
      description: 'email',
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title ?? 'Unknown',
        subtitle: `${subtitle ?? ''} · ${description ?? ''}`,
      };
    },
  },
});
