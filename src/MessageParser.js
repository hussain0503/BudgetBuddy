class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("income")) {
        this.actionProvider.handleIncomeQuery();
      } else if (lowerCaseMessage.includes("expenses") || lowerCaseMessage.includes("spending")) {
        this.actionProvider.handleExpenseQuery();
      } else if (lowerCaseMessage.includes("save money") || lowerCaseMessage.includes("saving tips")) {
        this.actionProvider.handleSavingTips();
      } else if (lowerCaseMessage.includes("cut expenses") || lowerCaseMessage.includes("reduce spending")) {
        this.actionProvider.handleCutExpenses();
      } else if (lowerCaseMessage.includes("fact") || lowerCaseMessage.includes("money fact")) {
        this.actionProvider.handleFinanceFacts();
      } else {
        this.actionProvider.handleDefaultResponse();
      }
    }
  }
  
  export default MessageParser;
  