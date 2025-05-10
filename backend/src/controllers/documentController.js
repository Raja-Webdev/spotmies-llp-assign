const Document = require("../models/Document");
const { extractTextFromFile } = require("../utils/documentProcessor");
const fs = require("fs");

async function uploadDocument(file, userId) {
  try {
    const content = await extractTextFromFile(file.path, file.mimetype);

    const newDocument = new Document({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
      content,
      uploadedBy: userId,
    });

    const savedDoc = await newDocument.save();
    return savedDoc;
  } catch (error) {
    // Clean up the uploaded file if processing fails
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw error;
  }
}

async function getDocuments() {
  return await Document.find().sort({ uploadDate: -1 });
}

module.exports = {
  uploadDocument,
  getDocuments,
};
