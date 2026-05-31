const inputField = document.getElementById("chatInput");
const chatBox = document.getElementById("chatLog");
const sendBtn = document.getElementById("sendBtn");

const API_URL = "http://127.0.0.1:5000/chat";

// Send on button click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter key
inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  let userText = inputField.value.trim();
  if (userText === "") return;

  // User message
  chatBox.innerHTML += `
    <div class="chat-bubble user">${userText}</div>
  `;

  inputField.value = "";

  // Bot loading message
  chatBox.innerHTML += `
    <div class="chat-bubble bot" id="loading">Typing...</div>
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();

    // Remove loading
    document.getElementById("loading").remove();

    // Bot reply
    chatBox.innerHTML += `
      <div class="chat-bubble bot">${data.reply}</div>
    `;

  } catch (error) {
    document.getElementById("loading").remove();

    chatBox.innerHTML += `
      <div class="chat-bubble bot">Error: Could not reach model.</div>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}