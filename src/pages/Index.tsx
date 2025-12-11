import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, MessageCircle, Image as ImageIcon, Mic, Shield, Clock, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import AppLanguageSelector from "@/components/AppLanguageSelector";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const { t } = useTranslation();

  const howItWorksSteps = [
    { step: "1", title: t("howItWorks.steps.describe.title"), desc: t("howItWorks.steps.describe.desc") },
    { step: "2", title: t("howItWorks.steps.analyze.title"), desc: t("howItWorks.steps.analyze.desc") },
    { step: "3", title: t("howItWorks.steps.guidance.title"), desc: t("howItWorks.steps.guidance.desc") },
    { step: "4", title: t("howItWorks.steps.action.title"), desc: t("howItWorks.steps.action.desc") },
  ];

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
              <h1 className="text-xl font-bold text-foreground">{t("header.title")}</h1>
              <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AppLanguageSelector />
            <Link to="/womens-health">
              <Button variant="outline" className="border-women-rose/30 text-women-rose hover:bg-women-rose/10">
                <Flower2 className="w-4 h-4 mr-2" />
                {t("header.womensHealth")}
              </Button>
            </Link>
            <Button 
              onClick={() => setShowChat(true)}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-md"
            >
              {t("header.startChat")}
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
              {t("hero.title")} <span className="text-transparent bg-clip-text bg-gradient-hero">{t("hero.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("hero.description")}
            </p>
            <Button 
              onClick={() => setShowChat(true)}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-all shadow-lg hover:shadow-glow text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t("hero.cta")}
            </Button>
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all animate-slide-up">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("features.multiLanguage.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.multiLanguage.description")}
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("features.imageAnalysis.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.imageAnalysis.description")}
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("features.voiceInput.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.voiceInput.description")}
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
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{t("womensHealthPromo.title")}</h3>
                    <p className="text-white/90 max-w-2xl">
                      {t("womensHealthPromo.description")}
                    </p>
                  </div>
                  <Button className="bg-white text-women-rose hover:bg-white/90 shadow-lg">
                    {t("womensHealthPromo.cta")}
                  </Button>
                </div>
              </div>
            </Link>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-center text-foreground mb-8">{t("howItWorks.title")}</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {howItWorksSteps.map((item, idx) => (
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
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("disclaimer.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("disclaimer.text")}
                  <span className="text-accent font-medium"> {t("disclaimer.highlight")}</span>
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-hero rounded-2xl p-12 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">{t("cta.title")}</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                {t("cta.description")}
              </p>
              <Button 
                onClick={() => setShowChat(true)}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 py-6 h-auto"
              >
                <Clock className="mr-2 h-5 w-5" />
                {t("cta.button")}
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
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
