const axios = require("axios");

const askOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  }catch (error) {

  console.log("FULL ERROR:");

  console.log(error.response?.data);

  console.log(error.message);

  return error.response?.data || error.message;
}
};

module.exports = askOpenRouter;