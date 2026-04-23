import { sanityClient } from './client'

export async function getPublishedReviews() {
  return sanityClient.fetch(
    `*[_type == "review" && approved == true] | order(_createdAt desc) {
      _id, quote, authorName, rating
    }`
  )
}

export async function getOurStory() {
  return sanityClient.fetch(
    `*[_type == "ourStory"][0] { paragraph1, paragraph2, paragraph3, paragraph4, headshot }`
  )
}

export async function getFaqs() {
  return sanityClient.fetch(
    `*[_type == "faq"] | order(order asc) { _id, question, answer }`
  )
}

export async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      heroHeadline, heroSubheadline, heroImage, contactEmail, contactPhone
    }`
  )
}
