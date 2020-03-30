const socket = io();

const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  output = document.getElementById("output"),
  button = document.getElementById("button");

//Sending "typing" message
message.addEventListener("keypress", () => {
  socket.emit("userTyping", handle.value);
});

//send message to clients
button.addEventListener("click", e => {
  e.preventDefault();
  socket.emit("userMessage", {
    handle: handle.value,
    message: message.value
  });
  message.value = "";
});

//listen for events from the server
socket.on("userMessage", data => {
  typing.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
  console.log("you sent the message");
});

socket.on("userTyping", data => {
  typing.innerHTML = "<p><em>" + data + " is typing... </em></p>";
});
