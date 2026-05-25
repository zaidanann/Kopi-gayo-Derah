import connectDB from './mongodb';
import Menu from '../models/Menu';
import Service from '../models/Service';
import About from '../models/About';
import ContactMessage from '../models/ContactMessage';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

const menuItems = [
  {
    name: 'Espresso Gayo',
    price: 18000,
    description: 'Shot espresso murni dari biji kopi Arabika Gayo pilihan. Karakter bold dengan aftertaste yang clean dan sedikit fruity.',
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
    available: true,
    featured: true,
  },
  {
    name: 'Americano Gayo',
    price: 22000,
    description: 'Espresso Gayo yang diencerkan dengan air panas. Rasa kopi yang kuat namun lebih ringan dari espresso murni.',
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=300&fit=crop',
    available: true,
    featured: false,
  },
  {
    name: 'Cappuccino Gayo',
    price: 28000,
    description: 'Perpaduan sempurna espresso Gayo dengan steamed milk dan milk foam tebal yang creamy.',
    category: 'Milk Coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    available: true,
    featured: true,
  },
  {
    name: 'Latte Gayo',
    price: 30000,
    description: 'Espresso Gayo dengan steamed milk lembut. Rasa kopi yang seimbang dengan creamy dari susu.',
    category: 'Milk Coffee',
    image: 'https://images.unsplash.com/photo-1561882468-9110d70d7559?w=400&h=300&fit=crop',
    available: true,
    featured: true,
  },
  {
    name: 'Kopi Tubruk Gayo',
    price: 15000,
    description: 'Kopi tubruk tradisional menggunakan bubuk kopi Gayo kasar. Cara paling otentik menikmati kopi Gayo.',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    available: true,
    featured: false,
  },
  {
    name: 'Cold Brew Gayo',
    price: 32000,
    description: 'Kopi Gayo yang diseduh dingin selama 12 jam. Menghasilkan rasa yang halus, manis natural, dan kaya.',
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    available: true,
    featured: true,
  },
  {
    name: 'Manual Brew Pour Over',
    price: 35000,
    description: 'Seduh manual menggunakan V60 dengan biji kopi Gayo single origin. Setiap cangkir diseduh dengan penuh perhatian.',
    category: 'Manual Brew',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
    available: true,
    featured: false,
  },
  {
    name: 'Kopi Gayo Original',
    price: 20000,
    description: 'Kopi khas Gayo Aceh dengan metode seduh tradisional. Citarasa autentik yang tidak bisa ditemukan di tempat lain.',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&h=300&fit=crop',
    available: true,
    featured: true,
  },
  {
    name: 'Biji Kopi Premium Arabika',
    price: 85000,
    description: 'Biji kopi Arabika Gayo premium 200gr. Dipetik secara selektif dan diproses dengan metode wet-hulling khas Gayo.',
    category: 'Beans',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    available: true,
    featured: false,
  },
  {
    name: 'Es Kopi Susu Gayo',
    price: 25000,
    description: 'Kopi Gayo dengan susu segar dan es. Segar dan nikmat untuk menemani hari-harimu.',
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop',
    available: true,
    featured: true,
  },
];

const services = [
  {
    title: 'Penjualan Kopi Siap Minum',
    description: 'Nikmati kopi Gayo premium yang sudah siap minum. Kami menyajikan berbagai pilihan kopi dari espresso hingga cold brew yang dibuat dengan biji kopi terbaik dari dataran tinggi Gayo Aceh.',
    icon: 'Coffee',
    price: 'Mulai dari Rp 15.000',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    available: true,
  },
  {
    title: 'Penjualan Biji Kopi',
    description: 'Beli biji kopi Arabika Gayo langsung dari sumbernya. Tersedia dalam kemasan 200gr, 500gr, dan 1kg. Biji kopi kami dipetik merah dan diproses secara hati-hati untuk menjaga kualitas terbaik.',
    icon: 'Package',
    price: 'Mulai dari Rp 85.000/200gr',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=400&fit=crop',
    available: true,
  },
  {
    title: 'Paket Roasting Custom',
    description: 'Layanan roasting biji kopi dengan tingkat kematangan sesuai keinginan Anda. Light, Medium, atau Dark roast tersedia. Minimum order 500gr untuk layanan roasting custom.',
    icon: 'Flame',
    price: 'Rp 50.000/500gr',
    image: 'https://images.unsplash.com/photo-1442550528054-b88e81ee5e36?w=600&h=400&fit=crop',
    available: true,
  },
  {
    title: 'Konsultasi Kopi',
    description: 'Konsultasi gratis tentang pemilihan kopi, metode seduh, dan peralatan yang tepat. Tim barista berpengalaman kami siap membantu Anda menemukan kopi yang sesuai dengan selera.',
    icon: 'MessageCircle',
    price: 'Gratis',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',
    available: true,
  },
  {
    title: 'Coffee Catering',
    description: 'Layanan coffee catering untuk acara pernikahan, corporate event, seminar, dan gathering. Kami membawa peralatan profesional dan barista terlatih untuk menyajikan kopi terbaik di acara Anda.',
    icon: 'Users',
    price: 'Hubungi untuk penawaran',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    available: true,
  },
  {
    title: 'Pemesanan Online',
    description: 'Pesan kopi favorit Anda secara online melalui WhatsApp atau platform pesan antar. Tersedia layanan pick-up dan delivery untuk area sekitar.',
    icon: 'ShoppingCart',
    price: 'Gratis ongkir radius 5km',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop',
    available: true,
  },
  {
    title: 'Pengiriman Luar Kota',
    description: 'Kirim kopi Gayo ke seluruh Indonesia. Tersedia pilihan pengiriman reguler dan express. Biji kopi dikemas secara khusus untuk menjaga kesegaran selama pengiriman.',
    icon: 'Truck',
    price: 'Sesuai tarif ekspedisi',
    image: 'https://images.unsplash.com/photo-1440429735684-4f63c9c70f4f?w=600&h=400&fit=crop',
    available: true,
  },
];

