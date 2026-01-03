// Consultation history management with localStorage

export interface ConsultationRecord {
  id: string;
  timestamp: string;
  inputs: {
    purpose: string;
    purposeLabel: string;
    time: string;
    timeLabel: string;
    duration: string;
    durationLabel: string;
  };
  result: {
    id: string;
    name: string;
  };
}

const STORAGE_KEY = "gamelan-consultation-history";

/**
 * Get all consultation history from localStorage
 */
export const getHistory = (): ConsultationRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as ConsultationRecord[];
  } catch {
    console.error("Failed to read consultation history");
    return [];
  }
};

/**
 * Add a new consultation record to history
 */
export const addToHistory = (record: Omit<ConsultationRecord, "id" | "timestamp">): ConsultationRecord => {
  const history = getHistory();
  
  const newRecord: ConsultationRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...record,
  };

  // Add to beginning (most recent first)
  const updatedHistory = [newRecord, ...history];
  
  // Keep only last 50 records to prevent localStorage bloat
  const trimmedHistory = updatedHistory.slice(0, 50);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch {
    console.error("Failed to save consultation history");
  }

  return newRecord;
};

/**
 * Delete a single consultation record by ID
 */
export const deleteFromHistory = (id: string): boolean => {
  try {
    const history = getHistory();
    const updatedHistory = history.filter((record) => record.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch {
    console.error("Failed to delete consultation record");
    return false;
  }
};

/**
 * Clear all consultation history
 */
export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.error("Failed to clear consultation history");
  }
};

/**
 * Format timestamp for display in Indonesian locale
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format date only for display
 */
export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Export history to CSV format
 */
export const exportToCSV = (records: ConsultationRecord[]): string => {
  const headers = [
    "Tanggal",
    "Waktu",
    "Tujuan",
    "Waktu Kunjungan",
    "Durasi",
    "Hasil Rekomendasi",
    "Kode Hasil"
  ];

  const rows = records.map(record => {
    const date = new Date(record.timestamp);
    return [
      date.toLocaleDateString("id-ID"),
      date.toLocaleTimeString("id-ID"),
      record.inputs.purposeLabel,
      record.inputs.timeLabel,
      record.inputs.durationLabel,
      record.result.name,
      record.result.id
    ].map(cell => `"${cell}"`).join(",");
  });

  return [headers.join(","), ...rows].join("\n");
};

/**
 * Download CSV file
 */
export const downloadCSV = (records: ConsultationRecord[]): void => {
  const csv = exportToCSV(records);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `riwayat-konsultasi-${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Get unique destination names from history
 */
export const getUniqueDestinations = (records: ConsultationRecord[]): string[] => {
  const names = records.map(r => r.result.name);
  return [...new Set(names)];
};
