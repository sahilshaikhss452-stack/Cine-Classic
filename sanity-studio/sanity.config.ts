import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { getStudioSanityDataset, getStudioSanityProjectId } from '../src/lib/sanity/env';

const SINGLETON_TYPES = new Set(['siteSettings', 'homePage']);
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  projectId: getStudioSanityProjectId(),
  dataset: getStudioSanityDataset(),
  title: 'Cine Classic Studios CMS',
  autoUpdates: true,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.listItem()
              .title('Homepage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage'),
              ),
            S.divider(),
            S.listItem().title('Studios').child(S.documentTypeList('studio')),
            S.listItem().title('Productions').child(S.documentTypeList('production')),
            S.listItem().title('Testimonials').child(S.documentTypeList('testimonial')),
            S.listItem().title('Facilities').child(S.documentTypeList('facility')),
            S.listItem().title('FAQs').child(S.documentTypeList('faq')),
            S.listItem().title('Booking Inquiries').child(S.documentTypeList('bookingInquiry')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (previousActions, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? previousActions.filter((action) => action.action && SINGLETON_ACTIONS.has(action.action))
        : previousActions,
    newDocumentOptions: (previousOptions, context) =>
      context.creationContext.type === 'global'
        ? previousOptions.filter((option) => !SINGLETON_TYPES.has(option.templateId))
        : previousOptions,
  },
});


