export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, token, model, image } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Replicate token is required" });
  }

  try {
    // Model ရွေးချယ်မှု (Image ပါပါက MiniMax Image-to-video / I2V စနစ်သုံးခြင်း)
    let selectedModel = model || "minimax/video-01";
    let inputPayload = { prompt: prompt };

    if (image) {
      inputPayload.first_frame_image = image; // MiniMax အတွက် ပထမဆုံး frame image
    }

    const response = await fetch(`https://api.replicate.com/v1/models/${selectedModel}/predictions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: inputPayload })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
