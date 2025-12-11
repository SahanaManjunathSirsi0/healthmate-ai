import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Flower2, Moon, Sparkles, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WomensHealthChat from "@/components/WomensHealthChat";
import HealthTopicCard from "@/components/HealthTopicCard";
import AlertCard from "@/components/AlertCard";
import AppLanguageSelector from "@/components/AppLanguageSelector";

const WomensHealth = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { t } = useTranslation();

  const healthTopics = [
    {
      id: "menstrual",
      icon: Moon,
      title: t("women.topics.menstrual.title"),
      description: t("women.topics.menstrual.description"),
      color: "rose" as const,
    },
    {
      id: "pcos",
      icon: Sparkles,
      title: t("women.topics.pcos.title"),
      description: t("women.topics.pcos.description"),
      color: "lavender" as const,
    },
    {
      id: "skin",
      icon: Flower2,
      title: t("women.topics.skin.title"),
      description: t("women.topics.skin.description"),
      color: "peach" as const,
    },
    {
      id: "wellness",
      icon: Heart,
      title: t("women.topics.wellness.title"),
      description: t("women.topics.wellness.description"),
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
                <h1 className="text-xl font-bold text-foreground">{t("women.header.title")}</h1>
                <p className="text-xs text-muted-foreground">{t("women.header.subtitle")}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AppLanguageSelector variant="women" />
            <Button 
              onClick={() => setShowChat(true)}
              className="bg-gradient-women hover:opacity-90 transition-opacity shadow-md text-white"
            >
              {t("header.startChat")}
            </Button>
          </div>
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
              {t("women.hero.title")} <span className="text-transparent bg-clip-text bg-gradient-women">{t("women.hero.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("women.hero.description")}
            </p>
          </section>

          {/* Alert Banner */}
          <AlertCard 
            type="info"
            title={t("women.alerts.info.title")}
            message={t("women.alerts.info.message")}
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
              title={t("women.alerts.warning.title")}
              message={t("women.alerts.warning.message")}
              icon={AlertTriangle}
            />
          </section>

          {/* Quick Start CTA */}
          <section className="text-center">
            <div className="bg-gradient-women rounded-3xl p-12 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">{t("women.cta.title")}</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                {t("women.cta.description")}
              </p>
              <Button 
                onClick={() => setShowChat(true)}
                size="lg"
                className="bg-white text-women-rose hover:bg-white/90 shadow-lg text-lg px-8 py-6 h-auto"
              >
                <Heart className="mr-2 h-5 w-5" />
                {t("women.cta.button")}
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
          <p>{t("women.footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
};

export default WomensHealth;
