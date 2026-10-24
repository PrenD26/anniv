// ============================================================
// KONTEN APRIL 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> public/photos/, video -> public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'.
// ============================================================
export const APRIL = {
  // DUA LAGU: taruh di public/audio/
  audio: '/audio/april-1.mp3', // Simpang Lima Gumul dan Kediri Town Square
  audio2: '/audio/april-2.mp3', // Pantai dan buket

  title: 'April 2026',
  subtitle: 'Jalan-jalan, pantai, dan satu buket yang belum jadi', // draf

  slg: {
    title: 'Simpang Lima Gumul',
    subtitle: 'Pagi bersama fotografer',
    hint: 'Ketuk tombol rana untuk memotret',
    sheetTitle: 'Lembar kontak',
    sheetHint: 'Ketuk hati untuk memilih 3 favoritmu',
    showFavs: 'Lihat favorit',
    favTitle: 'Tiga favoritmu',
    pickAgain: 'Pilih ulang',
    again: 'Ambil lagi',
    // TULIS CERITA SIMPANG LIMA GUMUL DI SINI
    story: '[TULIS CERITA SIMPANG LIMA GUMUL DI SINI]',
    // 9 FOTO FOTOGRAFER: taruh di public/photos/apr-1.jpg sampai apr-9.jpg
    // Jumlahnya bebas, tapi 9 paling pas untuk lembar kontak 3x3.
    photos: [
      { src: '/photos/apr-1.jpg', caption: '[caption 1]' },
      { src: '/photos/apr-2.jpg', caption: '[caption 2]' },
      { src: '/photos/apr-3.jpg', caption: '[caption 3]' },
      { src: '/photos/apr-4.jpg', caption: '[caption 4]' },
      { src: '/photos/apr-5.jpg', caption: '[caption 5]' },
      { src: '/photos/apr-6.jpg', caption: '[caption 6]' },
      { src: '/photos/apr-7.jpg', caption: '[caption 7]' },
      { src: '/photos/apr-8.jpg', caption: '[caption 8]' },
      { src: '/photos/apr-9.jpg', caption: '[caption 9]' },
    ],
  },

  kts: {
    title: 'Kediri Town Square',
    subtitle: 'Jalan-jalan siang hari',
    hint: 'Geser kiri-kanan untuk jalan-jalan',
    done: 'Jalan-jalan yang menyenangkan', // draf
    // TULIS CERITA KEDIRI TOWN SQUARE DI SINI
    story: '[TULIS CERITA KEDIRI TOWN SQUARE DI SINI]',
    // VIDEO KTS: taruh di public/videos/apr-10.mp4
    video: { src: '/videos/apr-10.mp4', caption: '[caption KTS]' },
  },

  beach: {
    title: 'Pantai Pudak',
    subtitle: 'Di hari yang lain, pagi hari',
    digHint: 'Gali pasir dengan jarimu untuk mencari kerang',
    tapHint: 'Ada kerang! Ketuk kerangnya',
    hint: 'Tulis di pasir dengan jarimu',
    prompt: 'Tulis nama kita', // draf
    waveTitle: 'Ombak menghapusnya', // draf
    again: 'Tulis lagi',
    // KERANG TERKUBUR: tiap kerang membuka satu kenangan di Pantai Pudak.
    // Boleh kurangi atau tambah (maksimal 6). Foto bersifat opsional.
    // Mau pakai foto? Tambahkan baris seperti ini di dalam kerang yang kamu mau:
    //   photo: { src: '/photos/apr-13.jpg', caption: '[caption]' },
    // (foto: public/photos/apr-13.jpg dan seterusnya, video: public/videos/)
    shells: [
      { label: '[judul kenangan 1]', text: '[TULIS KENANGAN KERANG 1]' },
      { label: '[judul kenangan 2]', text: '[TULIS KENANGAN KERANG 2]' },
      { label: '[judul kenangan 3]', text: '[TULIS KENANGAN KERANG 3]' },
      { label: '[judul kenangan 4]', text: '[TULIS KENANGAN KERANG 4]' },
      { label: '[judul kenangan 5]', text: '[TULIS KENANGAN KERANG 5]' },
    ],
    // TULIS CERITA PANTAI PUDAK DI SINI (muncul setelah ombak menghapus tulisan)
    story: '[TULIS CERITA PANTAI PUDAK DI SINI]',
    // FOTO PANTAI: taruh di public/photos/apr-11.jpg
    photo: { src: '/photos/apr-11.jpg', caption: '[caption pantai]' },
  },

  bouquet: {
    title: 'Buket satin',
    subtitle: 'Lilac dan putih, belum jadi',
    hint: 'Ketuk gulungan pita untuk merangkai',
    fill: 8, // jumlah mawar yang bisa dirangkai (maksimal 10). Sisanya sengaja kosong
    unit: 'tangkai',
    unfinished: 'Belum selesai, nanti ya', // draf
    // TULIS CERITA BUKET SATIN DI SINI
    story: '[TULIS CERITA BUKET SATIN DI SINI]',
    // FOTO BUKET (yang belum jadi): taruh di public/photos/apr-12.jpg
    photo: { src: '/photos/apr-12.jpg', caption: '[caption buket]' },
  },

  // TULIS KALIMAT PENUTUP BULAN APRIL DI SINI (tampil di bawah buket)
  closing: '[TULIS KALIMAT PENUTUP DI SINI]',
}