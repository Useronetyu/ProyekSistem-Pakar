import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import { ArrowRight, Music2, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleConsultationClick = () => {
    if (isAuthenticated) {
      navigate("/konsultasi");
    } else {
      toast({
        title: t.loginRequired,
        variant: "destructive",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/hero-kraton.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 batik-pattern opacity-30" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="container relative py-16 md:py-32 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-white">{t.expertSystem}</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight opacity-0 animate-fade-in-up stagger-1">
                {t.heroTitle}{" "}
                <span className="text-primary relative">{t.heroHighlight}</span>
              </h1>

              <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto opacity-0 animate-fade-in-up stagger-2">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-in-up stagger-3">
                <Button variant="hero" size="xl" className="gap-2 group" onClick={handleConsultationClick}>
                  <Music2 className="h-5 w-5" />
                  {t.heroCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-8 opacity-0 animate-fade-in-up stagger-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
                <span className="text-primary">◆</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">{t.statsTitle}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">{t.statsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard value="500+" label={t.statInstruments} delay="0.1s" />
              <StatCard value="15+" label={t.statTypes} delay="0.2s" />
              <StatCard value="100+" label={t.statHistory} delay="0.3s" />
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 md:py-24 bg-cream-dark/30 batik-pattern">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">{t.howItWorksTitle}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">{t.howItWorksSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { step: "01", title: t.step1Title, desc: t.step1Desc },
                { step: "02", title: t.step2Title, desc: t.step2Desc },
                { step: "03", title: t.step3Title, desc: t.step3Desc },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="text-center p-6 rounded-xl bg-background border border-border shadow-card opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-serif font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="gap-2" onClick={handleConsultationClick}>
                {t.tryNow}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Index;
