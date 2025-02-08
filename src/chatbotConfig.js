import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const botName = "BudgetBuddy";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hello! I'm ${botName}. How can I assist you with your finances today?`),
    createChatBotMessage("You can ask me about expenses, savings tips, or finance facts!", {
      delay: 500,
    }),
  ],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
