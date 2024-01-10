const { default: OpenAI } = require("openai");
const openai = new OpenAI();

const createNewFileURL = async (file_id) => {
  const fileBlob = await openai.files.content(file_id);
  return fileBlob;
};

module.exports = { createNewFileURL };
