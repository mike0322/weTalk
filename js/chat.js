// add chat document
// setting up a real-time listener to get ner chat
// update user name
// update chat room

class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };

    const res = await this.chats.add(chat);
    return res;
  }

  chatListener(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            // render to ui
            callback(change.doc.data());
          } else if (change.type === "removed") {
            console.log("remove from ui");
          }
        });
      });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    this.room = room;
    if (this.unsub) {
      this.unsub();
    }
  }
}

// test
// setTimeout(() => {
//   chatRoom.updateRoom("gaming");
//   chatRoom.chatListener(data => {
//     console.log(data);
//   });
//   chatRoom.addChat("hahaha piza");
// }, 3000);
