export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, token, model } = req.body;

  if (!token || !prompt) {
    return res.status(400).json({ error: 'Token and Prompt are required' });
  }

  try {
    const selectedModel = model || "minimax/video-01";
    const response = await fetch(`https://api.replicate.com/v1/models/${selectedModel}/predictions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          prompt_optimizer: true
        }
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
