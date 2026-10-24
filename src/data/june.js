// ============================================================
// KONTEN JUNI 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> public/photos/, video -> public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'.
// ============================================================
export const JUNE = {
  // LAGU: taruh di  public/audio/juni.mp3
  audio: '/audio/juni.mp3',

  title: 'Juni 2026',
  subtitle: 'Pantai, ayunan, dan lari-larian', // draf

  wake: {
    hint: 'Usap kepala koala pelan-pelan',
    sleep: 'Zzz...',
    yawn: 'Hoaaam...',
    awake: 'Selamat pagi, Juni!',
    next: 'Gulir ke bawah, kita ke pantai',
  },

  beach: {
    title: 'Pantai Molang',
    subtitle: 'Pagi hari',
    date: '[TANGGAL PANTAI MOLANG]',
    start: 'Ketuk koala dan kucing untuk memulai',
    pick: 'Pilih tempat: ayunan, batu karang, atau bibir pantai',
    done: 'Semua tempat sudah dikunjungi',
    chips: { swing: 'Ayunan', rock: 'Batu karang', shore: 'Bibir pantai' },

    swing: {
      hint: 'Ketuk di mana saja untuk mendorong ayunan',
      levels: ['Makin tinggi!', 'Wuuuss!', 'Tinggi banget!'],
      down: 'Turun',
      // TULIS CERITA AYUNAN DI SINI
      story: '[TULIS CERITA AYUNAN DI SINI]',
      // VIDEO AYUNAN (1 sampai 3): taruh di public/videos/. Tiap video terbuka saat ayunan makin tinggi.
      media: [
        { src: '/videos/jun-1.mp4', caption: '[caption ayunan 1]' },
        { src: '/videos/jun-2.mp4', caption: '[caption ayunan 2]' },
        { src: '/videos/jun-3.mp4', caption: '[caption ayunan 3]' },
      ],
    },

    rock: {
      hint: 'Koala memanjat, kucing siap memotret',
      ready: 'Ketuk tombol Jepret!',
      shoot: 'Jepret!',
      // TULIS CERITA BATU KARANG DI SINI
      story: '[TULIS CERITA BATU KARANG DI SINI]',
      // GAMBAR: taruh di public/photos/jun-4.jpg
      photo: { src: '/photos/jun-4.jpg', caption: '[caption batu karang]' },
    },

    shore: {
      hint: 'Kejar-kejaran! Ketuk untuk memberi semangat',
      brr: 'brr!',
      // TULIS CERITA LARI-LARIAN DI BIBIR PANTAI DI SINI
      story: '[TULIS CERITA LARI-LARIAN DI SINI]',
      // GAMBAR: taruh di public/photos/jun-5.jpg
      photo: { src: '/photos/jun-5.jpg', caption: '[caption bibir pantai]' },
    },

    album: {
      title: 'Album pantai',
      locked: 'Selesaikan ketiga tempat untuk membuka album',
      hint: 'Geser ke kiri atau kanan',
      // GAMBAR ALBUM: taruh di public/photos/jun-6.jpg dst. Boleh tambah atau kurangi.
      media: [
        { src: '/photos/jun-6.jpg', caption: '[caption 1]' },
        { src: '/photos/jun-7.jpg', caption: '[caption 2]' },
        { src: '/photos/jun-8.jpg', caption: '[caption 3]' },
        { src: '/photos/jun-9.jpg', caption: '[caption 4]' },
        { src: '/photos/jun-10.jpg', caption: '[caption 5]' },
        { src: '/photos/jun-11.jpg', caption: '[caption 6]' },
        { src: '/photos/jun-12.jpg', caption: '[caption 7]' },
        { src: '/photos/jun-13.jpg', caption: '[caption 8]' },
        { src: '/photos/jun-14.jpg', caption: '[caption 9]' },
      ],
    },
  },

  // TULIS KALIMAT PENUTUP JUNI DI SINI (muncul di bawah album)
  closing: '[TULIS KALIMAT PENUTUP JUNI DI SINI]',
}