// ============================================================
// KONTEN JANUARI 2026: edit di sini saja, tanpa menyentuh animasi
// ============================================================
export const JANUARY = {
  // LAGU: taruh di  public/audio/januari.mp3
  audio: '/audio/januari.mp3',

  title: 'Januari 2026',
  subtitle: 'Wahana, tawa, dan photobooth', // boleh diganti

  park: {
    title: 'Blitar Park',
    subtitle: 'Hari kita mencoba semua wahana',
    cardTitle: 'Kartu Petualangan',
    cardHint: 'Ketuk cap untuk naik wahana',
    stageEmpty: 'Pilih satu wahana dari kartumu',
    allDone: 'Semua cap terkumpul!',

    // FOTO TIAP WAHANA: taruh di  public/photos/jan-1.jpg sampai jan-5.jpg
    gokart: {
      label: 'Gokart',
      hint: 'Ketuk TAP secepat mungkin!',
      win: 'Menang tipis!',
      story: '[TULIS CERITA GOKART DI SINI]',
      photo: { src: '/photos/jan-1.jpg', caption: '[caption gokart]' },
    },
    water: {
      label: 'Sepeda air',
      hint: 'Ketuk kiri dan kanan bergantian',
      wobble: 'Kompak dong, gantian ya!',
      win: 'Sampai!',
      story: '[TULIS CERITA SEPEDA AIR DI SINI]',
      photo: { src: '/photos/jan-2.jpg', caption: '[caption sepeda air]' },
    },
    haunted: {
      label: 'Rumah hantu',
      hint: 'Geser kiri-kanan untuk menyorot',
      found: 'Ditemukan',
      boo: 'BOO!',
      story: '[TULIS CERITA RUMAH HANTU DI SINI, misalnya siapa yang lebih takut]',
      photo: { src: '/photos/jan-3.jpg', caption: '[caption rumah hantu]' },
    },
    snow: {
      label: 'Ruang salju',
      hint: 'Gosok kiri-kanan untuk menghapus embun',
      reveal: 'Dingin banget!',
            brr: ['brrr...', 'brr!', 'b-brrr...', 'brrrr'],
      story: '[TULIS CERITA RUANG SALJU DI SINI]',
      photo: { src: '/photos/jan-4.jpg', caption: '[caption ruang salju]' },
    },
    arcade: {
      label: 'Arcade',
      hint: 'Geser tuas, lalu ketuk AMBIL',
      miss: 'Hampir! Coba lagi',
      win: 'Dapat!',
      story: '[TULIS CERITA ARCADE DI SINI]',
      photo: { src: '/photos/jan-5.jpg', caption: '[caption arcade]' },
    },
  },

  booth: {
    title: 'Photobooth',
    date: '[TANGGAL PHOTOBOOTH, contoh: di hari yang lain]',
    hint: 'Ketuk Foto! untuk mulai',
    button: 'Foto!',
    again: 'Foto ulang',
    zoomHint: 'Ketuk foto untuk memperbesar',
    // Tulisan di bingkai (meniru strip aslimu). Ganti kalau mau
    stripTitle: 'SNAP BOX',
    slogan: 'be kind\nbe happy',
    // FOTO: tiap 3 foto = 1 strip. Taruh di  public/photos/jan-6.jpg sampai jan-14.jpg
    // Mau 12 foto? Tambah 3 baris lagi (jan-15, jan-16, jan-17). Harus kelipatan 3.
    // Foto sebaiknya dipotong persegi, karena dipotong bulat di dalam bingkai.
    photos: [
      { src: '/photos/jan-6.jpg', caption: '[caption 1]' },
      { src: '/photos/jan-7.jpg', caption: '[caption 2]' },
      { src: '/photos/jan-8.jpg', caption: '[caption 3]' },
      { src: '/photos/jan-9.jpg', caption: '[caption 4]' },
      { src: '/photos/jan-10.jpg', caption: '[caption 5]' },
      { src: '/photos/jan-11.jpg', caption: '[caption 6]' },
      { src: '/photos/jan-12.jpg', caption: '[caption 7]' },
      { src: '/photos/jan-13.jpg', caption: '[caption 8]' },
      { src: '/photos/jan-14.jpg', caption: '[caption 9]' },
    ],
    // TULIS CERITA PHOTOBOOTH DI SINI (muncul setelah foto keluar)
    story: '[TULIS CERITA PHOTOBOOTH DI SINI]',
  },
}