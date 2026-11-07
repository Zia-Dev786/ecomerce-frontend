import React, { useState, useRef, useEffect } from "react";
import { groqchatbot } from "../services/homeServices";
import {
  BsRobot,
  BsSendFill,
  BsPersonFill,
  BsStars,
} from "react-icons/bs";
import MarkdownRenderer from "../component/Chatresponse";

function ChatBot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 Welcome to our store. I'm your AI shopping assistant. Ask me about products, prices, orders, or shopping.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const chat = async (e) => {
    e.preventDefault();

    const text = query.trim();
    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
    ]);

    setQuery("");
    setLoading(true);

    try {
      const response = await groqchatbot(text);

      // Your API returns response.chat.content
      const answer = response?.chat?.content;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer || "Sorry, no response received.",
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-6 sm:px-6">
      <div className="mx-auto flex h-[85vh] max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-700 to-indigo-600 px-5 py-4 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <BsRobot className="text-2xl" />
          </div>

          <div className="flex-1">
            <h1 className="text-lg font-bold">
              Shopping Assistant
            </h1>
            <p className="text-sm text-blue-100">
              Ask about products, prices and orders
            </p>
          </div>

          <BsStars className="text-2xl text-yellow-300" />
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-4 sm:p-6">
          <div className="text-center">
            <span className="rounded-full bg-white px-4 py-2 text-xs text-gray-500 shadow-sm">
              AI Shopping Assistant
            </span>
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <BsRobot />
                </div>
              )}

              <div
                className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-blue-600 text-white"
                    : "rounded-bl-sm border border-gray-100 bg-white text-gray-800 shadow-sm"
                }`}
              >

                <MarkdownRenderer content={msg.content}/>
              
              </div>

              {msg.role === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <BsPersonFill />
                </div>
              )}
            </div>
          ))}

          {/* Loading animation */}
          {loading && (
            <div className="flex items-end gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
                <BsRobot />
              </div>

              <div className="flex items-center gap-1 rounded-2xl bg-white px-5 py-4 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={chat}
          className="border-t border-gray-200 bg-white p-4 sm:p-5"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about products, prices, orders..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              disabled={!query.trim() || loading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <BsSendFill className="text-lg" />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-gray-400">
            AI responses may not always be accurate.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