const aboutContent = {
  title: 'Kopi Gayo Derah',
  subtitle: 'Cita Rasa Kopi Nusantara Asli Aceh Gayo',
  story: 'Kopi Gayo Derah lahir dari kecintaan mendalam terhadap warisan kopi Aceh yang telah dikenal dunia. Berawal dari kebun kopi keluarga di dataran tinggi Gayo, kami memulai perjalanan untuk menghadirkan kopi terbaik langsung ke tangan penikmat kopi Indonesia.',
  origin: 'Kopi kami berasal dari dataran tinggi Gayo, Aceh Tengah, yang terkenal dengan iklim sejuk dan tanah vulkanik yang kaya mineral. Di ketinggian 1.200-1.700 meter di atas permukaan laut, biji kopi Arabika Gayo tumbuh dengan sempurna, menghasilkan rasa yang unik dengan keasaman rendah dan aroma yang kompleks.',
  vision: 'Menjadi brand kopi lokal terdepan yang memperkenalkan keunikan dan keistimewaan kopi Gayo Aceh kepada seluruh penikmat kopi di Indonesia dan dunia.',
  mission: 'Menghadirkan kopi Gayo berkualitas premium langsung dari petani, menjaga keaslian cita rasa, mendukung kesejahteraan petani lokal, dan mengedukasi masyarakat tentang kekayaan kopi nusantara.',
  products: [
    { name: 'Biji Kopi Arabika', description: 'Biji kopi Arabika Gayo single origin yang dipetik selektif merah' },
    { name: 'Bubuk Kopi Premium', description: 'Kopi bubuk halus dari biji pilihan untuk seduh sehari-hari' },
    { name: 'Cold Brew Concentrate', description: 'Cold brew pekat yang diseduh 12 jam untuk rasa maksimal' },
    { name: 'Espresso Blend', description: 'Campuran khusus untuk espresso dengan body tebal dan crema sempurna' },
  ],
  composition: {
    beans: 'Biji kopi Arabika Gayo pilihan yang dipetik merah sempurna',
    roasting: 'Proses roasting medium-light yang menonjolkan karakter asli biji kopi',
    acidity: 'Keasaman rendah hingga medium dengan struktur yang seimbang',
    aroma: 'Aroma floral dengan sentuhan buah tropis, cokelat, dan rempah',
    taste: 'Rasa yang kompleks, clean finish, body sedang dengan sweetness alami',
  },
  timeline: [
    { year: '2018', event: 'Berdirinya Kopi Gayo Derah dari kebun keluarga di Aceh Tengah' },
    { year: '2019', event: 'Memulai penjualan lokal di Aceh dan menerima sambutan luar biasa' },
    { year: '2020', event: 'Ekspansi ke Medan dan Jakarta, launching toko online pertama' },
    { year: '2021', event: 'Raih penghargaan Best Local Coffee Brand dari komunitas kopi Indonesia' },
    { year: '2022', event: 'Membuka kedai pertama di Banda Aceh dengan konsep coffee experience' },
    { year: '2023', event: 'Hadir di 15 kota besar Indonesia, melayani ribuan pelanggan setia' },
    { year: '2024', event: 'Ekspor perdana ke Malaysia dan Singapura, memperkenalkan kopi Gayo ke ASEAN' },
  ],
};

async function seed() {
  await connectDB();
  console.log('Connected to MongoDB');

  // Clear existing data
  await Menu.deleteMany({});
  await Service.deleteMany({});
  await About.deleteMany({});
  await ContactMessage.deleteMany({});
  await Admin.deleteMany({});

  // Seed menu
  await Menu.insertMany(menuItems);
  console.log('Menu seeded:', menuItems.length, 'items');

  // Seed services
  await Service.insertMany(services);
  console.log('Services seeded:', services.length, 'items');

  // Seed about
  await About.create(aboutContent);
  console.log('About content seeded');

  // Seed admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  await Admin.create({
    email: process.env.ADMIN_EMAIL || 'admin@kopigayoderah.com',
    password: hashedPassword,
    name: 'Admin Kopi Gayo Derah',
    role: 'admin',
  });
  console.log('Admin seeded');

  // Seed sample messages
  await ContactMessage.insertMany([
    {
      name: 'Budi Santoso',
      email: 'budi@example.com',
      whatsapp: '08123456789',
      message: 'Halo, saya tertarik untuk memesan kopi Gayo untuk acara pernikahan saya. Bisa minta info lebih lanjut?',
      read: false,
    },
    {
      name: 'Siti Rahayu',
      email: 'siti@example.com',
      whatsapp: '08234567890',
      message: 'Apakah tersedia pengiriman ke Surabaya? Saya ingin pesan biji kopi 1kg.',
      read: true,
    },
  ]);
  console.log('Sample messages seeded');

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
