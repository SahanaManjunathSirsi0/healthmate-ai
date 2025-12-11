import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import ImageUpload from "./ImageUpload";
import VoiceInput from "./VoiceInput";
import LanguageSelector from "./LanguageSelector";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t("chat.welcomeMessage"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && !uploadedImage) || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      image: uploadedImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const currentImage = uploadedImage;
    setUploadedImage(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("healthmate-chat", {
        body: {
          messages: [...messages, userMessage],
          language,
          hasImage: !!currentImage,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chat.errorMessage"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Chat Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-foreground">{t("chat.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("chat.subtitle")}</p>
          </div>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.map((message, idx) => (
          <ChatMessage key={idx} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">{t("chat.thinking")}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {uploadedImage && (
            <div className="relative inline-block">
              <img
                src={uploadedImage}
                alt="Upload preview"
                className="h-20 rounded-lg border border-border"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={() => setUploadedImage(null)}
              >
                ×
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <ImageUpload onImageSelect={setUploadedImage} />
            <VoiceInput onTranscript={handleVoiceInput} />
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t("chat.placeholder")}
              className="flex-1 min-h-[44px] max-h-32 resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={(!input.trim() && !uploadedImage) || isLoading}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {t("chat.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
