import * as signalR from "@microsoft/signalr";
import { logout } from "../redux/Reducers/authSlice";
import { toast } from "react-toastify";

let globalDispatch = null;

export const setGlobalDispatch = (dispatch) => {
  globalDispatch = dispatch; // dispatch function assigned globally from the App.js component
};
class SignalRService {
  constructor() {
    this.connection = null;
    this.subscribers = [];
    this.isInitialized = false;
  }

  initializeConnection(url, userId) {
    if (this.isInitialized) {
      console.log("Connection already initialized");
      return;
    }
    this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    this.connection.on("LogOutDeletedUser", (deletedUserId) => {
      try {
        if (deletedUserId === userId) {
          toast.warning(
            "Your account has been deleted by the administrator. If you've any query, feel free to contact support team."
          );
          if (globalDispatch) {
            globalDispatch(logout());
          } else {
            console.error("Redux dispatch is not available.");
          }
        }
      } catch (error) {
        console.error("Error processing received message:", error);
      }
    });

    this.connection.on("LogOutWhenAccountOnHold", (deletedUserId) => {
      try {
        if (deletedUserId === userId) {
          toast.warning(
            "Your account has been set to OnHold by the administrator. If you've any query, feel free to contact support team."
          );
          if (globalDispatch) {
            globalDispatch(logout());
          } else {
            console.error("Redux dispatch is not available.");
          }
        }
      } catch (error) {
        console.error("Error processing received message:", error);
      }
    });

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

    this.connection.on(
      "ReloadNotifications",
      (
        receiverId,
        title,
        isRead,
        isActive,
        url,
        description,
        createdAt,
        notificationType
      ) => {
        try {
          if (receiverId === String(userId)) {
            // Process the message
            this.broadcastNotification(
              receiverId,
              title,
              isRead,
              isActive,
              url,
              createdAt,
              description,
              notificationType
            );
          }
        } catch (error) {
          console.error("Error processing received Notification:", error);
        }
      }
    );

    this.connection.on("ReceiveOffers", (model, senderId, receiverId) => {
      try {
        if (receiverId === userId) {
          this.broadcastOffer(senderId, receiverId, model);
        }
        if (model.messageDescription === "Reject") {
          if (senderId === userId) {
            this.broadcastOffer(senderId, receiverId, model);
          }
        }
      } catch (error) {
        console.error("Error processing received Offer:", error);
      }
    });

    this.connection.on("SendOrderMessage", (model, senderId, receiverId) => {
      try {
        if (model?.isDelivered === "2") {
          if (receiverId === userId || senderId === userId) {
            this.broadcastOrderMessage(senderId, receiverId, model);
          }
        } else if (receiverId === userId) {
          this.broadcastOrderMessage(senderId, receiverId, model);
        }
      } catch (error) {
        console.error("Error processing received Offer:", error);
      }
    });

    this.connection
      .start()
      .then(() => {
        this.isInitialized = true;
        console.log("SignalR connection established");
      })
      .catch((err) => console.error("Connection error:", err));
  }

  subscribe(callback) {
    if (!this.subscribers.includes(callback)) {
      this.subscribers.push(callback);
    }
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

  broadcastNotification(
    receiverId,
    title,
    isRead,
    isActive,
    url,
    description,
    createdAt,
    notificationType
  ) {
    this.subscribers.forEach((callback) =>
      callback(
        receiverId,
        title,
        isRead,
        isActive,
        url,
        description,
        createdAt,
        notificationType
      )
    );
  }

  broadcastOffer(senderId, receiverId, mdoel) {
    this.subscribers.forEach((callback) =>
      callback(senderId, receiverId, mdoel)
    );
  }

  broadcastOrderMessage(senderId, receiverId, mdoel) {
    this.subscribers.forEach((callback) =>
      callback(senderId, receiverId, mdoel)
    );
  }

  sendMessage(data) {
    if (!this.connection || this.connection.state !== "Connected") {
      console.error("SignalR connection not established");
      return;
    }

    return this.connection
      .invoke("SendMessage", data?.senderId, data?.receiverId, data?.message)
      .catch((err) => console.error("Error sending message:", err));
  }

  sendOfferObject(data) {
    if (!this.connection || this.connection.state !== "Connected") {
      console.error("SignalR connection not established");
      return;
    }

    return this.connection
      .invoke(
        "SendOfferObject",
        data?.senderId,
        data?.receiverId,
        data?.message
      )
      .catch((err) => console.error("Error sending message:", err));
  }

  sendOrderObject(data) {
    if (!this.connection || this.connection.state !== "Connected") {
      console.error("SignalR connection not established for 'sendOrderObject'");
      return;
    }

    return this.connection
      .invoke(
        "SendOrderObject",
        data?.senderId,
        data?.receiverId,
        data?.message
      )
      .catch((err) => console.error("Error sending message:", err));
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.isInitialized = false;
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
