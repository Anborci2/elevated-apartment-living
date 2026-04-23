export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline on the homepage (e.g. "Find Your Perfect Denver Home")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 2,
      description: 'Shorter line beneath the headline',
    },
    {
      name: 'heroImage',
      title: 'Hero Background Photo',
      type: 'image',
      description: 'Full-screen background photo on the homepage and FAQ page',
      options: { hotspot: true },
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Public email shown in the footer and used for lead delivery',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Optional phone number shown in the footer',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
}
