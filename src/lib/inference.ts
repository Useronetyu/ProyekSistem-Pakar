// Forward Chaining Inference Engine for Gamelan Tourism Expert System

export interface UserInput {
  purpose: string; // G01-G05: Tujuan Kunjungan
  time: string;    // I01-I03: Waktu Kunjungan
  duration: string; // J01-J03: Durasi Kunjungan
}

export interface Rule {
  id: number;
  condition: {
    purpose: string;
    time: string;
    duration: string;
  };
  result: string;
}

// Knowledge base: Rules from the expert system
const rules: Rule[] = [
  // Rule 1: IF (G01 AND I01 AND J02) THEN Result = H01
  { id: 1, condition: { purpose: "G01", time: "I01", duration: "J02" }, result: "H01" },
  // Rule 2: IF (G01 AND I02 AND J01) THEN Result = H01
  { id: 2, condition: { purpose: "G01", time: "I02", duration: "J01" }, result: "H01" },
  // Rule 3: IF (G02 AND I01 AND J02) THEN Result = H02
  { id: 3, condition: { purpose: "G02", time: "I01", duration: "J02" }, result: "H02" },
  // Rule 4: IF (G02 AND I02 AND J03) THEN Result = H02
  { id: 4, condition: { purpose: "G02", time: "I02", duration: "J03" }, result: "H02" },
  // Rule 5: IF (G03 AND I03 AND J02) THEN Result = H03
  { id: 5, condition: { purpose: "G03", time: "I03", duration: "J02" }, result: "H03" },
  // Rule 6: IF (G03 AND I02 AND J03) THEN Result = H03
  { id: 6, condition: { purpose: "G03", time: "I02", duration: "J03" }, result: "H03" },
  // Rule 7: IF (G04 AND I01 AND J03) THEN Result = H04
  { id: 7, condition: { purpose: "G04", time: "I01", duration: "J03" }, result: "H04" },
  // Rule 8: IF (G04 AND I02 AND J02) THEN Result = H04
  { id: 8, condition: { purpose: "G04", time: "I02", duration: "J02" }, result: "H04" },
  // Rule 9: IF (G05 AND I01 AND J01) THEN Result = H05
  { id: 9, condition: { purpose: "G05", time: "I01", duration: "J01" }, result: "H05" },
  // Rule 10: IF (G05 AND I03 AND J02) THEN Result = H05
  { id: 10, condition: { purpose: "G05", time: "I03", duration: "J02" }, result: "H05" },
];

// Default fallback destination
const DEFAULT_RESULT = "H02";

/**
 * Forward Chaining Inference Engine
 * Evaluates user input against the rule base and returns the matching destination
 */
export const inferDestination = (input: UserInput): { result: string; matchedRule: Rule | null } => {
  // Validate input
  if (!input.purpose || !input.time || !input.duration) {
    return { result: DEFAULT_RESULT, matchedRule: null };
  }

  // Forward chaining: iterate through rules and find a match
  for (const rule of rules) {
    if (
      rule.condition.purpose === input.purpose &&
      rule.condition.time === input.time &&
      rule.condition.duration === input.duration
    ) {
      return { result: rule.result, matchedRule: rule };
    }
  }

  // No exact match found, return default
  return { result: DEFAULT_RESULT, matchedRule: null };
};

// Option labels for display
export const purposeOptions = [
  { code: "G01", label: "Menonton Pertunjukan" },
  { code: "G02", label: "Belajar Bermain Gamelan" },
  { code: "G03", label: "Mempelajari Sejarah Gamelan" },
  { code: "G04", label: "Melihat Proses Pembuatan Gamelan" },
  { code: "G05", label: "Dokumentasi Kegiatan" },
];

export const timeOptions = [
  { code: "I01", label: "Pagi" },
  { code: "I02", label: "Siang" },
  { code: "I03", label: "Malam" },
];

export const durationOptions = [
  { code: "J01", label: "Singkat (1-2 Jam)" },
  { code: "J02", label: "Sedang (2-3 Jam)" },
  { code: "J03", label: "Lama (4+ Jam)" },
];
