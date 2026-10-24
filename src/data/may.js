// ============================================================
// KONTEN MEI 2026: edit di sini saja, tanpa menyentuh animasi
//
// MEDIA: foto -> public/photos/, video -> public/videos/.
// Mau foto atau video? Cukup ganti ekstensi dan folder di 'src'.
// ============================================================
export const MAY = {
  // LAGU: taruh di  public/audio/mei.mp3
  audio: '/audio/mei.mp3',

  title: 'Mei 2026',
  subtitle: 'Buket, cincin, dan negeri di atas awan', // draf

  studio: {
    title: 'Photo studio',
    subtitle: 'Latar putih, pose berdua',
    date: '[TANGGAL PHOTO STUDIO]',
    hint: 'Ketuk rana untuk berfoto',
    poses: 3,
    done: 'Hasil cetaknya keluar!',
    // TULIS CERITA PHOTO STUDIO DI SINI
    story: '[TULIS CERITA PHOTO STUDIO DI SINI]',
    // FOTO: taruh di public/photos/may-1.jpg dan may-2.jpg
    media: [
      { src: '/photos/may-1.jpg', caption: '[caption studio 1]' },
      { src: '/photos/may-2.jpg', caption: '[caption studio 2]' },
    ],
  },

  bouquet: {
    title: 'Buket yang mulai jadi',
    subtitle: 'Lilac dan putih, lanjutan dari April',
    date: '16 Mei 2026',
    hint1: 'Ketuk tempat kosong untuk mengisi mawar',
    hint2: 'Ketuk untuk melipat kertas pembungkus',
    done: 'Hampir jadi!',
    ribbon: 'Happy Birthday Sayang',
    // TULIS CERITA BUKET MULAI JADI DI SINI
    story: '[TULIS CERITA BUKET MULAI JADI DI SINI]',
    // FOTO: may-3.jpg (buket yang masih dirangkai) dan may-4.jpg (buket sudah jadi)
    media: [
      { src: '/photos/may-3.jpg', caption: '[caption buket proses]' },
      { src: '/photos/may-4.jpg', caption: '[caption buket jadi]' },
    ],
  },

  birthday: {
    title: '25 Mei',
    subtitle: 'Ulang tahun Kyla',
    date: '',
        hintPeek: 'Geser kertas pembungkusnya ke kiri atau kanan',
    peeked: 'Kyla kecil banget di balik buket!',
    next: 'Lanjut ke hadiah',
    hintRing: 'Geser tutup kotaknya ke kiri atau kanan',
      fitted: 'Cincin untukmu',
    done: 'Hadiah terbaik',
    // TULIS CERITA ULANG TAHUN DAN CINCIN DI SINI
    story: '[TULIS CERITA ULANG TAHUN DAN CINCIN DI SINI]',
    // FOTO: may-5.jpg (Kyla menerima bunga) dan may-6.jpg (opsional, cincin di jari)
    media: [
      { src: '/photos/may-5.jpg', caption: '[caption menerima bunga]' },
      { src: '/photos/may-6.jpg', caption: '[caption cincin]' },
    ],
  },

  dieng: {
    title: 'Dieng',
    subtitle: 'Perjalanan ke negeri di atas awan',
    board: {
      title: 'JADWAL PERJALANAN',
      // [waktu, kegiatan, jenis]  jenis: go | rest | plan | oops | food | home
      rows: [
        ['30 Mei · malam', 'Berangkat naik bus', 'go'],
        ['31 Mei · subuh', 'Berhenti, sholat subuh', 'rest'],
        ['05:00', 'Target tiba di Pintu Langit', 'plan'],
        ['06:00-07:00', 'Tiba, sunrise sudah lewat', 'oops'],
        ['09:00', 'Sarapan', 'food'],
        ['±10:00', 'Kawah Sikidang (macet)', 'go'],
        ['±13:00', 'Turun dari Sikidang', 'go'],
        ['15:00', 'Makan', 'food'],
        ['16:00', 'Naik bus menuju Malioboro', 'go'],
        ['Maghrib', 'Bus mogok', 'oops'],
        ['00:00', 'Tiba di DIY, makan malam', 'food'],
        ['01:00', 'Malioboro naik becak', 'go'],
        ['02:00', 'Kembali ke bus', 'go'],
        ['1 Juni · ±08:00', 'Tiba di Tulungagung', 'home'],
      ],
    },
  },

  bus: {
    title: 'Bus malam',
    subtitle: '30 Mei, kita berangkat',
    hint: 'Ketuk jendela untuk memajukan jam',
    stopLine: 'Berhenti sebentar untuk sholat subuh',
    done: 'Subuh di jalan',
    // TULIS CERITA BUS MALAM DAN SHOLAT SUBUH DI SINI
    story: '[TULIS CERITA BUS MALAM DAN SHOLAT SUBUH DI SINI]',
    // FOTO: may-7.jpg
    media: [{ src: '/photos/may-7.jpg', caption: '[caption bus malam]' }],
  },

  sky: {
    title: 'Pintu Langit',
    subtitle: '31 Mei, kita terlambat',
        hint: 'Geser jam ke kanan dan lihat apa yang terjadi',
    sunrise: 'Sunrise terjadi tanpa kita, masih macet di jalan',
    late: 'Harusnya jam 5 kita sudah di sini',
    missed: 'Sunrise-nya sudah lewat, tapi kita tetap sampai',
    // TULIS CERITA PINTU LANGIT DI SINI
    story: '[TULIS CERITA PINTU LANGIT DI SINI]',
    // FOTO: may-8.jpg dan may-9.jpg
    media: [
      { src: '/photos/may-8.jpg', caption: '[caption Pintu Langit 1]' },
      { src: '/photos/may-9.jpg', caption: '[caption Pintu Langit 2]' },
    ],
  },

  sikidang: {
    title: 'Kawah Sikidang',
    subtitle: 'Macet dulu, baru kawah',
    hintJam: 'Ketuk klakson untuk maju',
    hintMask: 'Ketuk koala untuk memasang masker',
    horns: ['tiin!', 'tin tin!', 'beep!', 'Ayo dong!', 'Macet...'],
    maskOn: 'Masker terpasang, aman dari bau belerang',
    done: 'Selamat dari belerang',
    // TULIS CERITA KAWAH SIKIDANG DI SINI
    story: '[TULIS CERITA KAWAH SIKIDANG DI SINI]',
    // FOTO may-10.jpg dan VIDEO may-11.mp4
    media: [
      { src: '/photos/may-10.jpg', caption: '[caption Sikidang foto]' },
      { src: '/videos/may-11.mp4', caption: '[caption Sikidang video]' },
    ],
  },

  mogok: {
    title: 'Bus mogok',
    subtitle: 'Maghrib di jalan',
    hint: 'Ketuk untuk ikut mendorong bus',
    go: 'Jalan lagi!',
    // TULIS CERITA BUS MOGOK DI SINI
    story: '[TULIS CERITA BUS MOGOK DI SINI]',
    // FOTO: may-12.jpg
    media: [{ src: '/photos/may-12.jpg', caption: '[caption bus mogok]' }],
  },

  malioboro: {
    title: 'Malioboro',
    subtitle: 'Pukul 01:00, naik becak',
    hint: 'Gulir pelan untuk berkeliling',
    arrive: 'Ketuk becak untuk mengenang',
    // TULIS CERITA MALIOBORO DI SINI
    story: '[TULIS CERITA MALIOBORO DAN BECAK DI SINI]',
    // FOTO: may-13.jpg
    media: [{ src: '/photos/may-13.jpg', caption: '[caption Malioboro]' }],
  },

  pulang: {
    title: 'Pulang',
    subtitle: '1 Juni, pagi hari',
    hint: '',
    done: 'Sampai di rumah',
    // TULIS CERITA PULANG DI SINI
    story: '[TULIS CERITA PULANG DI SINI]',
    // FOTO: may-14.jpg
    media: [{ src: '/photos/may-14.jpg', caption: '[caption pulang]' }],
  },

  // TULIS KALIMAT PENUTUP BULAN MEI DI SINI
  closing: '[TULIS KALIMAT PENUTUP DI SINI]',
}