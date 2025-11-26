import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
    image?: string;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"} animate-fade-in`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAssistant
            ? "bg-gradient-primary text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isAssistant
            ? "bg-card border border-border"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="Uploaded"
            className="rounded-lg mb-2 max-w-full h-auto"
          />
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;