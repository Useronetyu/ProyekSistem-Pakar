import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptionCard from "@/components/OptionCard";
import ResultCard from "@/components/ResultCard";
import {
  inferDestination,
  purposeOptions,
  timeOptions,
  durationOptions,
  type UserInput,
} from "@/lib/inference";
import { getDestination, type Destination } from "@/lib/destinations";
import { addToHistory } from "@/lib/history";
import { toast } from "@/hooks/use-toast";
import { Target, Clock, Timer, Search, AlertCircle } from "lucide-react";

const Consultation = () => {
  const [input, setInput] = useState<UserInput>({
    purpose: "",
    time: "",
    duration: "",
  });
  const [result, setResult] = useState<{
    destination: Destination | null;
    matchedRule: number | null;
  } | null>(null);
  
  // Track if we've already saved this result to avoid duplicates
  const savedResultRef = useRef<string | null>(null);

  // Save to history when result is shown
  useEffect(() => {
    if (result?.destination && savedResultRef.current !== result.destination.id) {
      const purposeLabel = purposeOptions.find((o) => o.code === input.purpose)?.label || "";
      const timeLabel = timeOptions.find((o) => o.code === input.time)?.label || "";
      const durationLabel = durationOptions.find((o) => o.code === input.duration)?.label || "";

      addToHistory({
        inputs: {
          purpose: input.purpose,
          purposeLabel,
          time: input.time,
          timeLabel,
          duration: input.duration,
          durationLabel,
        },
        result: {
          id: result.destination.id,
          name: result.destination.name,
        },
      });

      savedResultRef.current = result.destination.id;

      toast({
        title: "Tersimpan",
        description: "Hasil konsultasi telah disimpan ke riwayat.",
      });
    }
  }, [result, input]);

  const handleSubmit = () => {
    const { result: destinationId, matchedRule } = inferDestination(input);
    const destination = getDestination(destinationId);
    setResult({
      destination: destination || null,
      matchedRule: matchedRule?.id || null,
    });
  };

  const handleReset = () => {
    setInput({ purpose: "", time: "", duration: "" });
    setResult(null);
    savedResultRef.current = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isComplete = input.purpose && input.time && input.duration;

  // Show result if available
  if (result?.destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-16 bg-gradient-cream batik-pattern">
          <div className="container max-w-3xl">
            <ResultCard
              destination={result.destination}
              matchedRule={result.matchedRule}
              onReset={handleReset}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16 bg-gradient-cream batik-pattern">
        <div className="container max-w-4xl">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Konsultasi Wisata Gamelan
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Jawab beberapa pertanyaan berikut untuk mendapatkan rekomendasi destinasi
              wisata gamelan yang sesuai dengan preferensi Anda.
            </p>
          </div>

          <div className="space-y-8">
            {/* Section 1: Purpose */}
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader className="bg-secondary/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Tujuan Kunjungan</CardTitle>
                    <CardDescription>
                      Apa yang ingin Anda lakukan atau alami?
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {purposeOptions.map((option) => (
                    <OptionCard
                      key={option.code}
                      code={option.code}
                      label={option.label}
                      selected={input.purpose === option.code}
                      onClick={() => setInput({ ...input, purpose: option.code })}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Time */}
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader className="bg-secondary/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Waktu Kunjungan</CardTitle>
                    <CardDescription>
                      Kapan Anda berencana untuk berkunjung?
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {timeOptions.map((option) => (
                    <OptionCard
                      key={option.code}
                      code={option.code}
                      label={option.label}
                      selected={input.time === option.code}
                      onClick={() => setInput({ ...input, time: option.code })}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Duration */}
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader className="bg-secondary/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Timer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Durasi Kunjungan</CardTitle>
                    <CardDescription>
                      Berapa lama waktu yang Anda sediakan?
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {durationOptions.map((option) => (
                    <OptionCard
                      key={option.code}
                      code={option.code}
                      label={option.label}
                      selected={input.duration === option.code}
                      onClick={() => setInput({ ...input, duration: option.code })}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit section */}
            <div className="text-center space-y-4">
              {!isComplete && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Pilih satu opsi dari setiap kategori untuk melanjutkan</span>
                </div>
              )}
              <Button
                variant="hero"
                size="xl"
                className="gap-2"
                disabled={!isComplete}
                onClick={handleSubmit}
              >
                <Search className="h-5 w-5" />
                Mulai Konsultasi
              </Button>
            </div>

            {/* Selected summary */}
            {(input.purpose || input.time || input.duration) && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pilihan Anda:</span>
                  {input.purpose && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {purposeOptions.find((o) => o.code === input.purpose)?.label}
                    </span>
                  )}
                  {input.time && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {timeOptions.find((o) => o.code === input.time)?.label}
                    </span>
                  )}
                  {input.duration && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {durationOptions.find((o) => o.code === input.duration)?.label}
                    </span>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Consultation;
