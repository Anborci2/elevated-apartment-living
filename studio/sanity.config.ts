// -------------------------------------------------------
// Sanity Studio — Alan's content editing dashboard.
//
//   Hosted at:      https://elevated-apartments.sanity.studio
//   Run locally:    npm run dev      (from this studio/ folder)
//   Redeploy:       npm run deploy   (after any schema change)
//
// Schemas here are copies of lib/sanity/schemas/* in the
// site root. If a schema changes there, update it here too
// and run npm run deploy.
// -------------------------------------------------------

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { reviewSchema } from './schemas/review'
import { storySchema } from './schemas/story'
import { faqSchema } from './schemas/faq'
import { siteSettingsSchema } from './schemas/siteSettings'

export default defineConfig({
  name: 'elevated',
  title: 'Elevated Apartment Locating',
  projectId: 'ha3v40sb',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Reviews')
              .child(
                S.documentList()
                  .title('Reviews')
                  .filter('_type == "review"')
                  .defaultOrdering([{ field: 'approved', direction: 'asc' }])
              ),
            S.listItem()
              .title('Our Story')
              .child(S.document().schemaType('ourStory').documentId('ourStory')),
            S.listItem()
              .title('FAQ')
              .child(S.documentList().title('FAQ').filter('_type == "faq"')),
          ]),
    }),
  ],
  schema: {
    types: [siteSettingsSchema, reviewSchema, storySchema, faqSchema],
  },
})
