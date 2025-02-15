class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
  }

  handleIncomeQuery = () => {
      const message = this.createChatBotMessage(
          "Your total income is displayed in the reports section. 💰 Need help budgeting your income?",
          {
              widget: "budgetingTips"
          }
      );
      this.updateChatbotState(message);
  };

  handleExpenseQuery = () => {
      const message = this.createChatBotMessage(
          "Your total expenses are displayed in the reports section. Do you want tips on managing expenses? 🧐",
          {
              widget: "expenseTips"
          }
      );
      this.updateChatbotState(message);
  };

  handleSavingTips = () => {
      const message = this.createChatBotMessage(
          "Here are some saving tips:\n\n✅ Set a budget\n✅ Track expenses\n✅ Cook at home 🍽️\n✅ Cancel unused subscriptions 🚫\n✅ Walk instead of driving 🚶‍♂️\n\nWant to learn how to invest your savings?",
          {
              widget: "investmentTips"
          }
      );
      this.updateChatbotState(message);
  };

  handleCutExpenses = () => {
      const message = this.createChatBotMessage(
          "Ways to cut down expenses:\n\n🔹 Avoid impulse purchases 🛑\n🔹 Buy in bulk 🛒\n🔹 Use discount codes 💸\n🔹 Shop second-hand ♻️\n🔹 Reduce energy bills ⚡\n\nWould you like a challenge to reduce your expenses?"
      );
      this.updateChatbotState(message);
  };

  handleFinanceFacts = () => {
      const financeFacts = [
          "📈 The stock market has averaged a 10% annual return over the last century.",
          "💳 Credit card debt can accumulate fast due to high interest rates (often over 20%).",
          "💰 The 50/30/20 rule recommends 50% on needs, 30% on wants, and saving 20%.",
          "📊 Warren Buffett started investing at age 11 and regrets not starting sooner!",
          "💡 The average millionaire has 7 streams of income. How many do you have?",
          "🔄 Automating your savings can help you stay consistent with financial goals!"
      ];
      const randomFact = financeFacts[Math.floor(Math.random() * financeFacts.length)];
      const message = this.createChatBotMessage(randomFact);
      this.updateChatbotState(message);
  };

  handleInvestmentTips = () => {
      const message = this.createChatBotMessage(
          "Investment tips 📈:\n\n1️⃣ Start investing early 📅\n2️⃣ Diversify your portfolio 📊\n3️⃣ Avoid emotional investing 😨\n4️⃣ Invest in low-cost index funds 📉\n5️⃣ Think long-term! 💡"
      );
      this.updateChatbotState(message);
  };

  handleDebtManagement = () => {
      const message = this.createChatBotMessage(
          "Debt management strategies:\n\n📝 Create a repayment plan\n💳 Pay more than the minimum\n🔄 Consider debt consolidation\n📉 Prioritize high-interest debts first\n💰 Build an emergency fund to avoid future debt."
      );
      this.updateChatbotState(message);
  };

  handleFinanceQuiz = () => {
      const message = this.createChatBotMessage(
          "Let's test your finance knowledge! 🤓\n\nWhat does APR stand for?\n\nA) Annual Percentage Rate\nB) Advanced Payment Ratio\nC) Applied Profit Returns\n\nReply with A, B, or C!"
      );
      this.updateChatbotState(message);
  };

  handleDefaultResponse = () => {
      const message = this.createChatBotMessage(
          "I can help you with budgeting, expenses, saving tips, investments, and finance facts! What would you like to know? 😊"
      );
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
