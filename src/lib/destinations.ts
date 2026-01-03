// Destination database for Gamelan tourism recommendations

export interface Destination {
  id: string;
  name: string;
  description: string;
  hours: string;
  price?: string;
  image: string;
  history: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const destinations: Record<string, Destination> = {
  H01: {
    id: "H01",
    name: "Pagelaran Gamelan Bangsal Sri Menganti",
    description: "Menikmati pertunjukan gamelan autentik di lingkungan keraton yang sakral. Tempat ini menawarkan pengalaman mendalam mendengarkan alunan gamelan yang dimainkan oleh abdi dalem dengan latar belakang arsitektur keraton yang megah.",
    hours: "09.00 - 11.00 WIB",
    price: "Rp 15.000",
    image: "/images/dest-h01.jpg",
    history: "Dibangun pada tahun 1757 oleh Sri Sultan Hamengku Buwono I. Tempat ini menjadi saksi bisu berbagai upacara kenegaraan dan pertunjukan gamelan sakral untuk menyambut tamu kehormatan kerajaan.",
    coordinates: { lat: -7.8042, lng: 110.3644 },
  },
  H02: {
    id: "H02",
    name: "Museum Keraton Yogyakarta",
    description: "Menyimpan koleksi gamelan bersejarah dan artefak budaya Jawa yang tak ternilai harganya. Museum ini memamerkan berbagai jenis gamelan kuno, termasuk gamelan pusaka keraton yang berusia ratusan tahun.",
    hours: "08.30 - 14.00 WIB",
    price: "Rp 15.000",
    image: "/images/dest-h02.jpg",
    history: "Menyimpan koleksi pribadi Sri Sultan Hamengku Buwono IX. Gamelan di sini bukan sekadar alat musik, melainkan pusaka yang memiliki nama dan gelar kehormatan tersendiri, dirawat turun-temurun selama ratusan tahun.",
    coordinates: { lat: -7.8055, lng: 110.363 },
  },
  H03: {
    id: "H03",
    name: "Latihan Gamelan Abdi Dalem",
    description: "Melihat langsung aktivitas abdi dalem berlatih gamelan dalam suasana yang autentik. Pengunjung dapat menyaksikan proses latihan dan interaksi antar pemain gamelan secara langsung.",
    hours: "Jadwal Tentatif (Biasanya Malam)",
    price: "Gratis (dengan izin khusus)",
    image: "/images/dest-h03.jpg",
    history: "Merupakan tradisi hidup yang diteruskan oleh para Abdi Dalem. Latihan ini adalah bentuk pelestarian 'rasa' dan etika Jawa yang diajarkan melalui harmoni nada gamelan yang lembut.",
    coordinates: { lat: -7.806, lng: 110.365 },
  },
  H04: {
    id: "H04",
    name: "Sanggar Belajar Gamelan",
    description: "Tempat khusus untuk belajar teknis bermain gamelan dan melihat proses pembuatan instrumen tradisional. Sanggar ini menyediakan program pembelajaran dari dasar hingga mahir.",
    hours: "08.00 - 16.00 WIB",
    price: "Rp 50.000 - Rp 100.000",
    image: "/images/dest-h04.jpg",
    history: "Pusat regenerasi budaya di mana empu (ahli) gamelan menurunkan ilmu pembuatan gong dan bonang yang rumit, menggabungkan teknik metalurgi kuno dengan ritual spiritual.",
    coordinates: { lat: -7.8075, lng: 110.3625 },
  },
  H05: {
    id: "H05",
    name: "Tempat Perawatan & Konservasi",
    description: "Area konservasi dan dokumentasi perawatan instrumen gamelan kuno. Di sini pengunjung dapat mempelajari teknik tradisional merawat dan melestarikan gamelan bersejarah.",
    hours: "08.00 - 12.00 WIB",
    price: "Rp 25.000",
    image: "/images/dest-h05.jpg",
    history: "Lokasi dilaksanakannya ritual Jamasan (pembersihan) pusaka. Setiap instrumen diperlakukan layaknya manusia, dimandikan dengan air bunga setahun sekali pada bulan Suro untuk menjaga aura spiritualnya.",
    coordinates: { lat: -7.805, lng: 110.366 },
  },
};

export const destinationsList = Object.values(destinations);

export const getDestination = (id: string): Destination | undefined => {
  return destinations[id];
};
