import axios from "axios";

export const openAiCall = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
        stop: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY} `,
        },
      },
    );

    return res.data.choices[0].text;
  } catch (e) {
    console.error(e);
  }
};
