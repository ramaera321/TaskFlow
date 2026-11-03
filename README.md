📝 TaskFlow — Modern Task Management Application

TaskFlow adalah aplikasi manajemen tugas harian (To-Do List) berbasis React.js dan Tailwind CSS v4. Aplikasi ini dirancang khusus dengan antarmuka modern, interaktif, responsif, serta dibekali arsitektur komponen modular dan sistem autentikasi lokal (Client-side LocalStorage Persistence).

🎨 Theme & Palette (Earth Tone / Warm Retro)

TaskFlow dibangun dengan palet warna kustom yang mengusung gaya Earth Tone / Warm Retro:

Canvas Background (Light Mode): #f1f2ec

Canvas Background (Dark Mode): #0b0f17

Top Header Bar & Default Card Header: #f6b327 (Mustard Gold)

Primary Buttons & Action Elements: #fd671a (Pumpkin Orange)

Auth Glassmorphism Backdrop: #1c4f4a (Dark Teal Glass)

Success Status Header: #86bfb9 (Sage Mint)

✨ Fitur Utama (Features)

🔑 1. Local Authentication System

Sign In & Registration Modal: Form autentikasi dengan transisi mode Glassmorphic.

Session Persistence: Data user tersimpan di localStorage (todo_users dan todo_active_user).

Personalized Header: Menampilkan nama akun (diambil dari prefix email sebelum tanda @). Tampilan nama otomatis terpotong (truncation) max 7 karakter pada layar mobile.

Icon-Only Logout: Tombol keluar tanpa teks dengan ikon yang ringkas.

📋 2. Dynamic Todo Checklist Card

Dynamic Header Color: Warna header kartu berubah secara fleksibel berdasarkan status pengerjaan dan kedaluwarsa target waktu (Sage, Gold, Peach, Terracotta/Overdue, dan Sage-Mint saat selesai).

Auto-Scroll Subtasks: Daftar detail checklist memiliki kontainer auto-scroll tersembunyi (no-scrollbar) sehingga kartu tetap rapi walau memiliki banyak rincian tugas.

Title Truncation & Hover Tooltip: Judul tugas dibatasi maksimal 6 kata di kartu. Judul lengkap dapat dilihat melalui native hover tooltip saat kursor diarahkan ke judul.

Subtask Locking: Ketika status kartu ditandai Selesai, item checklist akan terkunci otomatis untuk mencegah perubahan yang tidak disengaja.

⚙️ 3. 3-Dot Kebab Action Menu

Edit Todo: Membuka modal form interaktif untuk memperbarui judul, tanggal target, dan subtask.

Reset Todo: Mengembalikan status kartu yang telah selesai kembali menjadi Active, membuka kunci checklist, dan mengosongkan centang secara instan. (Disabled jika kartu belum selesai).

Hapus Todo: Menghapus kartu tugas dari sistem secara permanen.

⏱️ 4. Advanced Time & Status Filtering

This Week vs All Weeks Toggle: Memfilter tugas yang jatuh pada minggu berjalan (Senin s/d Minggu) secara real-time.

Status Filter: Kombinasi penyaringan status (Semua Status, Active, Selesai, dan Terlambat).

Overdue Detection & Tracking: Deteksi keterlambatan otomatis pada tugas aktif yang melewati deadline maupun tugas selesai yang tanggal_selesai-nya melampaui tanggal_target. Badge OVERDUE akan muncul pada header kartu.

⚡ 5. Interactive Modal & UX Polish

Subtask Auto-Scroll on Addition: Saat menambah rincian subtask baru pada modal buat/edit tugas (melebihi 4 item), kontainer modal akan melakukan smooth auto-scroll ke posisi paling bawah.

Pagination Limit: Tampilan awal kartu dibatasi maksimal 2 baris (8 kartu) dengan tombol "Reload todo lebih banyak".

🛠️ Tech Stack & Dependencies

Frontend Framework: React.js (Vite)

Styling Utility: Tailwind CSS v4 (@tailwindcss/vite)

Icons: Lucide React (lucide-react)

State & Storage: React Hooks (useState, useEffect, useMemo, useRef) & Web Browser localStorage

🔄 Alur Kerja Aplikasi (Application Workflow)

[ Unauthenticated User ]
       │
       ▼
 [ Login / Sign Up ] ──(Save to LocalStorage)──► [ User Authenticated Session ]
                                                           │
                                                           ▼
                                                [ TaskFlow Dashboard ]
                                                           │
               ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
               ▼                                           ▼                                           ▼
      [ Create / Edit Todo ]                       [ Filter & Search ]                        [ Manage Todo Card ]
   - Title & Target Date                      - Toggle: This Week / All                   - Check/Uncheck Checklist
   - Auto-scroll subtask list                 - Status: Active / Selesai / Terlambat      - Complete Task (Set tanggal_selesai)
                                              - Combined Chained Filter                   - 3-Dot Menu (Edit, Reset, Delete)


📖 User Guide (Panduan Pengguna)

1. Memulai Aplikasi & Registrasi/Login

Buka aplikasi pada browser (http://localhost:5173).

Masukkan Email dan Password pada form Sign In.

Jika belum memiliki akun, klik Registrasi dulu di bagian bawah form, isi detail pendaftaran, lalu masuk.

2. Membuat Todo Baru

Klik tombol + Add Todo berwarna oranye di kanan atas dashboard.

Isi Judul Tugas dan pilih Tanggal Target Deadline.

Ketikkan rincian subtask pada kolom Subtasks. Klik + Add Item jika ingin menambah rincian tugas baru.

Klik Simpan untuk menampilkan kartu tugas pada dashboard.

3. Mengelola Checklist Subtask

Centang (check) item tugas pada kartu seiring berjalannya progres pengerjaanmu.

Ketika seluruh item checklist telah tercentang, klik tombol Selesai di bagian bawah kartu untuk mengonfirmasi penyelesaian tugas.

Setelah dikonfirmasi Selesai, checklist akan terkunci otomatis dan sistem mencatat tanggal_selesai.

4. Menggunakan Menu Titik 3 (Kebab Menu)

Klik ikon titik tiga vertikal (⋮) di pojok kanan atas kartu untuk menampilkan opsi:

Edit: Untuk mengubah judul, tanggal, atau subtask.

Reset: Untuk mengulang kembali kartu yang telah selesai menjadi aktif kembali.

Hapus: Untuk menghapus kartu dari daftar.

5. Menggunakan Filter Dashboard

Gunakan tombol toggle This Week untuk hanya menampilkan tugas yang harus diselesaikan pada minggu ini.

Gunakan dropdown Semua Status untuk memfilter berdasarkan status (Active, Selesai, atau Terlambat).

🚀 Cara Menjalankan Project Secara Lokal

# 1. Clone repositori ini
git clone https://github.com/username/taskflow-todo-app.git

# 2. Masuk ke direktori proyek
cd taskflow-todo-app

# 3. Install dependency
npm install

# 4. Jalankan server pengembangan
npm run dev


Buka browser dan akses http://localhost:5173.

© 2026 TaskFlow by Mohamad Romli Firdaus Kamarula. All Rights Reserved.
