import { useState } from "react";
import AudioStreaming from "./audioStreaming";
import { usePubSub } from "@videosdk.live/react-sdk"; // Importing the usePubSub hook for real-time messaging

export default function ChatView() {
    // State to store the latest audio link received
    const [audioLink, setAudioLink] = useState(null);

    // Using VideoSDK's PubSub feature to send and receive messages
    const { publish, messages } = usePubSub("CHAT", {
        onMessageReceived: (message) => {
            // Extract the audio link from the received message
            const link = message.message;
            console.log("Received Audio Link:", link);
            
            // Update state to render the AudioStreaming component with the new link
            setAudioLink(link);
        }
    });

    // State to manage the input field for sending messages
    const [message, setMessage] = useState("");

    // Function to send a message using VideoSDK's PubSub
    const handleSendMessage = () => {
        publish(message, { persist: true }); // Send message and persist it in chat history
        setMessage(""); // Clear the input field after sending the message
    };

    return (
      <>
        <div>
          <p>Messages:</p>
          {/* Render all messages received from the chat */}
          {messages.map((message, index) => (
            <p key={index}>
              {message.senderName} says {message.message}
            </p>
          ))}
        </div>

        {/* Input field for typing messages */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Button to send message */}
        <button onClick={handleSendMessage}>Send Message</button>

        {/* Render AudioStreaming component when an audio link is received */}
        {audioLink && <AudioStreaming link={audioLink} />}
      </>
    );
}
