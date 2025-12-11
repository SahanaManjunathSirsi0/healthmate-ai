import { useState } from "react";
import { Heart, MessageCircle, Image as ImageIcon, Mic, Shield, Clock, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HealthMate AI</h1>
              <p className="text-xs text-muted-foreground">Your Healthcare Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/womens-health">
              <Button variant="outline" className="border-women-rose/30 text-women-rose hover:bg-women-rose/10">
                <Flower2 className="w-4 h-4 mr-2" />
                Women's Health
              </Button>
            </Link>
            <Button 
              onClick={() => setShowChat(true)}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-md"
            >
              Start Chat
            </Button>
          </div>
        </div>
      </header>

      {!showChat ? (
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <section className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow mx-auto animate-pulse-glow">
                <Heart className="w-12 h-12 text-white" fill="white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Your Personal <span className="text-transparent bg-clip-text bg-gradient-hero">Healthcare Assistant</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get instant health guidance through text, voice, or images. Available in multiple languages with empathetic AI support.
            </p>
            <Button 
              onClick={() => setShowChat(true)}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-all shadow-lg hover:shadow-glow text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Your Health Consultation
            </Button>
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all animate-slide-up">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Language Support</h3>
              <p className="text-muted-foreground">
                Communicate in your preferred language - English, Hindi, Kannada, Telugu, Tamil, Malayalam, Marathi, and more.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Image Analysis</h3>
              <p className="text-muted-foreground">
                Upload photos of symptoms for visual assessment. We analyze rashes, swelling, wounds, and more.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Voice Input</h3>
              <p className="text-muted-foreground">
                Describe your symptoms using voice. Our AI understands and responds naturally.
              </p>
            </div>
          </section>

          {/* Women's Health Promo */}
          <section className="mb-16">
            <Link to="/womens-health">
              <div className="bg-gradient-women rounded-3xl p-8 md:p-12 text-white shadow-xl hover:shadow-women transition-all cursor-pointer group">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Flower2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Women's Health Assistant</h3>
                    <p className="text-white/90 max-w-2xl">
                      Specialized support for menstrual health, PCOS, hormonal skin care, and wellness. 
                      A safe, supportive space designed just for you.
                    </p>
                  </div>
                  <Button className="bg-white text-women-rose hover:bg-white/90 shadow-lg">
                    Explore Now
                  </Button>
                </div>
              </div>
            </Link>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-center text-foreground mb-8">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Describe", desc: "Share your symptoms via text, voice, or image" },
                { step: "2", title: "Analyze", desc: "AI examines your input and asks relevant questions" },
                { step: "3", title: "Guidance", desc: "Receive possible causes and safe home-care tips" },
                { step: "4", title: "Action", desc: "Get advice on when to seek professional help" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Note */}
          <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Important Disclaimer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  HealthMate AI is a support tool, not a medical professional. We provide general health information and guidance, but we do not diagnose, prescribe medications, or replace professional medical advice. 
                  <span className="text-accent font-medium"> Always consult a healthcare provider for serious symptoms or emergencies.</span>
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-hero rounded-2xl p-12 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Start your health consultation now. Our AI assistant is available 24/7 to help you.
              </p>
              <Button 
                onClick={() => setShowChat(true)}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 py-6 h-auto"
              >
                <Clock className="mr-2 h-5 w-5" />
                Begin Consultation Now
              </Button>
            </div>
          </section>
        </main>
      ) : (
        <ChatInterface onBack={() => setShowChat(false)} />
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 HealthMate AI. For informational purposes only. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;