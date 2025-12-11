import { useState } from "react";
import { Heart, Flower2, Moon, Sparkles, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WomensHealthChat from "@/components/WomensHealthChat";
import HealthTopicCard from "@/components/HealthTopicCard";
import AlertCard from "@/components/AlertCard";

const WomensHealth = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const healthTopics = [
    {
      id: "menstrual",
      icon: Moon,
      title: "Menstrual Health",
      description: "Track cycles, understand symptoms, and get personalized insights about your period health.",
      color: "rose" as const,
    },
    {
      id: "pcos",
      icon: Sparkles,
      title: "PCOS Support",
      description: "Understand PCOS indicators, manage symptoms, and get lifestyle recommendations.",
      color: "lavender" as const,
    },
    {
      id: "skin",
      icon: Flower2,
      title: "Hormonal Skin Care",
      description: "Address acne, dryness, and other skin issues related to hormonal changes.",
      color: "peach" as const,
    },
    {
      id: "wellness",
      icon: Heart,
      title: "General Wellness",
      description: "Nutrition, exercise, mental health, and holistic well-being guidance.",
      color: "blush" as const,
    },
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gradient-women-soft">
      {/* Header */}
      <header className="border-b border-women-rose-light/30 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-women-rose hover:bg-women-rose/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-women flex items-center justify-center shadow-md">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Women's Health</h1>
                <p className="text-xs text-muted-foreground">Your Wellness Companion</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setShowChat(true)}
            className="bg-gradient-women hover:opacity-90 transition-opacity shadow-md text-white"
          >
            Start Chat
          </Button>
        </div>
      </header>

      {!showChat ? (
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <section className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-women flex items-center justify-center shadow-women mx-auto">
                <Flower2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Caring for <span className="text-transparent bg-clip-text bg-gradient-women">Your Well-being</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get personalized guidance on menstrual health, PCOS, hormonal skin care, and overall wellness. 
              We're here to support you every step of the way.
            </p>
          </section>

          {/* Alert Banner */}
          <AlertCard 
            type="info"
            title="We're Here for You"
            message="This assistant provides general wellness guidance. For serious symptoms, always consult a healthcare professional."
          />

          {/* Health Topics */}
          <section className="grid md:grid-cols-2 gap-6 mb-12 mt-8">
            {healthTopics.map((topic, idx) => (
              <HealthTopicCard
                key={topic.id}
                icon={topic.icon}
                title={topic.title}
                description={topic.description}
                color={topic.color}
                onClick={() => handleTopicSelect(topic.id)}
                delay={idx * 0.1}
              />
            ))}
          </section>

          {/* Serious Symptoms Alert */}
          <section className="mb-12">
            <AlertCard 
              type="warning"
              title="When to Seek Immediate Help"
              message="Severe abdominal pain, heavy bleeding, fainting, high fever, or sudden vision changes require immediate medical attention. Don't wait – visit a doctor or emergency room."
              icon={AlertTriangle}
            />
          </section>

          {/* Quick Start CTA */}
          <section className="text-center">
            <div className="bg-gradient-women rounded-3xl p-12 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Talk?</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Share your concerns in your own words. Our AI assistant provides supportive, 
                judgment-free guidance tailored to your needs.
              </p>
              <Button 
                onClick={() => setShowChat(true)}
                size="lg"
                className="bg-white text-women-rose hover:bg-white/90 shadow-lg text-lg px-8 py-6 h-auto"
              >
                <Heart className="mr-2 h-5 w-5" />
                Begin Your Consultation
              </Button>
            </div>
          </section>
        </main>
      ) : (
        <WomensHealthChat 
          onBack={() => {
            setShowChat(false);
            setSelectedTopic(null);
          }} 
          initialTopic={selectedTopic}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-women-rose-light/30 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 HealthMate AI - Women's Health. For informational purposes only. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default WomensHealth;
