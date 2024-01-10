const { default: OpenAI } = require("openai");
const openai = new OpenAI();

require("dotenv").config();

const assistantId = "asst_jJjUpgSegwqG7QBRmPQ23deL";
const threadId = "thread_A9dsCSidKTAItUqWPa0eqZQ4";
const runId = "run_GLBq7DmhPnEoMMwNoGlY1oGl";

const createAssistant = async () => {
  const assistant = await openai.beta.assistants.create({
    name: "Finance Assistant",
    instructions:
      "You are a helpful assistant who will help the user improve their financial habits and keep track of how they are spending their money. You will be clear, concise, and use data visualisations where applicable to convey your advice",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",
  });
  assistantId = assistant.id;
  return assistant;
};

const createThread = async () => {
  const thread = await openai.beta.threads.create();
  console.log(thread.id);
  return thread;
};

const addMessage = async () => {
  const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: "Can you ",
  });
  console.log(message);
  return message;
};

const createRun = async () => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions:
      "Please address the user as Jane Doe. The user has a premium account.",
  });

  console.log(run);

  return run;
};

const checkRunStatus = async () => {
  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  console.log(runStatus);
  return runStatus;
};

const getMessageList = async () => {
  const messageList = await openai.beta.threads.messages.list(threadId);
  console.log(messageList.data[0].content);
  return messageList;
};

getMessageList();
