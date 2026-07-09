import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ha3v40sb',
    dataset: 'production',
  },
  // Hosted studio URL: https://elevated-apartments.sanity.studio
  studioHost: 'elevated-apartments',
  deployment: {
    appId: 'lmm1wbdhjb8295eroyizmvcu',
  },
})
