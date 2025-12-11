import { Bot, User, Flower2 } from "lucide-react";

export interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
    image?: string;
  };
  variant?: "default" | "women";
}

const ChatMessage = ({ message, variant = "default" }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";
  const isWomen = variant === "women";

  return (
    <div className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"} animate-fade-in`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAssistant
            ? isWomen 
              ? "bg-gradient-women text-white" 
              : "bg-gradient-primary text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isAssistant ? (
          isWomen ? <Flower2 className="w-4 h-4" /> : <Bot className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isAssistant
            ? isWomen 
              ? "bg-card border border-women-rose-light/30" 
              : "bg-card border border-border"
            : isWomen
              ? "bg-gradient-women text-white"
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