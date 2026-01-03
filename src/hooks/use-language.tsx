import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "id" | "en";

interface Translations {
  // Navigation
  navHome: string;
  navConsultation: string;
  navCollection: string;
  navMap: string;
  navHistory: string;
  navLogin: string;
  navProfile: string;
  navSettings: string;
  navLogout: string;
  
  // Home page
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCta: string;
  statsTitle: string;
  statsSubtitle: string;
  statInstruments: string;
  statTypes: string;
  statHistory: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  tryNow: string;
  
  // Auth
  loginTitle: string;
  loginSubtitle: string;
  registerTitle: string;
  registerSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  loginButton: string;
  registerButton: string;
  noAccount: string;
  hasAccount: string;
  
  // Profile & Settings
  profileTitle: string;
  memberSince: string;
  totalConsultations: string;
  settingsTitle: string;
  settingsAppearance: string;
  settingsLanguage: string;
  settingsNotifications: string;
  settingsAccount: string;
  deleteAccount: string;
  darkMode: string;
  emailNotifications: string;
  
  // Collection
  collectionTitle: string;
  collectionSubtitle: string;
  searchPlaceholder: string;
  
  // Common
  expertSystem: string;
  startConsultation: string;
  whatsappAdmin: string;
  location: string;
  operatingHours: string;
  ticketPrice: string;
  historicalValue: string;
  recommendationFound: string;
  
  // Toast messages
  loginRequired: string;
  loginSuccess: string;
  logoutSuccess: string;
  registerSuccess: string;
}

