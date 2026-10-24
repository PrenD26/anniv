// ============================================================
// KONTEN SEPTEMBER 2025: edit di sini saja, tanpa menyentuh animasi
// September tidak punya foto atau video, jadi tidak ada slot media.
// ============================================================
export const SEPTEMBER = {
  // LAGU: taruh di  public/audio/september.mp3
  audio: '/audio/september.mp3',

  title: 'September 2025',
  subtitle: 'Awal kita kenal',

  store: {
    name: 'GOLDEN SWALAYAN',
    start: 'Ketuk koala dan kucing untuk memulai',
      pick: 'Pilih satu tempat, atau colek koala dan kucing',
    done: 'Semua tempat sudah dikunjungi',
    locked: 'Selesaikan kasir dan meja packing dulu',
    open: 'BUKA',
    closed: 'TUTUP',
    chips: { packing: 'Meja packing', kasir: 'Kasir', talk: 'Ngobrol' },
   
  },

  packing: {
    hint: 'Ketuk barang untuk memasukkannya ke kantong',
    heavy: 'Yang berat dulu, ya!',
    done: 'Beres!',
    // TULIS CERITA MEJA PACKING DI SINI
    story: '[TULIS CERITA MEJA PACKING DI SINI]',
  },

  kasir: {
    hint: 'Ketuk barang untuk memindainya',
    beep: ['bip!', 'bip!', 'tiit!'],
    done: 'Notanya keluar!',
    receipt: {
      store: 'GOLDEN SWALAYAN',
      city: 'Tulungagung',
      date: '[01/09/2025]', // GANTI dengan tanggal pertama kalian bertemu
      part: 'Kasir',
      items: [
        ['1x Cewek Imut (Kyla)', 1],
        ['1x Cewek Cantik (Kyla)', 1],
        ['1x Cewek Manis (Kyla)', 1],
      ],
      total: '1 cerita',
      note: 'Kenangan yang sudah dibeli tidak dapat dikembalikan.',
      hint: 'Ketuk nota untuk membaca ceritanya',
      egg: 'Nomor WA ditulis di kertas, bukan di HP', // muncul saat Kyla mengetuk barcode
    },
    // CERITA di kartu yang terbuka saat nota diketuk (draf dari ceritamu, silakan ganti)
    story: {
      title: 'Awal Kita Kenal',
      paragraphs: [
        'Aku kasir, kamu PKL yang bantu packing.',
        'Dari situ kita jadi sering ngobrol, sampai akhirnya tukeran nomor WA.',
        'Sesimpel itu, tapi dari situ semuanya mulai.',
      ],
    },
  },

  talk: {
    // OBROLAN DI KASIR: who = 'frend' (kucing) atau 'kyla' (koala). Tambah atau kurangi barisnya.
    lines: [
      { who: 'frend', text: '[OBROLAN 1: kalimat pertamamu]' },
      { who: 'kyla', text: '[BALASAN KYLA 1]' },
      { who: 'frend', text: '[OBROLAN 2: misalnya saat meminta nomor WA]' },
      { who: 'kyla', text: '[BALASAN KYLA 2]' },
    ],
    next: 'Lanjut',
    writing: 'Kyla menuliskan nomornya di kertas...',
    // Nomor di kertas: boleh diganti nomor asli, atau dibiarkan disamarkan
    number: '08xx-xxxx-xxxx',
    give: 'Beri kertasnya',
    giveHint: 'Ketuk untuk memberikan kertasnya',
    nightHint: 'Toko tutup. Malam itu aku memberanikan diri chat duluan',
    chatBtn: 'Buka chat pertama',
    // TULIS CERITA TUKAR KONTAK DI SINI
    story: '[TULIS CERITA TUKAR KONTAK DI SINI]',
  },

  // CHAT PERTAMA: urutan bubble. from: 'frend' (kanan, ungu) atau 'kyla' (kiri, putih)
  chat: {
    contact: 'Kyla',
    chapters: [
      {
        title: 'September 2025',
        bubbles: [
          { from: 'frend', text: '[CHAT PERTAMAMU: ganti dengan isi chat sebenarnya]', time: '' },
          { from: 'kyla', text: '[BALASAN KYLA]', time: '' },
          { from: 'frend', text: '[CHAT BERIKUTNYA]', time: '' },
        ],
      },
    ],
  },

  // TULIS KALIMAT PENUTUP SEPTEMBER DI SINI
  closing: '[TULIS KALIMAT PENUTUP SEPTEMBER DI SINI]',
}