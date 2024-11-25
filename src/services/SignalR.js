import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = null;
    this.subscribers = [];
  }

  initializeConnection(url, userId) {
    this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    this.connection.on(
      "ReceiveMessage",
      (
        senderId,
        receiverId,
        username,
        profile,
        messageDescription,
        msgTime
      ) => {
        try {
          if (receiverId === userId) {
            // Process the message
            this.broadcastMessage(
              senderId,
              receiverId,
              username,
              profile,
              messageDescription,
              msgTime
            );
          }
        } catch (error) {
          console.error("Error processing received message:", error);
        }
      }
    );

    this.connection
      .start()
      .then(() => console.log("SignalR connection established"))
      .catch((err) => console.error("Connection error:", err));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }

  broadcastMessage(
    senderId,
    receiverId,
    username,
    profile,
    messageDescription,
    msgTime
  ) {
    this.subscribers.forEach((callback) =>
      callback(
        senderId,
        receiverId,
        username,
        profile,
        messageDescription,
        msgTime
      )
    );
  }

  sendMessage(data) {
    return this.connection
      .invoke("SendMessage", data?.senderId, data?.receiverId, data?.message)
      .catch((err) => console.error("Error sending message:", err));
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
