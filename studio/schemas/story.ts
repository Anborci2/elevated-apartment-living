// Copy of lib/sanity/schemas/story.ts (site root) — keep the two in sync.

export const storySchema = {
  name: 'ourStory',
  title: 'Our Story',
  type: 'document',
  fields: [
    {
      name: 'headshot',
      title: 'Headshot Photo',
      type: 'image',
      description: 'Your professional photo shown in the Our Story section',
      options: { hotspot: true },
    },
    {
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'text',
      description: 'Opening paragraph — who you are and what you do',
    },
    {
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'text',
      description: 'How your service is different',
    },
    {
      name: 'paragraph3',
      title: 'Paragraph 3',
      type: 'text',
      description: 'The free service explanation',
    },
    {
      name: 'paragraph4',
      title: 'Paragraph 4',
      type: 'text',
      description: 'Closing call to action line',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Our Story Content' }
    },
  },
}
