// ============================================================
// KONTEN FEBRUARI 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> taruh di public/photos/, video -> taruh di public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'
// (contoh '/photos/feb-2.jpg' atau '/videos/feb-2.mp4'), animasinya menyesuaikan.
// Hapus baris 'photo' kalau suatu bagian tidak ada medianya.
// ============================================================
export const FEBRUARY = {
  // LAGU: taruh di  public/audio/februari.mp3
  audio: '/audio/februari.mp3',

  title: 'Februari 2026',
  subtitle: 'Neon, hujan, dan Valentine', // draf, boleh diganti

  milky: {
    title: 'Milkyverse',
    date: '7 Februari 2026', // dari tanggal di galerimu, koreksi kalau salah
    subtitle: 'Bola putih dan ungu di mana-mana',
  },

  pit: {
    label: 'Kolam bola',
    hint: 'Ketuk untuk melempar bola',
    goal: 24,
    win: 'Kita tenggelam!',
    story: '[TULIS CERITA KOLAM BOLA DI SINI]',
    photo: { src: '/photos/feb-1.jpg', caption: '[caption kolam bola]' },
  },

  tramp: {
    label: 'Trampolin',
    hint: 'Ketuk saat mereka turun ke trampolin',
    early: 'Tunggu mereka turun dulu!',
    good: 'Pas!',
    win: 'Mentok langit-langit!',
    story: '[TULIS CERITA TRAMPOLIN DI SINI]',
    photo: { src: '/videos/feb-3.mp4', caption: '[caption trampolin]' },
  },

  slide: {
    label: 'Seluncuran neon',
    hint: 'Geser kiri-kanan untuk menyetir koala',
    start: 'Meluncur!',
    scoreLabel: 'cahaya terkumpul',
    win: 'Byurrr!',
    story: '[TULIS CERITA SELUNCURAN NEON DI SINI]',
    photo: { src: '/videos/feb-2.mp4', caption: '[caption seluncuran]' },
  },

  cannon: {
    label: 'Meriam balon',
    hint: 'Ketuk untuk menembak balon, kumpulkan hurufnya',
    win: 'I LOVE YOU KYLA',
    story: '[TULIS CERITA MERIAM BALON DI SINI]',
    photo: { src: '/photos/feb-4.jpg', caption: '[caption meriam balon]' },
  },

  rain: {
    label: 'Pulang kehujanan',
    hint: 'Ketuk genangan airnya',
    splashes: ['basah!', 'dingin!', 'cipraaat', 'brr!', 'ups!'],
    clear: 'Hujannya reda',
    story: '[TULIS CERITA PULANG KEHUJANAN DI SINI]',
    photo: { src: '/photos/feb-8.jpg', caption: '[caption pulang kehujanan]' }, // hapus baris ini kalau tidak ada foto
  },

  valentine: {
    title: 'Valentine',
    date: '14 Februari 2026', // koreksi kalau salah
    subtitle: 'Sore sampai malam',

    box: {
      hint: 'Geser pita ke kiri atau kanan',
      openHint: 'Ketuk isinya satu per satu',
      photo: { src: '/photos/feb-5.jpg', caption: '[caption kotak pink]' },
    },
    // Isi kotak: tulis satu-dua kalimat tentang tiap barang
    items: [
      { id: 'panda', label: 'Hello Panda', text: '[TULIS TENTANG HELLO PANDA]' },
      { id: 'silverqueen', label: 'SilverQueen', text: '[TULIS TENTANG SILVERQUEEN]' },
      { id: 'gelang', label: 'Gelang', text: '[TULIS TENTANG GELANG]' },
      { id: 'parfum', label: 'Parfum Scarlett Tea Amor', text: '[TULIS TENTANG PARFUM]' },
    ],

    doll: {
      title: 'Boneka koala',
      hint: 'Ketuk boneka koalanya',
      hug: 'Peluk!',
      story: '[TULIS CERITA BONEKA KOALA DI SINI]',
    },

    bouquet: {
      title: 'Buket kedua',
      story: '[TULIS CERITA BUKET KEDUA DI SINI]',
      video: { src: '/videos/feb-6.mp4', caption: '[caption buket]' },
    },

    frame: {
      title: 'Bingkai kenangan',
      hint: 'Ketuk satu foto untuk mengenang',
      full: 'Lihat utuh',
      // Pakai gambar kolasenya saja (tanpa bingkai kayu), rasio sekitar 3:4
      photo: { src: '/photos/feb-7.jpg', caption: '[caption bingkai]' },
      // 6 foto di kolase, urutan: kiri-atas, kanan-atas, kiri-tengah, kanan-tengah, kiri-bawah, kanan-bawah
      memories: [
        { label: '[kenangan 1]', text: '[TULIS KENANGAN FOTO 1]' },
        { label: 'Go-kart', text: '[TULIS KENANGAN GO-KART]' },
        { label: 'Ruang salju', text: '[TULIS KENANGAN RUANG SALJU]' },
        { label: '[kenangan 4]', text: '[TULIS KENANGAN FOTO 4]' },
        { label: 'Photobooth', text: '[TULIS KENANGAN PHOTOBOOTH]' },
        { label: '[kenangan 6]', text: '[TULIS KENANGAN FOTO 6]' },
      ],
      // TULIS KALIMAT PENUTUP BULAN FEBRUARI DI SINI
      closing: '[TULIS KALIMAT PENUTUP DI SINI]',
    },
  },
}