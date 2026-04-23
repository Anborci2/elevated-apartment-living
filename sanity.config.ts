// -------------------------------------------------------
// Sanity Studio is hosted by Sanity at:
//   https://elevated.sanity.studio  (or your project name)
// Alan logs in there to manage reviews, story, and FAQ.
//
// This config file is used when running the studio locally
// via: npx sanity dev
// -------------------------------------------------------

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { reviewSchema } from './lib/sanity/schemas/review'
import { storySchema } from './lib/sanity/schemas/story'
import { faqSchema } from './lib/sanity/schemas/faq'
import { siteSettingsSchema } from './lib/sanity/schemas/siteSettings'

export default defineConfig({
  name: 'elevated',
  title: 'Elevated Apartment Locating',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
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
