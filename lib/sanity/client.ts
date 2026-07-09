import { createClient, type SanityClient } from '@sanity/client'

// Env var names match Alan's Vercel config exactly (non-standard casing).
// Safe without a NEXT_PUBLIC_ prefix because this client is only ever
// used in server components, never shipped to the browser.
const projectId = process.env.Sanity_Project_ID
const dataset = process.env.Sanity_Dataset ?? 'production'

export const sanityClient: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true })
  : null
