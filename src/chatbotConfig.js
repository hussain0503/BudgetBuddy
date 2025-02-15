import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import botIcon from "./images/BudgetBuddy.jpg"; 

const botName = "BudgetBuddy";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hello! I'm ${botName} 🤖. How can I assist you with your finances today?`),
    createChatBotMessage(
      "You can ask me about:\n\n💰 Income & Expenses\n📊 Budgeting Tips\n💡 Investment Advice\n📉 Debt Management\n📖 Financial Literacy\n🎓 Fun Finance Facts!\n\nJust type your question below! ⬇️",
      { delay: 500 }
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1976d2",
    },
    chatButton: {
      backgroundColor: "#1976d2",
    },
  },
  customComponents: {
    botAvatar: () => (
      <img
        src={botIcon} 
        alt="BudgetBuddy Bot"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
    ),
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
