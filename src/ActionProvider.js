class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleIncomeQuery = () => {
      const message = this.createChatBotMessage("Your total income is displayed in the reports section.");
      this.updateChatbotState(message);
    };
  
    handleExpenseQuery = () => {
      const message = this.createChatBotMessage("Your total expenses are displayed in the reports section.");
      this.updateChatbotState(message);
    };
  
    handleSavingTips = () => {
      const message = this.createChatBotMessage(
        "Here are some saving tips:\n💰 Set a budget\n📉 Track your expenses\n🍽️ Cook at home\n🚫 Cancel unused subscriptions\n🚶‍♂️ Walk instead of driving short distances."
      );
      this.updateChatbotState(message);
    };
  
    handleCutExpenses = () => {
      const message = this.createChatBotMessage(
        "Ways to cut down expenses:\n✅ Avoid impulse purchases\n✅ Buy in bulk\n✅ Use coupons & discount codes\n✅ Shop second-hand\n✅ Reduce energy bills."
      );
      this.updateChatbotState(message);
    };
  
    handleFinanceFacts = () => {
      const financeFacts = [
        "📈 The stock market has averaged a 10% annual return over the last century.",
        "💳 Credit card interest rates can exceed 20%, making debt expensive.",
        "💵 The 50/30/20 rule recommends spending 50% on needs, 30% on wants, and saving 20%.",
        "📊 Warren Buffett started investing at age 11 and regrets not starting sooner!",
      ];
      const randomFact = financeFacts[Math.floor(Math.random() * financeFacts.length)];
      const message = this.createChatBotMessage(randomFact);
      this.updateChatbotState(message);
    };
  
    handleDefaultResponse = () => {
      const message = this.createChatBotMessage("I can help you with income, expenses, saving tips, and finance facts!");
      this.updateChatbotState(message);
    };
  
    updateChatbotState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;
  