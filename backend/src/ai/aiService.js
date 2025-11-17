const axios = require("axios");
require("dotenv").config();

const GEMINI_KEY = process.env.GEMINI_KEY;

async function generateTaskAI(description) {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are an expert task planner.
Rewrite and upgrade the following task into a professional task for a productivity app.

USER INPUT:
"${description}"

Your output MUST be a valid JSON object ONLY (no explanation, no markdown, no code block).

Rules:
1. Create a short, clear, professional TITLE.
2. Create a SUMMARY (max 1 sentence).
3. Estimate realistic time in HOURS (1h – 12h). Always return integer.
4. Do NOT return markdown or triple backticks.

Return JSON in this format:
{
  "title": "string",
  "summary": "string",
  "estimated_time": number
}
`,
              },
            ],
          },
        ],
      }
    );

    // extract text
    let text = res.data.candidates[0].content.parts[0].text.trim();

    // Remove accidental markdown
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    // Extract JSON only
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const json = JSON.parse(jsonMatch[0]);

    // Safety check for estimated_time
    let est = parseInt(json.estimated_time);
    if (isNaN(est) || est < 1 || est > 12) {
      est = Math.floor(Math.random() * 4) + 2; // default 2–5h
    }

    return {
      title: json.title || "New Task",
      summary: json.summary || "",
      estimated_time: est,
    };
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.data || err.message);
    return {
      title: "Untitled Task",
      summary: "",
      estimated_time: 2,
    };
  }
}

module.exports = { generateTaskAI };
