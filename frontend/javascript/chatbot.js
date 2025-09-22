const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotBox = document.getElementById("chatbot-box");
const closeChat = document.getElementById("close-chat");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");


chatbotBtn.addEventListener("click", () => {
  chatbotBox.style.display = "flex";
  chatbotBtn.style.display = "none";
  chatbotBox.setAttribute("aria-hidden", "false");
  addBotMessage("👋 Hello! I am your personal AI assistant. How can I assist you today?");
});

// Close chatbot
closeChat.addEventListener("click", () => {
  chatbotBox.style.display = "none";
  chatbotBtn.style.display = "flex";
  chatbotBox.setAttribute("aria-hidden", "true");
});

// Handle send button
sendBtn.addEventListener("click", handleUserMessage);

// Handle Enter key
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserMessage();
});

// Process user message
function handleUserMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  addUserMessage(msg);
  chatInput.value = "";

  setTimeout(() => {
    const reply = getBotResponse(msg.toLowerCase());
    addBotMessage(reply);
  }, 500);
}

// Add user message
function addUserMessage(message) {
  const div = document.createElement("div");
  div.classList.add("chat-msg", "you");
  div.innerText = message;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(message) {
  const div = document.createElement("div");
  div.classList.add("chat-msg", "bot");
  div.innerText = message;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function getBotResponse(input) {
  if (input.includes("apply")) {
    return "✅ To apply: Register on the PM Internship Portal → Complete profile → Browse opportunities → Apply.";
  }
  if (input.includes("eligibility")) {
    return "📌 Any UG/PG student across India can apply. Specific eligibility depends on internship details.";
  }
  if (input.includes("documents")) {
    return "📝 Required: Aadhaar, student ID, and resume. Some internships may need recommendation letters.";
  }
  if (input.includes("dashboard")) {
    return "📊 Your dashboard shows applied internships, application status, and joining updates.";
  }
  if (input.includes("support") || input.includes("help")) {
    return "💡 For help, check the Support section or email us at support@pminternship.gov.in";
  }
  if (input.includes("hello") || input.includes("hi")) {
    return "👋 Hi there! How can I guide you with internships today?";
  }
  if (input.includes("thanks") || input.includes("thank you")) {
    return "🙏 You're most welcome! Best of luck with your applications.";
  }
  return "🤖 I’m still learning. Could you try rephrasing your question or check our Support section?";
}
