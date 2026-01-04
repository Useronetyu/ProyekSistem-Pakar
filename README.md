# 🎵 Gamelan Harmony: Sistem Pakar Wisata Budaya Yogyakarta

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind-yellow)

> **"Menemukan Harmoni dalam Setiap Destinasi."**
> Sistem Pakar Berbasis Website untuk Rekomendasi Objek Wisata Budaya Musik Gamelan di Daerah Kraton Yogyakarta.

---

## 📑 Daftar Isi
1. [Tentang Proyek](#-tentang-proyek)
2. [Latar Belakang Masalah](#-latar-belakang-masalah)
3. [Tim Pengembang](#-tim-pengembang-kelompok-8)
4. [Analisis & Metodologi](#-analisis--metodologi)
5. [Basis Pengetahuan (Knowledge Base)](#-basis-pengetahuan-knowledge-base)
6. [Implementasi Teknis](#-implementasi-teknis-bab-iv)
7. [Fitur Aplikasi](#-fitur-unggulan)
8. [Instalasi & Penggunaan](#-instalasi--penggunaan)

---

## 📖 Tentang Proyek

[cite_start]**Gamelan Harmony** adalah tugas akhir mata kuliah **Sistem Pakar** di **Universitas Putra Bangsa** (Semester Ganjil T.A 2024/2025)[cite: 10, 12].

Aplikasi ini berfungsi sebagai "pemandu digital" cerdas yang membantu wisatawan menemukan objek wisata gamelan di Yogyakarta. [cite_start]Sistem ini menggantikan peran seorang pakar manusia dengan cara menganalisis preferensi pengguna dan memberikan rekomendasi yang terpersonalisasi secara akurat[cite: 21, 22].

---

## 🚩 Latar Belakang Masalah

[cite_start]Yogyakarta, khususnya area **Kraton**, memiliki kekayaan wisata gamelan yang luar biasa[cite: 16]. Namun, terdapat kendala utama:
* [cite_start]**Asimetri Informasi:** Wisatawan sering mengalami kebingungan karena banyaknya opsi objek wisata (H01-H05)[cite: 18, 19].
* [cite_start]**Ketidaksesuaian:** Sulit menyesuaikan tujuan kunjungan dengan waktu dan durasi yang tersedia[cite: 19].
* [cite_start]**Pengalaman Belum Optimal:** Tanpa rekomendasi yang tepat, pengalaman wisata menjadi kurang maksimal[cite: 20].

[cite_start]**Solusi:** Membangun sistem pakar berbasis website untuk menjembatani kesenjangan informasi tersebut[cite: 22].

---

## 👥 Tim Pengembang (Kelompok 8)

| No | Nama Mahasiswa | NIM | Peran |
|----|----------------|-----|-------|
| 1 | **Eriqho Firdaus** | 230202747 | Project Lead & Logic |
| 2 | **Favian Rizky Febriansyah** | 230202753 | UI/UX Design |
| 3 | **Mochamad Ilham Hansyil** | 230202767 | Data & Programming |
| 4 | **Muhammad Farhan Alrafi** | 230202816 | Documentation |
| 5 | **Ratna Rizka Maharani** | 230202778 | Presentation |
[cite_start][cite: 9]

---

## 🧠 Analisis & Metodologi

[cite_start]Sistem ini menggunakan metode **Certainty Factor (CF)** dengan strategi pelacakan **Forward Chaining**[cite: 59].

### Mengapa Certainty Factor?
Karena preferensi wisatawan tidak bersifat mutlak (hitam-putih). [cite_start]CF memungkinkan sistem menangani ketidakpastian dengan memberikan bobot keyakinan pada setiap rekomendasi[cite: 51, 53].

### Logika Inferensi
1.  [cite_start]**Input:** Sistem menerima Fakta (Gejala, Hari, Durasi) dari pengguna[cite: 61].
2.  [cite_start]**Proses:** Mesin inferensi mencocokkan fakta dengan Aturan (Rules) yang ada[cite: 62].
3.  [cite_start]**Kalkulasi:** Menggunakan rumus kombinasi `AND` (mengambil nilai minimum dari premis)[cite: 64].
    > `CF(Rule) = min(CF Gejala, CF Hari, CF Durasi)`
4.  **Output:** Merekomendasikan hasil dengan skor CF tertinggi[cite: 76].

---

## 📚 Basis Pengetahuan (Knowledge Base)

Sistem memetakan pengetahuan pakar ke dalam kode-kode berikut sesuai Bab III Laporan:

### [cite_start]1. Data Hasil Pakar (Output) [cite: 87]
| Kode | Nama Objek Wisata | Deskripsi Singkat |
|------|-------------------|-------------------|
| **H01** | Pagelaran Gamelan Bangsal Sri Menganti | Pertunjukan autentik Keraton. |
| **H02** | Museum Keraton | Koleksi artefak sejarah. |
| **H03** | Latihan Gamelan | Melihat proses latihan abdi dalem. |
| **H04** | Sanggar Belajar Gamelan | Praktik langsung pembuatan/bermain. |
| **H05** | Tempat Perawatan | Konservasi & dokumentasi instrumen. |

### 2. Data Fakta (Input Pengguna)
[cite_start]**Gejala / Tujuan (G)** [cite: 92]
* `G01`: Menonton Pertunjukan
* `G02`: Belajar Bermain
* `G03`: Mempelajari Sejarah
* `G04`: Melihat Proses Pembuatan
* `G05`: Dokumentasi Kegiatan

[cite_start]**Waktu Kunjungan (I)** [cite: 94]
* `I01`: Pagi
* `I02`: Siang
* `I03`: Malam

[cite_start]**Durasi (J)** [cite: 96]
* `J01`: Singkat (1-2 Jam)
* `J02`: Sedang (2-3 Jam)
* `J03`: Lama (4 Jam)

### [cite_start]3. Aturan Pakar (Rule Base) [cite: 101]
Terdapat 10 Aturan Utama yang ditanamkan dalam sistem:
* **Rule 1:** IF `G01` AND `I01` AND `J02` THEN `H01`
* **Rule 2:** IF `G01` AND `I02` AND `J01` THEN `H01`
* **Rule 3:** IF `G02` AND `I01` AND `J02` THEN `H02`
* **Rule 4:** IF `G02` AND `I02` AND `J03` THEN `H02`
* **Rule 5:** IF `G03` AND `I03` AND `J02` THEN `H03`
* **Rule 6:** IF `G03` AND `I02` AND `J03` THEN `H03`
* **Rule 7:** IF `G04` AND `I01` AND `J03` THEN `H04`
* **Rule 8:** IF `G04` AND `I02` AND `J02` THEN `H04`
* **Rule 9:** IF `G05` AND `I01` AND `J01` THEN `H05`
* **Rule 10:** IF `G05` AND `I03` AND `J02` THEN `H05`

---

## 🛠️ Implementasi Teknis (Bab IV)

[cite_start]Sistem dikembangkan sebagai **Modern Web App** dengan spesifikasi berikut[cite: 301, 302]:

* **Language:** `TypeScript`
    * [cite_start]Dipilih untuk menjamin keamanan tipe data (type safety) dalam perhitungan logika CF[cite: 303].
* **Framework:** `React` + `Vite`
    * [cite_start]Mendukung konsep Single Page Application (SPA) yang cepat tanpa reload[cite: 304].
* **UI Components:** `shadcn/ui`
    * [cite_start]Memberikan komponen antarmuka (Card, Button, Dialog) yang konsisten dan aksesibel[cite: 305].
* **Styling:** `Tailwind CSS`
    * [cite_start]Utility-first framework untuk desain responsif mobile-friendly[cite: 306].
* [cite_start]**Deployment:** `Netlify`[cite: 307].

---

## 🚀 Fitur Unggulan

Sesuai rancangan antarmuka pada Bab III & IV:

1.  **Halaman Beranda (Home):**
    * [cite_start]Menampilkan judul "Temukan Harmoni Gamelan" dan tombol aksi utama[cite: 309].
2.  **Halaman Konsultasi (Interactive Questionnaire):**
    * [cite_start]Formulir interaktif untuk memilih Tujuan, Waktu, dan Durasi[cite: 311].
3.  **Inference Engine (Backend Logic):**
    * Memproses input pengguna menggunakan algoritma Forward Chaining secara real-time.
4.  **Halaman Hasil (Recommendation):**
    * [cite_start]Menampilkan kartu hasil berisi Nama Destinasi, Deskripsi, Jam Operasional, dan Lokasi[cite: 316, 333].
    * [cite_start]Tombol "Ulangi Konsultasi" untuk reset[cite: 317].

---

## 💻 Instalasi & Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal (Localhost):

### Prasyarat
* Node.js (Versi 16 atau lebih baru)
* npm atau yarn

### Langkah Instalasi

1.  **Clone Repository**
    Buka terminal dan jalankan perintah:
    ```bash
    git clone [https://github.com/Useronetyu/coba-sistempakar.git](https://github.com/Useronetyu/coba-sistempakar.git)
    ```

2.  **Masuk ke Direktori Proyek**
    ```bash
    cd coba-sistempakar
    ```

3.  **Install Dependencies**
    Mengunduh semua pustaka yang dibutuhkan:
    ```bash
    npm install
    ```

4.  **Jalankan Server Development**
    Memulai server lokal dengan fitur *Hot-Reload*:
    ```bash
    npm run dev
    ```

5.  **Akses Aplikasi**
    Buka browser Anda dan kunjungi URL yang muncul di terminal (biasanya `http://localhost:8080`).

---

### Catatan Pengembangan
Jika Anda ingin mengubah aturan pakar (Rule Base), silakan edit file `src/utils/expertLogic.ts`. Struktur data dirancang modular agar mudah ditambahkan aturan baru tanpa merusak tampilan antarmuka.

---

**© 2025 Kelompok 8 - Universitas Putra Bangsa**
*Dibuat dengan bangga untuk melestarikan budaya Indonesia melalui teknologi.*