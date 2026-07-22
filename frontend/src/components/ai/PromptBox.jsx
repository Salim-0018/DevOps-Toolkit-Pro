import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function PromptBox({ askAI }) {

  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    if (!message.trim()) return;

    askAI(message);

    setMessage("");

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSubmit();

    }

  };

  return (

    <div className="mt-6 flex items-end gap-3">

      <textarea

        rows={2}

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

        onKeyDown={handleKeyDown}

        placeholder="Ask anything about Docker, Kubernetes, Linux, AWS, Jenkins..."

        className="
        flex-1
        resize-none
        rounded-2xl
        border
        border-slate-700
        bg-slate-800
        p-4
        text-white
        outline-none
        focus:border-cyan-500
        "

      />

      <button

        onClick={handleSubmit}

        className="
        rounded-2xl
        bg-cyan-600
        p-4
        text-white
        transition
        hover:bg-cyan-700
        "

      >

        <SendHorizontal size={22}/>

      </button>

    </div>

  );

}
