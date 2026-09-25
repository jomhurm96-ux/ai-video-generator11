export default async function handler(req, res) {
  const { id, token } = req.query;

  if (!id || !token) {
    return res.status(400).json({ error: "ID and Token are required" });
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
