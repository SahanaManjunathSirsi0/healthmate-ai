import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Loader2, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import ImageUpload from "./ImageUpload";
import VoiceInput from "./VoiceInput";
import LanguageSelector from "./LanguageSelector";
import AlertCard from "./AlertCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface WomensHealthChatProps {
  onBack: () => void;
  initialTopic?: string | null;
}

const topicPrompts: Record<string, string> = {
  menstrual: "I'd like to discuss my menstrual health. ",
  pcos: "I have concerns about PCOS symptoms. ",
  skin: "I'm experiencing hormonal skin issues. ",
  wellness: "I'd like general wellness guidance. ",
};

const WomensHealthChat = ({ onBack, initialTopic }: WomensHealthChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialTopic ? topicPrompts[initialTopic] || "" : "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("healthmate-chat", {
        body: {
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.image
              ? [
                  { type: "text", text: m.content || "Please analyze this image." },
                  { type: "image_url", image_url: { url: m.image } },
                ]
              : m.content,
          })),
          language,
          mode: "women",
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "I apologize, but I couldn't generate a response. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Chat Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-women-rose-light/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-women-rose hover:bg-women-rose/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-women flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Women's Health Assistant</h2>
              <p className="text-xs text-muted-foreground">Here to support you</p>
            </div>
          </div>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-women-soft">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-women flex items-center justify-center mx-auto mb-6 shadow-women">
              <Flower2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to Women's Health</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Share your concerns about menstrual health, PCOS, hormonal skin issues, or general wellness. 
              I'm here to provide supportive, judgment-free guidance.
            </p>
            <div className="max-w-lg mx-auto">
              <AlertCard 
                type="info"
                title="Safe Space"
                message="Your privacy matters. This conversation stays between us, and I'm here to help without judgment."
              />
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            variant="women"
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-women-rose-light/30 p-4">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img src={selectedImage} alt="Selected" className="h-20 rounded-xl object-cover border border-women-rose-light/30" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-women-rose text-white flex items-center justify-center text-sm hover:bg-women-rose/80"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <ImageUpload onImageSelect={setSelectedImage} />
          <VoiceInput onTranscript={(text) => setInput((prev) => prev + text)} />
          
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your symptoms or concerns..."
              className="resize-none border-women-rose-light/30 focus:border-women-rose/50 focus:ring-women-rose/30 rounded-2xl min-h-[48px] max-h-32"
              rows={1}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="bg-gradient-women hover:opacity-90 text-white rounded-xl h-12 w-12 p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WomensHealthChat;
