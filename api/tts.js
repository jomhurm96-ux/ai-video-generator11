export default async function handler(req, res) {
  const { text, lang } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const targetLang = lang || 'my';
    // Google TTS Service (Burmese, Thai, English အသံထွက်ထုတ်ယူခြင်း)
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${targetLang}&client=tw-ob`;

    const audioRes = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const arrayBuffer = await audioRes.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
