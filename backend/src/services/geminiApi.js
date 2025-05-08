const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiResponse = async (userQuery) => {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Optional: You can configure the model's behavior
    const generationConfig = {
      temperature: 0.9, // Controls randomness (0.0 to 1.0)
      topP: 0.1, // Nucleus sampling parameter
      topK: 16, // Top-k sampling parameter
      maxOutputTokens: 2048, // Maximum length of response
    };

    // Generate content from the user query
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userQuery }],
        },
      ],
      generationConfig,
    });

    // Get the response text
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from Gemini");
  }
};

module.exports = getGeminiResponse;
