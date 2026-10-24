// ============================================================
// KONTEN MARET 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> public/photos/, video -> public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'
// (contoh '/photos/mar-1.jpg' atau '/videos/mar-2.mp4').
// ============================================================
export const MARCH = {
  // LAGU: taruh di  public/audio/maret.mp3
  audio: '/audio/maret.mp3',

  title: 'Maret 2026',
  subtitle: 'Pelan, hangat, dan penuh berkah', // draf, boleh diganti

  takjil: {
    label: 'Berbagi takjil',
    subtitle: 'Sore hari, keliling naik motor',
    hint: 'Ketuk bapak becak untuk memberi nasi',
    total: 50, // jumlah cup nasi
    perTap: 5, // cup per becak (50 / 5 = 10 becak)
    leftLabel: 'Sisa',
    unit: 'cup',
    emptyChip: 'Habis!',
    // Ucapan bapak becak (draf, boleh diganti atau ditambah)
    thanks: ['Matur nuwun!', 'Makasih, Mas!', 'Alhamdulillah', 'Suwun, Mbak!'],
    win: 'Alhamdulillah, habis!',
    // TULIS CERITA BERBAGI TAKJIL DI SINI
    story: '[TULIS CERITA BERBAGI TAKJIL DI SINI]',
    // MEDIA TAKJIL (foto dan video): hapus satu baris kalau hanya mau satu
    media: [
      { src: '/photos/mar-1.jpg', caption: '[caption takjil 1]' },
      { src: '/videos/mar-2.mp4', caption: '[caption takjil 2]' },
    ],
  },

  cafe: {
    label: 'Menunggu adzan',
    subtitle: 'Berbuka di Ferosa Cafe',
    name: 'FEROSA CAFE',
    menu: 'Nasi goreng', // KOREKSI kalau menunya berbeda
    hint: 'Geser matahari ke kanan sampai terbenam',
    done: 'Waktunya berbuka',
    // TULIS CERITA MENUNGGU ADZAN DI SINI
    story: '[TULIS CERITA MENUNGGU ADZAN DI SINI]',
    photo: { src: '/photos/mar-3.jpg', caption: '[caption kafe]' },
  },

  motor: {
    label: 'Silaturahmi',
    subtitle: 'Lebaran, motoran ke rumah Budhe',
    hint: 'Gulir pelan untuk ikut berjalan',
    arriveHint: 'Ketuk pintunya',
    banner: 'Selamat Idul Fitri',
    // Percakapan di depan pintu (draf salam standar, boleh diganti)
    greet: [
      { who: 'kyla', text: 'Assalamualaikum, Budhe...' },
      { who: 'budhe', text: 'Waalaikumsalam, ayo masuk, masuk!' },
    ],
    storyTitle: 'Di rumah Budhe',
    // TULIS CERITA SILATURAHMI DI SINI
    story: '[TULIS CERITA SILATURAHMI DI SINI]',
    photo: { src: '/photos/mar-4.jpg', caption: '[caption ruang tamu]' },
  },

  booth: {
    title: 'Photobooth ke-2',
    date: '[TANGGAL PHOTOBOOTH KE-2]',
    hint: 'Ketuk Foto! untuk mulai',
    button: 'Foto!',
    again: 'Foto ulang',
    zoomHint: 'Ketuk foto untuk memperbesar',
    stripTitle: 'snap box',
    // CAP POS: yang di fotomu "1973 JUL" itu template, jadi kita ganti tanggalmu
    stamp: {
      top: 'POSTAL SERVICE',
      date: '28 MAR', // GANTI dengan tanggal photobooth-mu (singkat, contoh '28 MAR')
      year: '2026',
      note: 'PAID',
      hint: 'Ketuk untuk mengecap',
    },
    // FOTO: tiap 3 foto = 1 strip. Taruh di public/photos/mar-5.jpg sampai mar-13.jpg
    // Mau 12 foto? Tambah 3 baris lagi (mar-14, mar-15, mar-16). Harus kelipatan 3.
    // Sebaiknya dipotong persegi.
    photos: [
      { src: '/photos/mar-5.jpg', caption: '[caption 1]' },
      { src: '/photos/mar-6.jpg', caption: '[caption 2]' },
      { src: '/photos/mar-7.jpg', caption: '[caption 3]' },
      { src: '/photos/mar-8.jpg', caption: '[caption 4]' },
      { src: '/photos/mar-9.jpg', caption: '[caption 5]' },
      { src: '/photos/mar-10.jpg', caption: '[caption 6]' },
      { src: '/photos/mar-11.jpg', caption: '[caption 7]' },
      { src: '/photos/mar-12.jpg', caption: '[caption 8]' },
      { src: '/photos/mar-13.jpg', caption: '[caption 9]' },
    ],
    // TULIS CERITA PHOTOBOOTH KE-2 DI SINI
    story: '[TULIS CERITA PHOTOBOOTH KE-2 DI SINI]',
  },
}