# Blueprint & Aturan Koding App Todo Checklist

## Tech Stack Wajib
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React (`lucide-react`)

## Struktur Data (State & Interfaces)
1. **User**: `{ id, username, email, password }`
2. **Todo**: 
   - `id`: string
   - `userId`: string
   - `judul`: string
   - `tanggal_dibuat`: string (YYYY-MM-DD)
   - `tanggal_target`: string (YYYY-MM-DD)
   - `tanggal_selesai`: string (YYYY-MM-DD)
   - `status`: 'active' | 'selesai' | 'terlambat'
   - `details`: Array<{ id: string, teks: string, isDone: boolean }>

---

## Palet Warna Utama (Earth Tone / Warm Retro)
- **App Background Canvas (Light)**: `#f1f2ec` (`bg-[#f1f2ec] text-slate-800`)
- **App Background Canvas (Dark)**: `#0b0f17` (`bg-[#0b0f17] text-white`)
- **Header Top Bar & Default Card Header**: `#f6b327` (`bg-[#f6b327] text-slate-900 font-bold`)
- **Primary Action Buttons**: `#fd671a` (`bg-[#fd671a] hover:bg-[#e0560f] text-white shadow-md transition-all`)
  *(Digunakan pada: Tombol Add Todo, Card Done/Selesai, Footer Subscribe, Login & Register CTAs)*
- **Auth Form Modal Background**: `#1c4f4a` transparan (`bg-[#1c4f4a]/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl`)
- **Success Status Header**: `#86bfb9` (`bg-[#86bfb9] text-slate-900`)

---

## Rules Koding (Strict Rules)
1. Komponen UI wajib responsif (Mobile-first hingga Ultra-wide 1024px+).
2. Gunakan `localStorage` untuk autentikasi (Login/Register) dan penyimpanan data Todo per `userId`.
3. Tampilan detail todo berupa checklist interaktif (check/uncheck) dengan container auto-scroll tersembunyi (`no-scrollbar`).
4. Sinkronisasi dark/light mode menggunakan kelas `.dark` pada root element (`document.documentElement`).

---

## Auth UI Design Rules (Glassmorphic Dark-Green)
- **Modal Card**: Kaca transparan berwarna hijau gelap `#1c4f4a` (`bg-[#1c4f4a]/90 backdrop-blur-xl border border-white/10 text-white rounded-3xl p-6 sm:p-7 shadow-2xl max-w-sm`).
- **Tab Slide Navigation**: Tab "Login" & "Sign Up" dengan indikator penanda transparan gelap (`bg-slate-900/90 text-white`), tanpa warna biru solid.
- **Form Controls**: Input field transparan (`bg-[#1c4f4a]/40 border border-white/20 focus:border-[#f6b327] text-white placeholder-slate-300 rounded-xl px-3.5 py-2 text-sm`).
- **OAuth Removal**: Hanya sediakan input Email, Password, dan Konfirmasi Password (saat Registrasi).

---

## Dashboard & Card Design Rules
- **Header Top Bar**: `#f6b327` (`bg-[#f6b327] text-slate-900`).
- **Header Card Dynamic Palette (Berdasarkan Status & Deadline)**:
  - Default / Active: `#f6b327` (`bg-[#f6b327] text-slate-900`)
  - Sage (Sisa `> 3 hari`): `bg-[#A8BBA2] text-slate-800`
  - Gold (Sisa `2 - 3 hari`): `bg-[#EAD08D] text-slate-800`
  - Peach (Sisa `0 - 2 hari`): `bg-[#F2C49B] text-slate-800`
  - Terracotta (Overdue / Late): `bg-[#d0745d] text-white`
  - Status Selesai / Success: `#86bfb9` (`bg-[#86bfb9] text-slate-900`)
- **Card Body Container**: 
  - Light Mode: `bg-white text-slate-800 border border-slate-200 rounded-b-2xl p-4`
  - Dark Mode: `bg-[#0b0f17] text-white border border-slate-800 rounded-b-2xl p-4`
