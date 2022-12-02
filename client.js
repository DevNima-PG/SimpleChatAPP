const socket = io("http://localhost:3000");
console.log(socket)
socket.on("connect", data => {
    const sendBtn = document.getElementById("sendBtn");
    console.log(sendBtn)
    sendBtn.addEventListener("click", (e) => {
        const textBox = document.getElementById("text");
        const message = textBox.value;
        if(!message) return alert("Message Can't Be Empty! @user")
        socket.emit("client-message", message)
        textBox.value = ""
    })
})