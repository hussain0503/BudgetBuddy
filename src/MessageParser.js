class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }
  
    parse(message) {
        const lowerCaseMessage = message.toLowerCase();
    
        if (lowerCaseMessage.includes("income")) {
            this.actionProvider.handleIncomeQuery();
        } else if (lowerCaseMessage.includes("expenses") || lowerCaseMessage.includes("spending") || lowerCaseMessage.includes("cost")) {
            this.actionProvider.handleExpenseQuery();
        } else if (lowerCaseMessage.includes("save money") || lowerCaseMessage.includes("saving tips") || lowerCaseMessage.includes("how to save")) {
            this.actionProvider.handleSavingTips();
        } else if (lowerCaseMessage.includes("cut expenses") || lowerCaseMessage.includes("reduce spending") || lowerCaseMessage.includes("how to spend less")) {
            this.actionProvider.handleCutExpenses();
        } else if (lowerCaseMessage.includes("fact") || lowerCaseMessage.includes("money fact") || lowerCaseMessage.includes("finance fact")) {
            this.actionProvider.handleFinanceFacts();
        } else if (lowerCaseMessage.includes("invest") || lowerCaseMessage.includes("investment tips") || lowerCaseMessage.includes("where to invest")) {
            this.actionProvider.handleInvestmentTips();
        } else if (lowerCaseMessage.includes("debt") || lowerCaseMessage.includes("loans") || lowerCaseMessage.includes("credit card debt")) {
            this.actionProvider.handleDebtManagement();
        } else if (lowerCaseMessage.includes("quiz") || lowerCaseMessage.includes("finance test") || lowerCaseMessage.includes("challenge")) {
            this.actionProvider.handleFinanceQuiz();
        } else if (["a", "b", "c"].includes(lowerCaseMessage)) {
            this.actionProvider.handleQuizResponse(lowerCaseMessage);
        } else {
            this.actionProvider.handleDefaultResponse();
        }
    }    
  }
  
  export default MessageParser;
  