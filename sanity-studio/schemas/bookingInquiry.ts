import { defineField, defineType } from 'sanity';

const BOOKING_STATUS_OPTIONS = [
  { title: 'New', value: 'new' },
  { title: 'Contacted', value: 'contacted' },
  { title: 'Follow-Up', value: 'follow-up' },
  { title: 'Booked', value: 'booked' },
  { title: 'Closed', value: 'closed' },
] as const;

const BOOKING_STATUS_LABELS = BOOKING_STATUS_OPTIONS.reduce<Record<string, string>>((acc, option) => {
  acc[option.value] = option.title;
  return acc;
}, {});

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
      fieldset: 'lead',
    }),
    defineField({
      name: 'company',
      title: 'Company / brand',
      type: 'string',
      fieldset: 'lead',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      fieldset: 'lead',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'lead',
    }),
    defineField({
      name: 'shootType',
      title: 'Shoot type',
      type: 'string',
      fieldset: 'inquiry',
    }),
    defineField({
      name: 'requestedStudio',
      title: 'Requested studio',
      type: 'string',
      fieldset: 'inquiry',
    }),
    defineField({
      name: 'preferredDate',
      title: 'Preferred date',
      type: 'string',
      fieldset: 'inquiry',
    }),
    defineField({
      name: 'crewSize',
      title: 'Crew size',
      type: 'string',
      fieldset: 'inquiry',
    }),
    defineField({
      name: 'package',
      title: 'Package / duration',
      type: 'string',
      fieldset: 'inquiry',
    }),
    defineField({
      name: 'projectBrief',
      title: 'Project brief',
      type: 'text',
      rows: 4,
      fieldset: 'inquiry',
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source page',
      type: 'string',
      readOnly: true,
      fieldset: 'meta',
    }),
    defineField({
      name: 'status',
      title: 'Lead status',
      type: 'string',
      options: {
        list: BOOKING_STATUS_OPTIONS,
        layout: 'dropdown',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
      fieldset: 'workflow',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal notes',
      type: 'text',
      rows: 6,
      description: 'Team-only notes for follow-ups, call outcomes, and next actions.',
      fieldset: 'workflow',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      readOnly: true,
      fieldset: 'meta',
    }),
  ],
  fieldsets: [
    { name: 'workflow', title: 'Workflow' },
    { name: 'lead', title: 'Lead details', options: { columns: 2 } },
    { name: 'inquiry', title: 'Inquiry details' },
    { name: 'meta', title: 'Metadata' },
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest first',
      name: 'createdAtAsc',
      by: [{ field: 'createdAt', direction: 'asc' }],
    },
    {
      title: 'Status then newest',
      name: 'statusThenNewest',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      status: 'status',
      studio: 'requestedStudio',
      phone: 'phone',
    },
    prepare({ title, status, studio, phone }) {
      const statusLabel = BOOKING_STATUS_LABELS[status ?? ''] ?? (status || 'New');
      return {
        title: title ?? 'Unknown inquiry',
        subtitle: [statusLabel, studio, phone].filter(Boolean).join(' | '),
      };
    },
  },
});
