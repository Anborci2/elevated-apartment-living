import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'jmh96ece',
    dataset: 'production',
  },
  // Hosted studio URL: https://elevated-apartments.sanity.studio
  studioHost: 'elevated-apartments',
})
