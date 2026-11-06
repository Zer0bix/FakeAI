"use strict";
window.app = {
    chat: null,
    welcome: null,
    input: null,
    sendBtn: null,
    chats: null
};
// Returns the elements as non-null, or throws if main() hasn't run yet.
function els() {
    const { chat, welcome, input, sendBtn, chats } = window.app;
    if (!chat || !input || !sendBtn || !chats)
        throw new Error("UI not initialised");
    return { chat, welcome, input, sendBtn, chats };
}
function main() {
    window.app = {
        chat: document.getElementById("chat"),
        welcome: document.getElementById("welcome"),
        input: document.getElementById("input"),
        sendBtn: document.getElementById("send"),
        chats: null,
    };
    clearAllChats();
    const { input, sendBtn } = els();
    input.addEventListener("input", autosize);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendInput();
        }
    });
    sendBtn.addEventListener("click", sendInput);
    // <<< TESTING >>>
    localLoad();
    switchChat("main");
    // switchChat("main");
    // sendMessages(["hi", "there", "my", "name", "is", "Not Claude"]);
    // sendMessages(badWords);
    autosize();
}
const badWords = ["badword"];
function autosize() {
    const { input, sendBtn } = els();
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 200) + "px";
    sendBtn.disabled = input.value.trim() === "";
}
function censor(text, words) {
    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b(${words.map(escape).join("|")})\\b`, "gi");
    return text.replace(pattern, (match) => "*".repeat(match.length));
}
window.onload = main;
