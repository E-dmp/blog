import { createClient } from 'microcms-js-sdk'
export const client = createClient({
  serviceDomain: 'e-blogrd',
  apiKey: process.env.API_KEY || '',
})