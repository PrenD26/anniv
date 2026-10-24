// ============================================================
// KONTEN NOVEMBER 2025: edit di sini saja, tanpa menyentuh animasi
// ============================================================
export const NOVEMBER = {
  // LAGU: taruh di  public/audio/november.mp3
  audio: '/audio/november.mp3',

  title: 'November 2025',
  subtitle: 'Bulan yang sangat penuh hal baru',

  beach: {
    title: 'Pantai Pacar', // GANTI kalau nama pantainya berbeda
    bottleHint: 'ambil aku',
    story: {
      title: 'Hari di pantai',
      // TULIS CERITA PERTAMA KALI MAIN JAUH KE PANTAI DI SINI, boleh tambah paragraf
      paragraphs: ['Siapa sangka kan ya, malamnya kita berunding, paginya langsung mantai, dan tiba-tiba banget kamu ngajak gandengan tangan, dan mulai dari moment ini aku menemukan model yang akan selalu masuk ke video dokumentasiku hingga nanti bisa jalan-jalan dengan buah hati kita'],
    },
  },

  hold: {
    title: 'Gandengan pertama',
    hint: 'Tahan layar supaya mereka mendekat',
    line: 'Ayang modus pegang tanganku',
    blush: '>///<',
  },

  photos: {
    title: 'Potret hari itu',
    hint: 'Ketuk foto untuk memperbesar',
    // FOTO PANTAI: taruh di  public/photos/nov-1.jpg sampai nov-5.jpg
    list: [
      { src: '/photos/nov-1.jpg', caption: '[caption foto 1]' },
      { src: '/photos/nov-2.jpg', caption: '[caption foto 2]' },
      { src: '/photos/nov-3.jpg', caption: '[caption foto 3]' },
      { src: '/photos/nov-4.jpg', caption: '[caption foto 4]' },
      { src: '/photos/nov-5.jpg', caption: '[caption foto 5]' },
    ],
  },

  date: {
    title: 'Kita jadian tanggal berapa hayoo?',
    hint: 'Pilih tanggalnya, sayang',
    // Komentar kalau Kyla salah memilih (muncul bergantian)
    wrong: [
      'Bukan yang ini, sayang...',
      'Hmm, kamu yakin?',
      'Salah! Masa lupa sih hehe',
      'Aku tungguin sampai kamu ingat ya',
      'Tanggal jadian sendiri lupa nih...',
      'Ishh ayanggg'
    ],
    // Muncul setelah 4 kali salah
    clue: 'Petunjuk: tanggal ini ada di kode yang kamu ketik di awal tadi',
  },

  // ISI CHAT: urutan bubble sesuai urutan di sini.
  // from: 'kyla' (kiri, putih) atau 'frend' (kanan, ungu)
  // time dan react boleh dikosongkan. Contoh react: '❤️'
  chat: {
    contact: 'Kyla',
    chapters: [
      {
        title: '25 November 2025',
        bubbles: [
          { from: 'frend', text: 'Day 1 pulang kerja dijemput ayankk', time: '16:40' },
          { from: 'kyla', text: 'astagaaaaa🤦🏻‍♀️🤦🏻‍♀️😝😝', time: '16:40' },
           { from: 'kyla', text: 'day 1 jemput my pacar kerja', time: '16:41' },
          { from: 'frend', text: 'Ini dirimu benerann???', time: '16:41', react: '' },
          { from: 'kyla', text: 'apaaa lahh emangg iyaa kannn', time: '16:42' },
            { from: 'frend', text: 'Ehh benerannn ???', time: '16:43', react: '' },
             { from: 'frend', text: 'Ceriusss', time: '16:43', react: '' },
              { from: 'frend', text: '????', time: '16:43', react: '' },
              { from: 'kyla', text: 'apaa?', time: '16:43' },
               { from: 'kyla', text: 'aku dari kemarin dahh bilang lohhh', time: '16:44' },
            { from: 'frend', text: 'Kirain lagi becanda lohhh', time: '16:44', react: '' },
            { from: 'frend', text: 'Horeeeee', time: '16:44', react: '' },
            { from: 'frend', text: 'Kylaaaaa', time: '16:44', react: '' },
            { from: 'frend', text: 'Lovee Youuuu', time: '16:44', react: '' },
        ],
      },
      // BAB KEDUA (opsional): hapus tanda // di bawah kalau mau dipakai, misalnya Day 1
      // {
      //   title: 'Day 1',
      //   bubbles: [
      //     { from: 'frend', text: '[...]', time: '' },
      //     { from: 'kyla', text: '[...]', time: '' },
      //   ],
      // },
    ],
  },

  closing: {
    // TULIS KALIMAT PENUTUP BULAN NOVEMBER DI SINI
    text: 'Terimakasih sudah mau jadi pacarku',
  },
}