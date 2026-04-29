import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'

// -------------------------------------------------------
// Requires GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID,
// NEXT_PUBLIC_SANITY_PROJECT_ID, and SANITY_API_TOKEN
// in .env.local
// -------------------------------------------------------

const MIN_RATING = 4

export async function GET(req: Request) {
  const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  })
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return Response.json({ error: 'Google credentials not configured' }, { status: 500 })
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
  const res = await fetch(url)
  const json = await res.json()
  const reviews = json?.result?.reviews ?? []

  let imported = 0
  let skipped = 0

  for (const review of reviews) {
    if (review.rating < MIN_RATING) { skipped++; continue }

    const googleId = `google_${review.time}_${review.author_name?.replace(/\s/g, '_')}`

    const existing = await sanity.fetch(
      `*[_type == "review" && googleReviewId == $id][0]._id`,
      { id: googleId }
    )

    if (existing) { skipped++; continue }

    const firstName = review.author_name?.split(' ')[0] ?? 'Anonymous'
    const lastInitial = review.author_name?.split(' ')[1]?.[0] ?? ''
    const authorName = lastInitial ? `${firstName} ${lastInitial}.` : firstName

    await sanity.create({
      _type: 'review',
      quote: review.text,
      authorName,
      rating: review.rating,
      source: 'Google',
      approved: false,
      googleReviewId: googleId,
    })

    imported++
  }

  return Response.json({ success: true, imported, skipped })
}
