import { useEffect, useState } from "react";

export default function Chatbot() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Inject the main Botpress Webchat script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
    script1.async = true;
    script1.onload = () => {
      console.log("Botpress Webchat injected.");
      setIsLoaded(true);
    };
    document.head.appendChild(script1);

    // Inject your bot's config script
    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/07/14/16/20250714164158-YKSZ9Q01.js";
    script2.async = true;
    document.head.appendChild(script2);

    // Clean up on unmount
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // const toggleChat = () => {
  //   if (window.botpressWebChat) {
  //     window.botpressWebChat.sendEvent({ type: "toggle" });
  //   }
  // };

  return (
    <div>
      {/* <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Chat with us
      </button> */}

      {!isLoaded && <p className="text-center mt-4">Loading chat...</p>}
    </div>
  );
}
