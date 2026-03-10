import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  title: 'Cine Classic Studios — CMS',
  autoUpdates: true,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('🎬 Studio Sets')
              .child(S.documentTypeList('studio')),
            S.listItem()
              .title('🏆 Productions & Portfolio')
              .child(S.documentTypeList('production')),
            S.listItem()
              .title('🛠 Facilities')
              .child(S.documentTypeList('facility')),
            S.listItem()
              .title('⭐ Testimonials')
              .child(S.documentTypeList('testimonial')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
