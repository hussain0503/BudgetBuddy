class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }
  
    updateChatbotState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };
  
    handleIncomeQuery = () => {
        const message = this.createChatBotMessage(
            "Your total income is displayed in the reports section. 💰 Would you like some budgeting tips to optimize your income?",
            { widget: "budgetingTips" }
        );
        this.updateChatbotState(message);
    };
  
    handleExpenseQuery = () => {
        const message = this.createChatBotMessage(
            "Your total expenses are shown in the reports section. Want some strategies to reduce your expenses? 🧐",
            { widget: "expenseTips" }
        );
        this.updateChatbotState(message);
    };
  
    handleSavingTips = () => {
        const message = this.createChatBotMessage(
            "Here are some saving tips:\n\n✅ Automate your savings\n✅ Cook at home 🍽️\n✅ Use cashback apps 💰\n✅ Limit impulse purchases\n\nWant to explore passive income ideas? 💡",
            { widget: "passiveIncome" }
        );
        this.updateChatbotState(message);
    };
  
    handleInvestmentTips = () => {
        const message = this.createChatBotMessage(
            "Smart investment tips 📈:\n\n1️⃣ Invest in index funds 📊\n2️⃣ Start with an emergency fund 💰\n3️⃣ Avoid emotional investing 😨\n4️⃣ Think long-term 🏦\n\nWant to know about risk-free investment options?",
            { widget: "riskFreeInvestments" }
        );
        this.updateChatbotState(message);
    };
  
    handlePassiveIncome = () => {
        const message = this.createChatBotMessage(
            "Looking to make money while you sleep? Here are some passive income ideas:\n\n💻 Start a blog\n📚 Write an eBook\n🏡 Rent out property\n📈 Dividend investing\n🎥 Create an online course\n\nWant help choosing the best one for you?"
        );
        this.updateChatbotState(message);
    };
  
    handleDebtManagement = () => {
        const message = this.createChatBotMessage(
            "Debt management strategies:\n\n📝 Create a repayment plan\n💳 Pay off high-interest debt first\n📉 Consider debt consolidation\n💰 Build an emergency fund\n\nWould you like tips on improving your credit score?"
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
            "🔄 Automating your savings can help you stay consistent with financial goals!",
            "🛑 78% of millionaires believe that avoiding lifestyle inflation is key to wealth.",
            "🚀 Compounding interest is the 8th wonder of the world. Even small savings grow big over time!"
        ];
        const randomFact = financeFacts[Math.floor(Math.random() * financeFacts.length)];
        const message = this.createChatBotMessage(randomFact + "\n\nWant to learn more about financial literacy?");
        this.updateChatbotState(message);
    };
  
    handleFinanceQuiz = () => {
        const message = this.createChatBotMessage(
            "Let's test your finance knowledge! 🤓\n\nWhat does APR stand for?\n\nA) Annual Percentage Rate\nB) Advanced Payment Ratio\nC) Applied Profit Returns\n\nReply with A, B, or C!"
        );
        this.updateChatbotState(message);
    };
  
    handleFinanceQuiz = () => {
        const financeQuestions = [
            {
                question: "What does APR stand for?",
                options: ["A) Annual Percentage Rate", "B) Advanced Payment Ratio", "C) Applied Profit Returns"],
                correct: "A",
                explanation: "APR stands for Annual Percentage Rate, which represents the yearly cost of borrowing, including interest and fees."
            },
            {
                question: "Which of the following is considered a 'liability'?",
                options: ["A) Savings Account", "B) Mortgage Loan", "C) Retirement Fund"],
                correct: "B",
                explanation: "A mortgage loan is a liability because it represents money you owe, unlike savings or retirement funds, which are assets."
            },
            {
                question: "What is an emergency fund?",
                options: ["A) Money saved for unexpected expenses", "B) A high-risk investment fund", "C) A retirement savings account"],
                correct: "A",
                explanation: "An emergency fund is money set aside for unexpected expenses, such as medical bills or car repairs, to avoid debt."
            },
            {
                question: "What is 'compound interest'?",
                options: ["A) Interest earned on the initial deposit only", "B) Interest earned on both the initial deposit and previously earned interest", "C) Interest deducted from savings"],
                correct: "B",
                explanation: "Compound interest grows your money faster because you earn interest not only on your principal but also on the accumulated interest."
            },
            {
                question: "Which budgeting method follows the 50/30/20 rule?",
                options: ["A) 50% savings, 30% needs, 20% wants", "B) 50% needs, 30% wants, 20% savings", "C) 50% investments, 30% rent, 20% entertainment"],
                correct: "B",
                explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings or debt repayment."
            }
        ];
    
        const randomQuestion = financeQuestions[Math.floor(Math.random() * financeQuestions.length)];
    
        const message = this.createChatBotMessage(
            `Finance Quiz Time! 🤓\n\n${randomQuestion.question}\n\n${randomQuestion.options.join("\n")}\n\nReply with A, B, or C!`
        );
    
        this.updateChatbotState(message);
    
        this.setState((prevState) => ({
            ...prevState,
            currentQuiz: randomQuestion
        }));
    };
    
    handleQuizResponse = (userResponse) => {
        this.setState((prevState) => {
            const currentQuiz = prevState.currentQuiz;
    
            if (!currentQuiz) {
                const message = this.createChatBotMessage("Let's start with a new quiz! Type 'quiz' to get a question. 🎓");
                this.updateChatbotState(message);
                return prevState;
            }
    
            const correctAnswer = currentQuiz.correct;
            const explanation = currentQuiz.explanation;
    
            let responseMessage;
            if (userResponse.toUpperCase() === correctAnswer) {
                responseMessage = `✅ Correct! ${explanation}`;
            } else {
                responseMessage = `❌ Incorrect. The correct answer is ${correctAnswer}. ${explanation}`;
            }
    
            const message = this.createChatBotMessage(responseMessage);
            this.updateChatbotState(message);
    
            return { ...prevState, currentQuiz: null };
        });
    };
      
    handleDefaultResponse = () => {
        const message = this.createChatBotMessage(
            "I can help you with budgeting, expenses, saving tips, investments, and finance facts! What would you like to know? 😊"
        );
        this.updateChatbotState(message);
    };
  }
  
  export default ActionProvider;
  