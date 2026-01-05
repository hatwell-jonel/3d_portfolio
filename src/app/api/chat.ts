export default async function handler(req, res) {
    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
            { role: "system", content: req.body.system },
            ...req.body.messages,
            { role: "user", content: req.body.user }
        ]
        })
    })
    const data = await response.json()
    res.status(200).json({ text: data.output_text })
}
