"use strict";
function sendMessages(messages) {
    messages.forEach(element => {
        send(element);
    });
}
function switchChat(nextChatName) {
    const { chats } = els();
    if (nextChatName == null || nextChatName == "") {
        console.log("Invalid chat name");
        return false;
    }
    if (!(nextChatName in chats.chats)) {
        chats.chats[nextChatName] = [];
    }
    chats.currentChat = nextChatName;
    clearChatWindow();
    loadChat(nextChatName);
    return true;
}
function loadChat(chatName) {
    const { chats } = els();
    let messages = chats.chats[chatName];
    clearCurrentChat();
    sendMessages(messages);
}
function reloadChat() {
    const { chats } = els();
    clearChatWindow();
    loadChat(chats.currentChat);
}
function clearChatWindow() {
    const { chat } = els();
    let children = chat.children;
    chat.replaceChildren();
}
function clearAllChats() {
    window.app.chats = { currentChat: "main", chats: { "main": [] } };
    clearChatWindow();
}
function clearChat(chatName) {
    const { chats } = els();
    chats.chats[chatName] = [];
}
function clearCurrentChat() {
    const { chats } = els();
    chats.chats[chats.currentChat] = [];
}
function sendInput() {
    const { input } = els();
    const text = input.value;
    input.value = "";
    send(text);
}
function send(message) {
    const { chats } = els();
    let result = sendInternal(message);
    if (result) {
        chats.chats[chats.currentChat].push(message);
    }
}
function sendInternal(message) {
    const { chat, welcome } = els();
    // Censor any bad words
    message = censor(message.trim(), badWords);
    if (!message) {
        return false;
    }
    if (welcome)
        welcome.remove();
    // Add window element
    const el = document.createElement("div");
    el.className = "msg user";
    el.textContent = message;
    chat.appendChild(el);
    autosize();
    chat.scrollTop = chat.scrollHeight;
    return true;
}
