// ============================================================
// KONTEN DESEMBER 2025: edit di sini saja, tanpa menyentuh animasi
// ============================================================
export const DECEMBER = {
  // LAGU: taruh di  public/audio/desember.mp3
  audio: '/audio/desember.mp3',

  title: 'Desember 2025',
  subtitle: 'Kereta, perpisahan, dan bunga pertama', // boleh diganti

  tickets: {
    title: 'Tiket kereta',
    date: '21 Desember 2025',
    subtitle: 'Niatnya sih ke zoo',
    from: 'Tulungagung',
    to: 'Surabaya Gubeng',
    seat: '', // isi kalau mau menampilkan nomor kursi, contoh: '12A'
    frend: 'Frendy',
    kyla: 'Kyla Salwa Annisa',
    hint: 'Ketuk kolom nama di tiket kedua',
    hintDone: 'Kereta berangkat! Ketuk lokomotifnya',
    stamp: 'BERANGKAT',
  },

  window: {
    title: 'Surabaya dari jendela',
        hint: 'Geser ke kiri atau kanan, pemandangannya lewat',
    // FOTO SURABAYA: taruh di  public/photos/des-1.jpg sampai des-5.jpg
    // Boleh tambah atau kurangi baris.
    photos: [
      { src: '/photos/des-1.jpg', caption: '[caption foto 1]' },
      { src: '/photos/des-2.jpg', caption: '[caption foto 2]' },
      { src: '/photos/des-3.jpg', caption: '[caption foto 3]' },
      { src: '/photos/des-4.jpg', caption: '[caption foto 4]' },
      { src: '/photos/des-5.jpg', caption: '[caption foto 5]' },
    ],
    zoo: {
      button: 'Kok nggak jadi ke zoo?',
      story: {
        title: 'Niatnya ke zoo...',
        // TULIS CERITA HARI DI SURABAYA DI SINI
        // (ingatanmu: hujan tidak berhenti, jadi main ke plaza, lalu pulang sore)
        paragraphs: ['Niatnya ke zoo mau lihat jerapah kayang, eh malah hujan dan jadinya nonton film di plaza, jauh-jauh kesana cuma buat nonton film di bioskop hadehh'],
      },
    },
  },

  golden: {
    title: 'Sampai jumpa, Golden',
    date: '31 Desember 2025',
    subtitle: 'Hari terakhir PKL Kyla',
    hint: 'Ketuk lampunya satu per satu',
    // TULIS TEKS PERPISAHAN DI SINI (muncul setelah semua lampu padam)
    final: 'Perpisahaan kita digolden, walau tetap bisa bertemu tapi aku tetap sedih ketika perpisahan itu terjadi',
  },

  bouquet: {
    title: 'Buket pertama',
    hint: 'Geser ke kiri atau kanan untuk membuka',
    // TULIS PESAN DI KARTU BUKET DI SINI
    card: 'Aku liat video tiktok orang-orang nyuruh cewenya rekam video lalu dibeliin buket bunga, eh kamu ku suruh rekam malah engga direkam',
  },
}