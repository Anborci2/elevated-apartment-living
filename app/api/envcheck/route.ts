// TEMPORARY diagnostic endpoint — remove after debugging env vars.
// Safe: exposes env var NAMES only, never secret values.
export const dynamic = 'force-dynamic'

export async function GET() {
  const relevantKeys = Object.keys(process.env)
    .filter((k) => /resend|lead|sanity|google|email|api|dataset|project/i.test(k))
    .sort()

  return Response.json({
    // presence of the exact names the code reads
    reads: {
      resend_api_key: !!process.env.resend_api_key,
      Lead_Email: !!process.env.Lead_Email,
      Sanity_Project_ID: !!process.env.Sanity_Project_ID,
      Sanity_Dataset: !!process.env.Sanity_Dataset,
    },
    // non-secret values, to confirm they're correct (email + project id are not secrets)
    values: {
      Lead_Email: process.env.Lead_Email ?? null,
      Sanity_Project_ID: process.env.Sanity_Project_ID ?? null,
      Sanity_Dataset: process.env.Sanity_Dataset ?? null,
    },
    // the ACTUAL stored names present at runtime — reveals stray spaces / casing / missing vars
    relevantKeys,
    // JSON-encoded so any hidden whitespace in names is visible
    relevantKeysEncoded: JSON.stringify(relevantKeys),
  })
}
