import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = null;
    this.subscribers = [];
  }

  initializeConnection(url, userId) {
    this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    this.connection.on("RecieveMessage", (message, targetUserIds) => {
      try {
        const userIdsArray = JSON.parse(targetUserIds);
        if (userIdsArray.includes(userId)) {
          this.broadcastMessage(message);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    this.connection
      .start()
      .catch((err) => console.error("Connection error:", err));
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }

  broadcastMessage(message) {
    this.subscribers.forEach((callback) => callback(message));
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
