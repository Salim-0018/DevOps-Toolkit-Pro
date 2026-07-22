const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cache = new Map();
const dockerKnowledge = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../../data/knowledge/docker.json"),
    "utf8"
  )
);
exports.solveError = async (message) => {
const key = message.trim().toLowerCase();
for (const item of dockerKnowledge) {

  if (key.includes(item.keyword.toLowerCase())) {

    const answer = `
# ${item.title}

## Description
${item.description}

## Solution
${item.solution.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Commands

\`\`\`bash
${item.commands.join("\n")}
\`\`\`
`;

    cache.set(key, answer);

    return {
      success: true,
      ai: true,
      knowledge: true,
      answer,
    };

  }

}

if (cache.has(key)) {
  return {
    success: true,
    ai: true,
    cached: true,
    answer: cache.get(key),
  };
}
  try {

    const prompt = `Senior DevOps Engineer.

Question:
${message}

Reply in markdown.
Max 120 words.
Commands first.
No introduction.
`;

    const response = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "qwen2.5:3b",
        prompt: prompt,
        stream: false,
        keep_alive: "30m",
        options: {
          temperature: 0.2,
          num_predict: 180,
        },
      }
    );
 
   cache.set(key, response.data.response);

    return {
      success: true,
      ai: true,
      answer: response.data.response,
    };

  } catch (err) {

    console.error("OLLAMA ERROR:");
    console.error(err.response?.data || err.message);

    return {
      success: false,
      error: err.response?.data || err.message,
    };

  }
};
exports.streamAnswer = async (message, res) => {

  const prompt = `
You are a Senior DevOps Engineer.

Question:
${message}
`;

  const response = await fetch(
    "http://127.0.0.1:11434/api/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:3b",
        prompt,
        stream: true,
      }),
    }
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {

    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value);

    const lines = buffer.split("\n");

    buffer = lines.pop();

    for (const line of lines) {

      if (!line.trim()) continue;

      try {

        const json = JSON.parse(line);

        if (json.response) {
          res.write(json.response);
        }

      } catch (e) {}

    }

  }

};
