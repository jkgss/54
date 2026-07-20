export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookUrl =
      process.env.N8N_WEBHOOK_URL ||
      process.env.NBN_WEBOOK_URL ||
      'http://n8n-hv97zdc1oj8mf4powdw0cras.34.27.240.166.sslip.io/webhook/7c0224cd-a93a-484c-83de-674a96c4b44a';

    if (!webhookUrl) {
      return res.status(500).json({ error: 'Webhook URL not configured' });
    }

    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // This n8n webhook is registered for GET only (POST returns 404).
    // Forward fields as query params so the workflow still receives the data.
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    }

    const target = `${webhookUrl}?${params.toString()}`;
    console.log('Proxying audit lead to n8n (GET)');

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
        data,
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Webhook proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
