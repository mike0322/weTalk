// get elements
const list = document.querySelector(".chat-list");
const chatForm = document.querySelector(".chat-form");
const nameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-message");
const roomBtnBox = document.querySelector(".chat-rooms");
const roomBtnAll = document.querySelectorAll(".btn");

// add new chat
chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = chatForm.message.value.trim();

  chatRoom
    .addChat(message)
    .then(() => chatForm.reset())
    .catch(err => console.log(err));
});

// update user name
nameForm.addEventListener("submit", e => {
  e.preventDefault();

  const newName = nameForm.name.value.trim();
  chatRoom.updateName(newName);
  nameForm.reset();

  updateMssg.innerText = `你的名稱已經更改為${newName}`;
  setTimeout(() => (updateMssg.innerText = ""), 3000);
});

// check local storage for user name
const username = localStorage.username ? localStorage.username : "anonymous";

// update chat room
roomBtnBox.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    // remove & add class name
    roomBtnAll.forEach(item => item.classList.remove("btn-active"));
    e.target.classList.add("btn-active");

    const newRoom = e.target.getAttribute("id");
    chatUi.clearChat();
    chatRoom.updateRoom(newRoom);
    chatRoom.chatListener(data => chatUi.renderChat(data));
  }
});

// class instances
const chatRoom = new ChatRoom("general", username);
const chatUi = new ChatUi(list);

// get chat render
chatRoom.chatListener(data => chatUi.renderChat(data));
