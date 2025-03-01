import React, { useEffect, useRef } from "react";

const AudioStreaming = ({ link }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Autoplay failed:", error);
            });
        }
    }, [link]); // Re-run effect when link changes

    return (
        <audio ref={audioRef} controls autoPlay>
            <source src={link} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioStreaming;
