# N8N Webhook Implementation Plan

## 1. Environment Variable Configuration
- Define `NBN_WEBOOK_URL` in our `.env` files (or through Vercel's environment variables).
- This URL will point to the specific n8n webhook workflow URL provided.

## 2. Serverless Function Creation (Vercel API)
- Create a Vercel serverless function (e.g. `api/n8n-webhook.ts`) to bypass CORS limitations and act as the secure backend proxy.
- This function will receive the lead's submission payload from the frontend.
- It will execute a backend `fetch` request to the `NBN_WEBOOK_URL` environment variable.
- It will return an appropriate success or error response back to the client.

## 3. UI and Form Updates (`src/components/sections/DiagnosisForm.tsx`)
- **Field Modifications:** 
  - Change the single `FULL_NAME` input into two separate inputs: `First Name` and `Last Name`.
  - Retain the `email address` field.
  - Add a mandatory GDPR compliance checkbox.
- **Button Text:** Update the final submit button text to `"Get My Full Audit RoadMap"`.
- **Logic Updates:** 
  - Update state `contactInfo` to capture `firstName`, `lastName`, `email`, and `gdprConsent`.
  - Remove direct insertion into Supabase (per the prompt: "because we don't have a backend like supabase").
  - Modify the `handleSubmit` to POST the payload to the local `/api/n8n-webhook` serverless endpoint instead of the direct n8n or Supabase endpoints.

## 4. Testing & Validation
- Validate that the form enforces required fields, especially the GDPR checkbox.
- Ensure the API route successfully retrieves the `NBN_WEBOOK_URL` and proxies the data to n8n.
- Confirm successful resolution on the client side without CORS issues.
