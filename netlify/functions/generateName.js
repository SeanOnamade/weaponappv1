// netlify/functions/generateName.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
  
    const { prompt } = JSON.parse(event.body);
    console.log(prompt);

    const requestBody = {
        model: "gpt-3.5-turbo", // or "gpt-4" if you have GPT-4 access
        messages: [
            { role: "user", content: prompt }
          ],
        max_tokens: 10
      };
    console.log(JSON.stringify(requestBody));

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
        console.log("OpenAI error response:", data);
        throw new Error("OpenAI returned an error");
      }
      

    console.log("OpenAI key from env:", process.env.OPENAI_API_KEY);

    console.log("OpenAI response data:", data); 

    const name = data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ name })
    };
  } catch (error) {
    console.error("Error in generateName function:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
