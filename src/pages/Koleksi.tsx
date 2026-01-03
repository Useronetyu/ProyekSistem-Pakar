import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { destinationsList, type Destination } from "@/lib/destinations";
import { MapPin, Clock, Ticket, Library, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";

const Koleksi = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return destinationsList;
    const query = searchQuery.toLowerCase();
    return destinationsList.filter(
      (dest) =>
        dest.name.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query) ||
        dest.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCardClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setSheetOpen(true);
  };

  const handleConsultationClick = () => {
    if (isAuthenticated) {
      navigate("/konsultasi");
    } else {
      toast({ title: t.loginRequired, variant: "destructive" });
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
        className="flex-1 py-8 md:py-16 bg-gradient-cream batik-pattern"
      >
        <div className="container max-w-6xl px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Library className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.collectionTitle}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              {t.collectionSubtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <Card
                key={destination.id}
                variant="elevated"
                className="overflow-hidden cursor-pointer group hover:shadow-gold transition-all duration-300"
                onClick={() => handleCardClick(destination)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {destination.id}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {destination.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{destination.hours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada destinasi yang ditemukan.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ingin rekomendasi destinasi yang sesuai dengan preferensi Anda?
            </p>
            <Button variant="hero" className="gap-2" onClick={handleConsultationClick}>
              {t.startConsultation}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.main>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          {selectedDestination && (
            <>
              <SheetHeader>
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                    {selectedDestination.id}
                  </span>
                </div>
                <SheetTitle className="font-serif text-xl">{selectedDestination.name}</SheetTitle>
                <SheetDescription className="text-left">{selectedDestination.description}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img src={selectedDestination.image} alt={selectedDestination.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                      <p className="text-sm font-medium">Keraton Yogyakarta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t.operatingHours}</p>
                      <p className="text-sm font-medium">{selectedDestination.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Ticket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t.ticketPrice}</p>
                      <p className="text-sm font-medium">{selectedDestination.price || "Gratis"}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="hero" className="w-full gap-2" onClick={handleConsultationClick}>
                    {t.startConsultation}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default Koleksi;
