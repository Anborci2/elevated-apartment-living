// Copy of lib/sanity/schemas/review.ts (site root) — keep the two in sync.

export const reviewSchema = {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Review Text',
      type: 'text',
      description: 'The review content (copy from Google)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authorName',
      title: 'Reviewer Name',
      type: 'string',
      description: 'First name + last initial only (e.g. "Sarah M.")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      description: 'Google star rating (1–5)',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where this review came from',
      options: { list: ['Google', 'Manual'] },
      initialValue: 'Google',
    },
    {
      name: 'approved',
      title: 'Published on Site',
      type: 'boolean',
      description: 'Toggle on to show this review on the website',
      initialValue: false,
    },
    {
      name: 'googleReviewId',
      title: 'Google Review ID',
      type: 'string',
      description: 'Used to avoid importing duplicate reviews (auto-filled)',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
      approved: 'approved',
    },
    prepare({ title, subtitle, approved }: any) {
      return {
        title: `${approved ? '✓' : '○'} ${title}`,
        subtitle: subtitle?.slice(0, 80),
      }
    },
  },
  orderings: [
    {
      title: 'Pending Approval',
      name: 'pendingFirst',
      by: [{ field: 'approved', direction: 'asc' }],
    },
  ],
}
