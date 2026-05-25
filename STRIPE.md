# Stripe Integration & Application Flow Implementation Plan

## Overview
We are implementing a hybrid application-to-payment flow. Instead of redirecting to Stripe instantly from the Hero or a Modal, the user will be routed to a dedicated `/apply` page to fill out their details. Once the form is submitted, a Vercel Serverless Function will securely generate a Stripe Checkout Session, embedding the application data into the payment metadata. Upon successful payment, Stripe will automatically trigger an n8n webhook with all application data, and redirect the user to a custom `/success` page.

---

## 1. Stripe Dashboard Setup (Where to get what you need)

Before writing the code, you will need to configure a few things in your Stripe Dashboard. 

### A. API Keys (Authentication)
1. Go to your **Stripe Dashboard**.
2. On the top right, click **Developers**, then click the **API keys** tab.
3. **Publishable key:** Starts with `pk_test_` or `pk_live_`. This is safe for the frontend.
4. **Secret key:** Starts with `sk_test_` or `sk_live_`. **Keep this secure!** It only belongs in Vercel environment variables, never in React code.

### B. Product ID and Price ID
1. In the Stripe Dashboard, go to **Products** and click **Add product**.
2. Name it "High-Performance Web Design" (or similar) and add your pricing (e.g., $500 setup). Save it.
3. Click into the product you just created.
4. **Product ID:** Look at the top left under the product name. It starts with `prod_`.
5. **Price ID:** Scroll down to the **Pricing** section. Click the three dots next to your price and select "Copy Price ID". It starts with `price_`. 
*(Note: The Checkout API strictly requires the Price ID to charge the customer, though we can store both for reference).*

### C. Webhooks (For n8n integration)
1. Go to **Developers > Webhooks**.
2. Click **Add an endpoint**.
3. Paste your n8n Webhook URL.
4. Under "Select events to listen to", search for and select `checkout.session.completed`.
5. Save. This ensures that the moment a payment succeeds, Stripe sends the payment confirmation AND all form metadata directly to n8n.

---

## 2. Environment Variables

We will need to add the following to your local `.env.local` file and your Vercel Project Settings:

```env
# Stripe (required for checkout)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PRICE_ID=price_500_setup_id_here,price_50_retainer_id_here

# Stripe (optional - only needed if adding client-side Stripe.js later)
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_PRODUCT_ID=prod_TzEX3RdDVgUnDw

# App URL (used for Stripe success/cancel redirects)
# In production this is set automatically by Vercel; override here for local dev.
NEXT_PUBLIC_APP_URL=http://localhost:5174
```

---

## 3. Page Architecture & Application Flow

We will build the following new pages and components:

### Step 1: The Entry Point (Hero / Modal)
- The "Apply Now" or "Buy Web Design" button on the Landing Page will no longer jump straight to Stripe or an API.
- Instead, it will use React Router to navigate the user to `/apply`.

### Step 2: The Application Page (`/apply`)
- A dedicated, high-converting application page.
- Contains a form gathering necessary operational context (Business Name, Email, Specific Needs, Team Size, etc.).
- **On Submit:** The frontend sends a `POST` request to our Vercel Serverless function (`/api/create-checkout`) containing the form data.

### Step 3: Vercel Serverless Function (`/api/create-checkout.js`)
- Receives the form data.
- Creates a secure Stripe Checkout Session using the `STRIPE_SECRET_KEY` and `STRIPE_WEB_DESIGN_PRICE_ID`.
- Injects the form data into the Stripe Session's `metadata` object.
- Returns a Stripe Checkout URL to the frontend.
- Frontend redirects the browser to this Stripe URL.

### Step 4: The Success Page (`/success`)
- After the user pays on Stripe, they are automatically redirected back to your website at `/success`.
- This page will display a premium, branded confirmation message, outlining the next steps (e.g., "Payment received. We will contact you within 24 hours.").

### Step 5: The Cancel Page (`/cancel`)
- If the user clicks "Back" during the Stripe checkout process, they are redirected here.
- Can display a message offering a secondary, lower-friction call to action (like booking a consultation instead).

---

## 4. Execution Plan (Next Steps)
*No code has been written yet. When you are ready, we will execute in this order:*

1. **Routing:** Create the empty `/apply`, `/success`, and `/cancel` pages in React Router.
2. **Frontend UI:** Build the UI for the `/apply` form and the `/success` screen.
3. **Backend API:** Refine the `/api/create-checkout.js` function to accept the specific fields from the new `/apply` form and construct the Stripe session.
4. **Integration:** Connect the frontend `/apply` form submission to the API and test the redirect flow.
