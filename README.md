# Commission Apps

Commission Apps adalah sebuah aplikasi yang dirancang untuk melihat proses penjualan, pendapatan komisi, dan pembayaran.

## Persyaratan Sistem

Pastikan Anda memiliki hal-hal berikut sebelum memulai:

- [Node.js](https://nodejs.org/) diinstal di PC Anda.
- [Git](https://git-scm.com/) diinstal untuk meng-clone repository

## Cara Clone dan Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk meng-clone repository ini dan menjalankan aplikasi di mesin lokal Anda.

### 1. Clone Repository

Buka terminal Anda dan jalankan perintah berikut untuk meng-clone repository:

```bash
git clone https://github.com/jordanyussac/commission_apps.git
```

Setelah itu, pindah ke folder proyek:
```bash
cd commission_apps
```

### 2. Instalasi Dependencies
Aplikasi ini terdiri dari dua bagian: client dan server. Anda perlu menginstal dependensi untuk kedua bagian ini.

Untuk Client
Pindah ke direktori client dan instal dependensi dengan menjalankan:
```bash
cd client
npm install
```

Untuk Server
Pindah ke direktori server dan instal dependensi dengan menjalankan:
```bash
cd server
npm install
```

### 3. Menjalankan Aplikasi
Setelah semua dependensi terinstal, Anda dapat menjalankan aplikasi.

Menjalankan Client
Pindah ke direktori client dan jalankan aplikasi dengan:
```bash
cd client
npm start
```
Ini akan menjalankan client pada mode pengembangan (akan terbuka di http://localhost:3000).

Menjalankan Server
Pindah ke direktori server dan jalankan server dengan:
```bash
cd server
npx nodemon index
```
Ini akan menjalankan server di http://localhost:5000.
