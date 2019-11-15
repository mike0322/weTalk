const chatBox = document.querySelector(".chat-box");

class ChatUi {
  constructor(chatList) {
    this.chatList = chatList;
  }

  renderChat(data) {
    const time = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true
    });
    const html = `
      <li class="list-group-item">
        <span class='username'>${data.username}:</span>
        <span>${data.message}</span>
        <div class=time>${time}</div>
      </li>
      `;

    this.chatList.innerHTML += html;

    // 滾動條自動滾到最下面，以獲取最新訊息
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  clearChat() {
    this.chatList.innerHTML = "";
  }
}
