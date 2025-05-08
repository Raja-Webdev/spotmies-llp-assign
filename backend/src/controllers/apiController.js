const getGeminiResponse = require("../services/geminiApi");
const apiController = async (req, res) => {
  try {
    const userQuery = "what are you doing?";
    const response = await getGeminiResponse(userQuery);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error in API controller:", error);
    res.status(500).json({
      error: "Internal server error",
      type: "Fetching Error from Gemini API",
    });
  }
};

module.exports = {
  apiController,
};
