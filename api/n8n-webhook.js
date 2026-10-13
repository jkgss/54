export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookUrl =
      process.env.N8N_WEBHOOK_URL ||
      process.env.NBN_WEBOOK_URL ||
      'https://n8n.jkgresults.com/webhook-test/599843a3-a65d-4e79-a603-e3544ebc8813';

    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // n8n webhook node is GET-only — forward fields as query params.
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    }

    const target = `${webhookUrl}?${params.toString()}`;
    console.log('Proxying audit lead to n8n (GET)', {
      friction: payload.friction,
      team: payload.team,
      urgency: payload.urgency,
      phone: payload.phone || payload.number,
    });

    const n8nResponse = await fetch(target, { method: 'GET' });
    const text = await n8nResponse.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!n8nResponse.ok) {
      console.error('n8n error', n8nResponse.status, data);
      return res.status(502).json({
        success: false,
        status: n8nResponse.status,
        sent: payload,
        data,
      });
    }

    return res.status(200).json({ success: true, sent: payload, data });
  } catch (error) {
    console.error('Webhook proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
