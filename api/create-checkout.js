import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers, contactInfo, email, businessName, specificNeeds } = req.body;
    
    // We expect the price IDs to be set in Vercel environment variables
    const priceIdString = process.env.STRIPE_PRICE_ID;
    
    if (!priceIdString) {
      console.error('STRIPE_PRICE_ID is missing from environment variables');
      return res.status(500).json({ error: 'Stripe configuration error on server' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is missing from environment variables');
      return res.status(500).json({ error: 'Stripe configuration error on server' });
    }

    // Split the comma-separated price IDs
    const priceIds = priceIdString.split(',').map(id => id.trim()).filter(id => id);
    const line_items = priceIds.map(id => ({ price: id, quantity: 1 }));

    // Format metadata securely for Stripe (Max 50 keys, up to 500 chars each)
    const metadata = {
      firstName: String(contactInfo?.firstName || businessName || '').substring(0, 500),
      lastName: String(contactInfo?.lastName || '').substring(0, 500),
      email: String(contactInfo?.email || email || '').substring(0, 500),
      gdprConsent: contactInfo?.gdprConsent ? 'yes' : 'no',
      teamSize: String(answers?.team || '').substring(0, 500),
      urgency: String(answers?.urgency || '').substring(0, 500),
      service: String(answers?.friction || specificNeeds || 'HIGH_PERFORMANCE_WEB_DESIGN').substring(0, 500),
      // Adding a flag so n8n knows this came from checkout
      source: specificNeeds ? 'hero_instant_buy' : 'web_design_checkout',
    };

    // Use the explicit app URL or fallback to request origin
    const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.VITE_APP_URL || `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      // mode must be 'subscription' if at least one price is recurring
      mode: 'subscription',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      customer_email: contactInfo?.email || undefined,
      // Metadata in subscription mode is often placed inside subscription_data
      subscription_data: {
        metadata: metadata,
      },
      metadata: metadata, // Keep here as well for the checkout session itself
      client_reference_id: String(Date.now()), // Unique identifier for the checkout
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: err.message });
  }
}
