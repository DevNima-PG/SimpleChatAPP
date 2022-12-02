function InitMessages() {
    const LocalMessages = localStorage.getItem("messages");
    const ChatBox = document.querySelector(".chatbox");
    const messages = (LocalMessages ? LocalMessages.split(",") : []).map(item => {
        if (item) return item
    })
    messages?.forEach(message => {
        const ParagraphElement = document.createElement("p");
        ParagraphElement.innerText = message;
        ChatBox.appendChild(ParagraphElement)
    })
}
InitMessages()

const socket = io("http://localhost:3000");

socket.on("connect", data => {
    const sendBtn = document.getElementById("sendBtn");
    console.log(sendBtn)
    sendBtn.addEventListener("click", (e) => {
        const textBox = document.getElementById("text");
        const message = textBox.value;
        if(!message) return alert("Message Can't Be Empty! @user")
        socket.emit("client-message", message)
        textBox.value = ""
        textBox.focus()
    })
})

socket.on("server-message", message => {
    const localMessages = localStorage.getItem("messages") ? localStorage.getItem("messages") + "," + message : message
    localStorage.setItem("messages", localMessages)
    const messageTextElement = document.createElement("p");
    messageTextElement.innerText = message;
    const textBox = document.querySelector(".chatbox");
    textBox.appendChild(messageTextElement)
})