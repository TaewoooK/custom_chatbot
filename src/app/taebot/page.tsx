"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, SendHorizonal, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import logo from "@/app/assets/logo.png";
import SideBar from "./SideBar";

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  function openNewTab(url: string) {
    window.open(url, "_blank");
  }

  return (
    <div className="2xl: flex h-[80vh] w-full p-1 md:h-[87vh] lg:h-[87vh] xl:h-[87vh] 2xl:h-[87vh]">
      <div className="flex h-full w-full flex-col rounded border bg-background align-middle shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content: "Something went wrong. Please try again!",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-lg font-medium">
                Send a message to start the AI chat!
              </p>
              <p>
                You can ask the chatbot any question about me and it will find
                the relevant information.
              </p>
              <p className="text-sm text-muted-foreground">*beta*</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex flex-none items-center justify-center"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <Trash size={24} />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Start by asking what to ask Taebot..."
            className="grow rounded border bg-background px-3 py-2"
            ref={inputRef}
          />
          <button
            type="submit"
            className="flex flex-none items-center justify-center disabled:opacity-50"
            disabled={isLoading || input.length === 0}
            title="Submit message"
          >
            <SendHorizonal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && (
        <Avatar>
          <AvatarImage src={logo.src} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
      <p
        className={cn(
          "rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-foreground text-background",
        )}
      >
        {content}
      </p>
    </div>
  );
}
