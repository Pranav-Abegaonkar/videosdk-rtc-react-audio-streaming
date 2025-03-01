import { useState } from "react";
import AudioStreaming from "./audioStreaming";
import { usePubSub } from "@videosdk.live/react-sdk";

export default function ChatView() {
    const [audioLink, setAudioLink] = useState(null);
    const { publish, messages } = usePubSub("CHAT", {
        onMessageReceived: (message) => {
            const link = message.message;
            console.log("Received Audio Link:", link);
            setAudioLink(link); // Update state to render AudioStreaming component
        }
    });

    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        publish(message, { persist: true });
        setMessage(""); // Clear input field
    };

    return (
      <>
        <div>
          <p>Messages:</p>
          {messages.map((message, index) => (
            <p key={index}>
              {message.senderName} says {message.message}
            </p>
          ))}
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>

        {/* Render AudioStreaming component when audio link is available */}
        {audioLink && <AudioStreaming link={audioLink} />}
      </>
    );
}