- **Done Button**: Warna oranye utama (`bg-[#fd671a] hover:bg-[#e0560f] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 rounded-xl transition-all`). Aktif hanya jika seluruh checklist subtask tercentang.
- **Grid Layout**: Maksimal 4 kolom per baris (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5`). Tampilan awal dibatasi 2 baris (8 cards) dengan link pagination "Reload todo lebih banyak".

---

## Footer Component Rules
- **Upper Footer**:
  - Light Mode: `bg-white text-slate-800 border-t border-slate-200`
  - Dark Mode: `bg-[#0b0f17] text-white border-t border-slate-800`
- **Bottom Copyright Bar**:
- Disamakan dengan warna header top bar (`bg-[#f6b327] text-slate-900 font-medium py-3 text-center text-xs`)
- **Subscribe Button**: Oranye utama (`bg-[#fd671a] hover:bg-[#e0560f] text-white font-medium rounded-xl px-5 py-2.5 transition-all`)

## Card Action Menu & Lock Logic Rules
- **Header Actions Dropdown**: Ganti tombol aksi individu (Edit/Delete) dengan ikon titik 3 vertikal (`MoreVertical` dari Lucide React). Mengklik ikon ini akan membuka menu dropdown popover berisi 3 opsi:
  - `Edit`: Membuka modal form edit todo.
  - `Reset`: Mengembalikan status todo menjadi 'active', mengubah seluruh subtask `isDone = false`, serta menghapus `completedAt`. (Opsi ini **disabled** jika status todo belum 'selesai').
  - `Hapus`: Menghapus todo dari list (berwarna merah/danger).
- **Checklist Locking**:
  - Jika `todo.status === 'selesai'`, seluruh item checklist subtask dikunci (`disabled` / `pointer-events-none`). Subtask tidak bisa di-uncheck secara manual selain melalui menu **Reset**.

## Filter & Pagination Chaining Rules
- **Combined Filtering Order**:
  1. Filter 1 (Week Filter): 
     - `This Week`: Menampilkan Todo yang `tanggal_target` jatuh pada rentang minggu berjalan (Senin s/d Minggu berdasarkan tanggal hari ini).
     - `All Weeks`: Menampilkan seluruh Todo tanpa batasan tanggal.
  2. Filter 2 (Status Filter):
     - Menyaring hasil dari Filter 1 berdasarkan status (`'Semua Status'`, `'active'`, `'selesai'`, `'terlambat'`).
  3. Reset Limit Pagination:
     - Setiap kali `filterWeek` atau `filterStatus` berubah, reset `displayLimit` kembali ke **8 cards** (2 baris).
  4. Pagination Slice:
     - `filteredTodos.slice(0, displayLimit)`. Tombol "Reload todo lebih banyak" hanya muncul jika `filteredTodos.length > displayLimit`.

## Header & Card Title Truncation Rules
- **Top Header User Display**:
  - Ambil username dari email user aktif sebelum karakter `@` (`user.email.split('@')[0]`).
  - Posisi: Di sebelah kiri tombol switch mode (Theme Toggle Switcher).
  - Truncation Mobile: Pada tampilan layar mobile (`sm:hidden` / `< 640px`), batasi panjang username maksimal **7 karakter** lalu tambahkan `...` (`username.length > 7 ? username.slice(0, 7) + '...' : username`). Tampilkan versi penuh di layar desktop (`sm:inline`).
- **Logout Button**:
  - Hapus teks "Logout", hanya tampilkan ikon logout (`LogOut` dari Lucide React) dengan gaya bold/medium (`strokeWidth={2.5}`).
- **Card Title Truncation & Tooltip (`TodoCard.jsx`)**:
  - Batasi judul Todo pada header card maksimal **6 kata**. Jika lebih dari 6 kata, potong dan tambahkan `...` (`words.slice(0, 6).join(' ') + '...'`).
  - Tambahkan atribut HTML `title={todo.judul}` pada elemen judul card agar saat kursor di-hover/mouse over, tooltip bawaan browser secara otomatis memunculkan judul lengkap di atas kursor.

## Modal Form Input Auto-Scroll Rules
- **Auto-Scroll to Bottom on Subtask Addition**:
  - Gunakan `useRef` pada container list subtask (atau dummy element di bagian paling bawah list).
  - Ketika item subtask baru ditambahkan (`details.length` bertambah), picu `useEffect` atau callback untuk melakukan auto-scroll ke bawah: `subtaskContainerRef.current.scrollTo({ top: subtaskContainerRef.current.scrollHeight, behavior: 'smooth' })`.
  - Pastikan input item baru langsung mendapatkan fokus kursor (`focus()`) jika memungkinkan.