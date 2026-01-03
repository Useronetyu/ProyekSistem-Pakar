import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getHistory,
  clearHistory,
  deleteFromHistory,
  formatTimestamp,
  downloadCSV,
  getUniqueDestinations,
  type ConsultationRecord,
} from "@/lib/history";
import { getDestination } from "@/lib/destinations";
import {
  History,
  Trash2,
  MapPin,
  Calendar,
  ArrowRight,
  FileX,
  X,
  Download,
  Filter,
  Search,
  Clock,
  Ticket,
  Target,
  Timer,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const Riwayat = () => {
  const [history, setHistory] = useState<ConsultationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Filter states
  const [destinationFilter, setDestinationFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const uniqueDestinations = useMemo(() => getUniqueDestinations(history), [history]);

  const filteredHistory = useMemo(() => {
    return history.filter((record) => {
      // Filter by destination
      if (destinationFilter !== "all" && record.result.name !== destinationFilter) {
        return false;
      }

      // Filter by date range
      const recordDate = new Date(record.timestamp);
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (recordDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (recordDate > end) return false;
      }

      return true;
    });
  }, [history, destinationFilter, startDate, endDate]);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    toast({
      title: "Riwayat Dihapus",
      description: "Semua riwayat konsultasi telah dihapus.",
    });
  };

  const handleDeleteRecord = (id: string) => {
    const success = deleteFromHistory(id);
    if (success) {
      setHistory((prev) => prev.filter((record) => record.id !== id));
      toast({
        title: "Riwayat Dihapus",
        description: "Satu riwayat konsultasi telah dihapus.",
      });
    }
  };

  const handleExportCSV = () => {
    downloadCSV(filteredHistory);
    toast({
      title: "Export Berhasil",
      description: `${filteredHistory.length} data berhasil diexport ke CSV.`,
    });
  };

  const handleCardClick = (record: ConsultationRecord) => {
    setSelectedRecord(record);
    setDetailDialogOpen(true);
  };

  const clearFilters = () => {
    setDestinationFilter("all");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters = destinationFilter !== "all" || startDate || endDate;

  const selectedDestination = selectedRecord ? getDestination(selectedRecord.result.id) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-16 bg-gradient-cream batik-pattern">
        <div className="container max-w-4xl px-4">
          {/* Page header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <History className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Riwayat Konsultasi
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Lihat kembali hasil konsultasi Anda sebelumnya
            </p>
          </div>

          {/* Actions bar */}
          {history.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                    Aktif
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <div className="flex-1" />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus Semua
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Semua Riwayat?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin menghapus semua riwayat konsultasi? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearHistory}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Hapus Semua
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {/* Filter panel */}
          {showFilters && history.length > 0 && (
            <Card variant="elevated" className="mb-6 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination-filter" className="text-sm flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Destinasi
                  </Label>
                  <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                    <SelectTrigger id="destination-filter">
                      <SelectValue placeholder="Semua Destinasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Destinasi</SelectItem>
                      {uniqueDestinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Dari Tanggal
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sampai Tanggal
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Reset Filter
                  </Button>
                </div>
              )}
            </Card>
          )}

          {/* History list */}
          {history.length === 0 ? (
            <Card variant="elevated" className="p-8 md:p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileX className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    Belum Ada Riwayat Konsultasi
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Mulai konsultasi untuk mendapatkan rekomendasi destinasi wisata gamelan
                  </p>
                  <Link to="/konsultasi">
                    <Button variant="hero" className="gap-2">
                      Mulai Konsultasi
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ) : filteredHistory.length === 0 ? (
            <Card variant="elevated" className="p-8 md:p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    Tidak Ada Hasil
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tidak ditemukan riwayat dengan filter yang dipilih
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Reset Filter
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((record) => (
                <Card
                  key={record.id}
                  variant="elevated"
                  className="overflow-hidden hover:shadow-gold transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleCardClick(record)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg">
                            {record.result.name}
                          </CardTitle>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span className="hidden sm:inline">{formatTimestamp(record.timestamp)}</span>
                            <span className="sm:hidden">{new Date(record.timestamp).toLocaleDateString("id-ID")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="shrink-0 px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {record.result.id}
                        </span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Riwayat Ini?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus riwayat konsultasi "{record.result.name}"? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteRecord(record.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                        {record.inputs.purposeLabel}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                        {record.inputs.timeLabel}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                        {record.inputs.durationLabel}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Summary */}
          {filteredHistory.length > 0 && (
            <div className="text-center mt-8 text-sm text-muted-foreground">
              Menampilkan {filteredHistory.length} dari {history.length} riwayat konsultasi
            </div>
          )}
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Detail Konsultasi
            </DialogTitle>
            <DialogDescription>
              {selectedRecord && formatTimestamp(selectedRecord.timestamp)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecord && selectedDestination && (
            <div className="space-y-6">
              {/* Result */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {selectedDestination.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedDestination.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{selectedDestination.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Ticket className="h-4 w-4 text-primary" />
                    <span>{selectedDestination.price || "Gratis"}</span>
                  </div>
                </div>
              </div>

              {/* Inputs used */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Input Konsultasi:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Tujuan Kunjungan</p>
                      <p className="text-sm font-medium">
                        {selectedRecord.inputs.purposeLabel}
                        <span className="ml-2 text-xs text-muted-foreground">({selectedRecord.inputs.purpose})</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Waktu Kunjungan</p>
                      <p className="text-sm font-medium">
                        {selectedRecord.inputs.timeLabel}
                        <span className="ml-2 text-xs text-muted-foreground">({selectedRecord.inputs.time})</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Timer className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Durasi Kunjungan</p>
                      <p className="text-sm font-medium">
                        {selectedRecord.inputs.durationLabel}
                        <span className="ml-2 text-xs text-muted-foreground">({selectedRecord.inputs.duration})</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Riwayat;
