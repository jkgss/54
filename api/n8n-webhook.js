export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookUrl = process.env.NBN_WEBOOK_URL;
    if (!webhookUrl) {
      console.error('NBN_WEBOOK_URL is missing');
      return res.status(500).json({ error: 'Webhook URL not configured' });
    }

    console.log('Sending payload to n8n:', req.body);

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    let data;
    try {
      data = await n8nResponse.json();
    } catch {
      data = await n8nResponse.text();
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
