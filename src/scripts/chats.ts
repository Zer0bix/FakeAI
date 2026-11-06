interface ChatWindow {
    currentChat: string;
    chats: Record<string, string[]>;
}

function sendMessages(messages: string[]): void {
    messages.forEach(element => {
        send(element);  
    });
}

function switchChat(nextChatName: string): boolean {
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

function loadChat(chatName: string): void {
    const { chats } = els();
    let messages: string[] = chats.chats[chatName];
    clearCurrentChat();
    sendMessages(messages);
}

function reloadChat(): void { 
    const { chats } = els();
    clearChatWindow();
    loadChat(chats.currentChat);
}

function clearChatWindow(): void {
    const { chat } = els();
    let children = chat.children
    chat.replaceChildren();
}

function clearAllChats(): void {
    window.app.chats = {currentChat: "main", chats: {"main": []}};
    clearChatWindow();
}

function clearChat(chatName: string): void {
    const { chats } = els();
    chats.chats[chatName] = [];
}

function clearCurrentChat(): void {
    const { chats } = els();
    chats.chats[chats.currentChat] = [];
}

function sendInput(): void {
    const { input } = els();
    const text = input.value;
    input.value = "";
    send(text);
}

function send(message: string): void {
    const { chats } = els();
    let result = sendInternal(message);
    if (result) {
        chats.chats[chats.currentChat].push(message);
    }
}

function sendInternal(message: string): boolean {
    const { chat, welcome } = els();
    // Censor any bad words
    message = censor(message.trim(), badWords);
    if (!message) { return false; }
    if (welcome) welcome.remove();
    
    // Add window element
    const el = document.createElement("div");
    el.className = "msg user"
    el.textContent = message;
    chat.appendChild(el);

    autosize();
    chat.scrollTop = chat.scrollHeight;
    return true;
}