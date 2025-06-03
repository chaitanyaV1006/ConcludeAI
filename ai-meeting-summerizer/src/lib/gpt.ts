// lib/gpt.ts

export async function getSummaryAndActions(transcript: string) {
  const prompt = `
You are an AI meeting assistant. Summarize the following meeting transcript and extract clear action items. 

Transcript:
${transcript}

Respond in JSON format:
{
  "summary": "A short paragraph summary...",
  "action_items": ["Item 1", "Item 2", "Item 3"]
}
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const response = data.choices[0].message.content;

  return JSON.parse(response); // returns { summary: "...", action_items: [...] }
}
