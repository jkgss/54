const UPSTREAM_TIMEOUT_MS = 10000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL is not set');
    return res.status(500).json({
      success: false,
      error: 'N8N_WEBHOOK_URL is not configured on the server',
    });
  }

  let payload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ success: false, error: 'Request body is not valid JSON' });
  }

  console.log('Proxying audit lead to n8n (POST)', {
    friction: payload.friction,
    team: payload.team,
    urgency: payload.urgency,
  });

  let upstream;
  try {
    upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError';
    console.error('n8n request failed', { timedOut, message: error?.message });
    return res.status(timedOut ? 504 : 502).json({
      success: false,
      error: timedOut
        ? `n8n did not respond within ${UPSTREAM_TIMEOUT_MS / 1000}s`
        : `Could not reach n8n: ${error?.message || 'unknown error'}`,
    });
  }

  const text = await upstream.text();
  let upstreamBody;
  try {
    upstreamBody = text ? JSON.parse(text) : null;
  } catch {
    upstreamBody = text;
  }

  if (!upstream.ok) {
    console.error('n8n responded with an error', {
      upstreamStatus: upstream.status,
      upstreamBody,
    });
    return res.status(502).json({
      success: false,
      error: `n8n responded with HTTP ${upstream.status}`,
      upstreamStatus: upstream.status,
      upstreamBody,
    });
  }

  return res.status(200).json({ success: true, sent: payload, data: upstreamBody });
}
