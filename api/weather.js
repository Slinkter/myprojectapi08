// api/weather.js - Vercel Serverless Function
// Este archivo iría en la raíz del proyecto en una carpeta /api

export default async function handler(req, res) {
    // Habilitar CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    // API key solo en el servidor (no se expone al cliente)
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: "API key not configured" });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`,
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return res.status(response.status).json({
                error: errorData.message || "Failed to fetch weather data",
            });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Weather API Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
