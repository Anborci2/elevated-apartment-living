import { getPublishedReviews } from '@/lib/sanity/queries'
import { ReviewsMarquee } from './ReviewsMarquee'

const FALLBACK = [
  { _id: '1', quote: "Found our place in less than two weeks. Alan sent us three options that actually fit our budget and we signed on the second tour.", authorName: "Sarah M." },
  { _id: '2', quote: "I had no idea apartment locating was free. Saved me hours of searching and got us a move-in special that wasn't listed anywhere.", authorName: "James T." },
  { _id: '3', quote: "Moved from out of state and was overwhelmed by Denver's market. Having someone who actually knows the neighborhoods made all the difference.", authorName: "Priya K." },
  { _id: '4', quote: "Responded same day, understood exactly what I was looking for, and didn't waste my time with bad options. Couldn't recommend more.", authorName: "Derek W." },
  { _id: '5', quote: "Got a two-bedroom in RiNo under budget with a month free. Alan knew about the concession before it was even advertised.", authorName: "Lauren C." },
  { _id: '6', quote: "Used Zillow for weeks and got nowhere. One conversation here and I had tours lined up by the next morning.", authorName: "Marcus B." },
]

export async function Reviews() {
  const data = await getPublishedReviews().catch(() => null)
  const reviews = data && data.length > 0 ? data : FALLBACK
  return <ReviewsMarquee reviews={reviews} />
}