const translations: Record<Language, Translations> = {
  id: {
    navHome: "Beranda",
    navConsultation: "Konsultasi",
    navCollection: "Koleksi",
    navMap: "Peta",
    navHistory: "Riwayat",
    navLogin: "Masuk",
    navProfile: "Profil",
    navSettings: "Pengaturan",
    navLogout: "Keluar",
    
    heroTitle: "Temukan Harmoni",
    heroHighlight: "Gamelan",
    heroSubtitle: "Eksplorasi keindahan dan filosofi Gamelan Yogyakarta melalui sistem pakar interaktif. Dapatkan rekomendasi destinasi wisata yang sesuai dengan preferensi Anda.",
    heroCta: "Mulai Konsultasi",
    statsTitle: "Warisan Budaya Nusantara",
    statsSubtitle: "Gamelan adalah warisan budaya Indonesia yang diakui dunia",
    statInstruments: "Instrumen Gamelan",
    statTypes: "Jenis Gamelan",
    statHistory: "Tahun Sejarah",
    howItWorksTitle: "Bagaimana Sistem Bekerja",
    howItWorksSubtitle: "Tiga langkah mudah untuk menemukan destinasi gamelan yang sempurna",
    step1Title: "Pilih Tujuan",
    step1Desc: "Tentukan apa yang ingin Anda alami - menonton, belajar, atau dokumentasi",
    step2Title: "Atur Waktu",
    step2Desc: "Pilih waktu kunjungan dan durasi yang sesuai dengan jadwal Anda",
    step3Title: "Dapatkan Rekomendasi",
    step3Desc: "Sistem pakar akan menganalisis dan memberikan rekomendasi terbaik",
    tryNow: "Coba Sekarang",
    
    loginTitle: "Selamat Datang Kembali",
    loginSubtitle: "Masuk untuk melanjutkan ke Gamelan Harmony",
    registerTitle: "Daftar Akun Baru",
    registerSubtitle: "Buat akun untuk menikmati fitur lengkap",
    emailLabel: "Email",
    passwordLabel: "Password",
    nameLabel: "Nama Lengkap",
    loginButton: "Masuk",
    registerButton: "Daftar",
    noAccount: "Belum punya akun?",
    hasAccount: "Sudah punya akun?",
    
    profileTitle: "Profil Saya",
    memberSince: "Member sejak",
    totalConsultations: "Total Konsultasi",
    settingsTitle: "Pengaturan",
    settingsAppearance: "Tampilan",
    settingsLanguage: "Bahasa",
    settingsNotifications: "Notifikasi",
    settingsAccount: "Akun",
    deleteAccount: "Hapus Akun",
    darkMode: "Mode Gelap",
    emailNotifications: "Notifikasi Email",
    
    collectionTitle: "Koleksi Wisata Gamelan",
    collectionSubtitle: "Jelajahi semua destinasi wisata gamelan di Keraton Yogyakarta",
    searchPlaceholder: "Cari destinasi...",
    
    expertSystem: "Sistem Pakar Wisata Budaya",
    startConsultation: "Mulai Konsultasi",
    whatsappAdmin: "Tanya Admin via WhatsApp",
    location: "Lokasi",
    operatingHours: "Jam Operasional",
    ticketPrice: "Harga Tiket",
    historicalValue: "Nilai Sejarah",
    recommendationFound: "Rekomendasi Ditemukan",
    
    loginRequired: "Maaf, silakan Login atau Daftar terlebih dahulu untuk memulai konsultasi.",
    loginSuccess: "Berhasil masuk!",
    logoutSuccess: "Berhasil keluar",
    registerSuccess: "Akun berhasil dibuat. Silakan login.",
  },
  en: {
    navHome: "Home",
    navConsultation: "Consultation",
    navCollection: "Collection",
    navMap: "Map",
    navHistory: "History",
    navLogin: "Login",
    navProfile: "Profile",
    navSettings: "Settings",
    navLogout: "Logout",
    
    heroTitle: "Discover the Harmony of",
    heroHighlight: "Gamelan",
    heroSubtitle: "Explore the beauty and philosophy of Yogyakarta Gamelan through an interactive expert system. Get tourism destination recommendations that match your preferences.",
    heroCta: "Start Consultation",
    statsTitle: "Indonesian Cultural Heritage",
    statsSubtitle: "Gamelan is a world-recognized Indonesian cultural heritage",
    statInstruments: "Gamelan Instruments",
    statTypes: "Gamelan Types",
    statHistory: "Years of History",
    howItWorksTitle: "How the System Works",
    howItWorksSubtitle: "Three easy steps to find the perfect gamelan destination",
    step1Title: "Choose Purpose",
    step1Desc: "Determine what you want to experience - watch, learn, or document",
    step2Title: "Set Time",
    step2Desc: "Choose visit time and duration that fits your schedule",
    step3Title: "Get Recommendations",
    step3Desc: "The expert system will analyze and provide the best recommendations",
    tryNow: "Try Now",
    
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to continue to Gamelan Harmony",
    registerTitle: "Create New Account",
    registerSubtitle: "Create an account to enjoy full features",
    emailLabel: "Email",
    passwordLabel: "Password",
    nameLabel: "Full Name",
    loginButton: "Sign In",
    registerButton: "Sign Up",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    
    profileTitle: "My Profile",
    memberSince: "Member since",
    totalConsultations: "Total Consultations",
    settingsTitle: "Settings",
    settingsAppearance: "Appearance",
    settingsLanguage: "Language",
    settingsNotifications: "Notifications",
    settingsAccount: "Account",
    deleteAccount: "Delete Account",
    darkMode: "Dark Mode",
    emailNotifications: "Email Notifications",
    
    collectionTitle: "Gamelan Tourism Collection",
    collectionSubtitle: "Explore all gamelan tourism destinations at Keraton Yogyakarta",
    searchPlaceholder: "Search destinations...",
    
    expertSystem: "Cultural Tourism Expert System",
    startConsultation: "Start Consultation",
    whatsappAdmin: "Ask Admin via WhatsApp",
    location: "Location",
    operatingHours: "Operating Hours",
    ticketPrice: "Ticket Price",
    historicalValue: "Historical Significance",
    recommendationFound: "Recommendation Found",
    
    loginRequired: "Sorry, please Login or Register first to start a consultation.",
    loginSuccess: "Successfully logged in!",
    logoutSuccess: "Successfully logged out",
    registerSuccess: "Account created successfully. Please login.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = "gamelan-language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language;
    if (stored && (stored === "id" || stored === "en")) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
