const fs = require("fs");
const pdf = require("pdf-parse");

async function extractTextFromFile(filePath, mimetype) {
  try {
    if (mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } else if (mimetype === "text/plain") {
      return fs.readFileSync(filePath, "utf-8");
    }
    // Add other file type handlers as needed
    throw new Error("Unsupported file type");
  } catch (error) {
    console.error("Error extracting text:", error);
    throw error;
  }
}

module.exports = {
  extractTextFromFile,
};
