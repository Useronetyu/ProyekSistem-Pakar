import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Ticket, ArrowLeft, Sparkles, MessageCircle, ScrollText } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import { useAuth } from "@/hooks/use-auth";

interface ResultCardProps {
  destination: Destination;
  matchedRule: number | null;
  onReset: () => void;
}

const ResultCard = ({ destination, matchedRule, onReset }: ResultCardProps) => {
  const { user } = useAuth();

  const handleWhatsApp = () => {
    const phone = "6288225691061";
    const userName = user?.name || "Pengguna";
    const message = encodeURIComponent(
      `Halo Admin Gamelan Harmony. Saya ${userName}, baru saja menyelesaikan konsultasi. Sistem merekomendasikan: *${destination.name}*. Saya ingin bertanya detail mengenai lokasi dan tiket masuk destinasi tersebut. Terima kasih.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-center gap-3 text-primary">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
        <Sparkles className="h-5 w-5" />
        <span className="text-sm font-medium">Rekomendasi Ditemukan</span>
        <Sparkles className="h-5 w-5" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <div 
          className="relative p-6 md:p-8 bg-cover bg-center min-h-[200px] flex items-center justify-center"
          style={{ backgroundImage: `url('${destination.image}')` }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative text-center">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-3">
              {destination.id}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              {destination.name}
            </h2>
          </div>
        </div>

        <CardContent className="p-4 md:p-6 space-y-6">
          <p className="text-muted-foreground leading-relaxed text-center">
            {destination.description}
          </p>

          <div className="p-4 md:p-5 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-lg font-semibold text-foreground">Nilai Sejarah</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{destination.history}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lokasi</p>
                <p className="text-sm font-medium">Keraton Yogyakarta</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Jam Operasional</p>
                <p className="text-sm font-medium">{destination.hours}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-secondary/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Ticket className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Harga Tiket</p>
                <p className="text-sm font-medium">{destination.price || "Gratis"}</p>
              </div>
            </div>
          </div>

          {matchedRule && (
            <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                Rekomendasi berdasarkan <span className="font-medium text-primary">Aturan #{matchedRule}</span> dalam basis pengetahuan
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Button variant="outline" size="lg" onClick={onReset} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Ulangi Konsultasi
            </Button>
            <Button 
              size="lg" 
              onClick={handleWhatsApp} 
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Tanya Admin via WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultCard;
