import { Bot, User, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import PromptBox from "./PromptBox";
import SuggestionCards from "./SuggestionCards";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const markdownComponents = {
  code({ inline, className, children, ...props }) {

    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (

      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>

    ) : (

      <code className="bg-slate-700 px-1 rounded">
        {children}
      </code>

    );

  },
};

export default function ChatWindow() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages]);

  const copyText = async (text) => {

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {

      setCopied(false);

    }, 2000);

  };

  const askAI = async (message) => {

    if (!message.trim()) return;

    setMessages(prev => [

      ...prev,

      {

        role: "user",

        content: message,

      }

    ]);

    setLoading(true);

    let aiMessage = "";

    setMessages(prev => [

      ...prev,

      {

        role: "assistant",

        content: "",

      }

    ]);

    try {

      const response = await fetch("/api/ai/stream", {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          message

        })

      });

      const reader = response.body.getReader();

      const decoder = new TextDecoder();

      let lastUpdate = Date.now();
     
             while (true) {

        const { done, value } = await reader.read();

        if (done) break;

        aiMessage += decoder.decode(value);

        if (Date.now() - lastUpdate > 50) {

          lastUpdate = Date.now();

          setMessages(prev => {

            const copy = [...prev];

            copy[copy.length - 1] = {

              role: "assistant",

              content: aiMessage,

            };

            return copy;

          });

        }

      }

      // Final Update

      setMessages(prev => {

        const copy = [...prev];

        copy[copy.length - 1] = {

          role: "assistant",

          content: aiMessage,

        };

        return copy;

      });

    } catch (err) {

      setMessages(prev => {

        const copy = [...prev];

        copy[copy.length - 1] = {

          role: "assistant",

          content: "❌ Backend Connection Failed",

        };

        return copy;

      });

    }

    setLoading(false);

  };

  return (

    <div className="rounded-3xl bg-slate-900 p-8">

      <SuggestionCards askAI={askAI} />

      <div className="mt-6 h-[520px] overflow-y-auto rounded-2xl bg-slate-950 p-5 space-y-5">

              {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[82%] rounded-2xl p-4 shadow-lg ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-100"
              }`}
            >

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  {msg.role === "assistant" ? (
                    <>
                      <Bot
                        size={18}
                        className="text-cyan-400"
                      />

                      <span className="font-semibold text-cyan-400">
                        DevOps AI
                      </span>
                    </>
                  ) : (
                    <>
                      <User
                        size={18}
                        className="text-green-400"
                      />

                      <span className="font-semibold text-green-400">
                        You
                      </span>
                    </>
                  )}

                </div>

                {msg.role === "assistant" && (

                  <button
                    onClick={() => copyText(msg.content)}
                    className="rounded-lg bg-slate-700 p-2 hover:bg-slate-600 transition"
                  >

                    {copied ? (

                      <Check
                        size={16}
                        className="text-green-400"
                      />

                    ) : (

                      <Copy
                        size={16}
                        className="text-white"
                      />

                    )}

                  </button>

                )}

              </div>

              <ReactMarkdown
                components={markdownComponents}
              >
                {msg.content}
              </ReactMarkdown>

            </div>

          </div>

        ))}

        {loading && (

          <div className="text-cyan-400 animate-pulse">

            🤖 DevOps AI is thinking...

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      <div className="mt-6">

        <PromptBox askAI={askAI} />

      </div>

    </div>

  );

}
