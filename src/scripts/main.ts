interface AppState {
    chat: HTMLDivElement | null;
    welcome: HTMLDivElement | null;
    input: HTMLTextAreaElement | null;
    sendBtn: HTMLButtonElement | null;
    chats: ChatWindow | null;
}


// Declared as a global so `window.app` type-checks.
interface Window {
    app: AppState;
}

window.app = {
    chat: null, 
    welcome: null, 
    input: null, 
    sendBtn: null, 
    chats: null
};

// Returns the elements as non-null, or throws if main() hasn't run yet.
function els(): {
    chat: HTMLDivElement;
    welcome: HTMLDivElement | null;
    input: HTMLTextAreaElement;
    sendBtn: HTMLButtonElement;
    chats: ChatWindow;
} {
    const { chat, welcome, input, sendBtn, chats} = window.app;
    if (!chat || !input || !sendBtn || !chats ) throw new Error("UI not initialised");
    return { chat, welcome, input, sendBtn, chats };
}

function main(): void {
    window.app = {
        chat: document.getElementById("chat") as HTMLDivElement | null,
        welcome: document.getElementById("welcome") as HTMLDivElement | null,
        input: document.getElementById("input") as HTMLTextAreaElement | null,
        sendBtn: document.getElementById("send") as HTMLButtonElement | null,
        chats: null,
    };

    clearAllChats();

    const { input, sendBtn } = els();
    input.addEventListener("input", autosize);
    input.addEventListener("keydown", (e: KeyboardEvent) => {
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

const badWords: string[] = ["badword"];

function autosize(): void {
    const { input, sendBtn } = els();
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 200) + "px";
    sendBtn.disabled = input.value.trim() === "";
}

function censor(text: string, words: string[]): string {
    const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b(${words.map(escape).join("|")})\\b`, "gi");
    return text.replace(pattern, (match: string) => "*".repeat(match.length));
}

window.onload = main;