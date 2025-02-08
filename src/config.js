import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "ExpenseBot",
  initialMessages: [createChatBotMessage("Hello! How can I assist you?")],
};

export default config;
