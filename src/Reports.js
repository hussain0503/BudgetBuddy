import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./chatbotStyles.css";


const Reports = () => {
  return (
    <div 
      style={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", minWidth: "500px" }}> {/* Half-page width */}
        <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
      </div>
    </div>
  );
};

export default Reports;
