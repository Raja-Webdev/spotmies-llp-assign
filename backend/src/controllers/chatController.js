const Chat = require("../models/Chat");
const Document = require("../models/Document");
const { getGeminiResponse } = require("../services/geminiService");

async function getChatHistory(userId) {
  return await Chat.find({ userId }).sort({ timestamp: 1 });
}

async function saveMessage(userId, sender, text) {
  const newMessage = new Chat({
    userId,
    sender,
    text,
  });
  return await newMessage.save();
}

async function getRelevantDocuments(query) {
  // Simple keyword matching implementation
  const keywords = query.toLowerCase().split(/\s+/);
  const regexPattern = keywords.map((keyword) => new RegExp(keyword, "i"));

  return await Document.find({
    $or: [
      { content: { $in: regexPattern } },
      { originalname: { $in: regexPattern } },
    ],
  }).limit(3); // Limit to 3 most relevant documents
}

async function handleUserQuery(userId, userQuery) {
  try {
    // 1. Get relevant document snippets
    const relevantDocs = await getRelevantDocuments(userQuery);

    // 2. Construct the prompt with context
    let prompt = `Answer the following question based on the provided context. If the context doesn't contain the answer, say "I don't have that information in my documents."\n\n`;

    if (relevantDocs.length > 0) {
      prompt += `Context:\n`;
      relevantDocs.forEach((doc) => {
        // Extract the most relevant sentences (simplified)
        const sentences = doc.content.split(/[.!?]+/);
        const relevantSentences = sentences
          .filter((s) =>
            userQuery
              .toLowerCase()
              .split(/\s+/)
              .some((word) => s.toLowerCase().includes(word))
          )
          .slice(0, 3); // Take up to 3 relevant sentences

        prompt += `From document "${
          doc.originalname
        }": ${relevantSentences.join(". ")}\n\n`;
      });
    }

    prompt += `Question: ${userQuery}\nAnswer:`;

    // 3. Get response from Gemini
    const aiResponse = await getGeminiResponse(prompt);

    // 4. Save to chat history
    await saveMessage(userId, "user", userQuery);
    await saveMessage(userId, "ai", aiResponse);

    return aiResponse;
  } catch (error) {
    console.error("Error handling user query:", error);
    throw error;
  }
}

module.exports = {
  getChatHistory,
  saveMessage,
  handleUserQuery,
};
