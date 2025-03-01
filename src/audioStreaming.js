import React, { useEffect, useRef } from "react";

const AudioStreaming = ({ link }) => {
    // Creating a reference to the <audio> element
    const audioRef = useRef(null);

    // Effect to handle auto-play when a new audio link is set
    useEffect(() => {
        if (audioRef.current) {
            // Attempt to play the audio
            audioRef.current.play().catch(error => {
                console.error("Autoplay failed:", error);
            });
        }
    }, [link]); // Re-run effect when link changes

    return (
        <audio ref={audioRef} controls autoPlay>
            {/* Setting the source of the audio element dynamically */}
            <source src={link} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioStreaming;
