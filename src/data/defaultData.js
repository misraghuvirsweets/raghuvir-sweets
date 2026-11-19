// Seed data shown on first load. Admin edits are saved on top of this.
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const CATEGORIES = [
  'Pure Ghee Mithai',
  'Bengali Sweets',
  'Dry Fruit Specials',
  'Fresh Cakes & Pastries',
  'Namkeen & Snacks',
  'Festival Gift Boxes',
];

export const UNITS = ['per kg', 'per 500g', 'per box', 'per pc', 'per dozen'];
export const BADGES = ['None', 'Bestseller', 'Fresh Today', 'New'];

export const defaultData = {
  version: 1,
  settings: {
    shopName: 'Raghuvir Sweets and Bakers',
    tagline: 'Crafting Pure Taste & Tradition Since Generations',
    whatsappNumber: '919876543210', // country code + number, no "+" or spaces
    email: 'orders@raghuvirsweets.in',
    fssai: '1XXXXXXXXXXXXX',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: '',
    outlets: [
      {
        id: 'o1',
        name: 'Outlet 1 – Main Bazaar',
        address: '12, Main Bazaar Road, Near Clock Tower, Your City – 000001',
        timings: 'Mon–Sun: 8:00 AM – 10:30 PM',
        phone: '+91 98765 43210',
        mapsUrl: 'https://maps.google.com/?q=Raghuvir+Sweets',
      },
      {
        id: 'o2',
        name: 'Outlet 2 – Civil Lines',
        address: '45, Civil Lines, Opp. City Park, Your City – 000002',
        timings: 'Mon–Sun: 9:00 AM – 10:00 PM',
        phone: '+91 98765 43211',
        mapsUrl: 'https://maps.google.com/?q=Raghuvir+Sweets+Civil+Lines',
      },
    ],
  },
  products: [
    { id: 'p1', name: 'Kaju Katli', category: 'Pure Ghee Mithai', price: 1100, unit: 'per kg', description: 'Silky cashew diamonds finished with edible silver varq.', badge: 'Bestseller', inStock: true, image: img('photo-1601303516534-bf4d4a7ec1e9') },
    { id: 'p2', name: 'Motichoor Ladoo', category: 'Pure Ghee Mithai', price: 560, unit: 'per kg', description: 'Fine boondi fried in desi ghee, scented with cardamom and saffron.', badge: 'Fresh Today', inStock: true, image: img('photo-1666190092159-3171cf0fbb12') },
    { id: 'p3', name: 'Rasmalai', category: 'Bengali Sweets', price: 45, unit: 'per pc', description: 'Soft chenna discs soaked in chilled saffron-pistachio rabri.', badge: 'Bestseller', inStock: true, image: img('photo-1645177628172-a94c1f96e6db') },
    { id: 'p4', name: 'Rasgulla', category: 'Bengali Sweets', price: 380, unit: 'per kg', description: 'Spongy, juicy cottage-cheese balls in light sugar syrup.', badge: 'None', inStock: true, image: img('photo-1605197161470-5d9a0f5a1b6b') },
    { id: 'p5', name: 'Kesar Badam Barfi', category: 'Dry Fruit Specials', price: 1250, unit: 'per kg', description: 'Almond-rich barfi infused with Kashmiri saffron.', badge: 'New', inStock: true, image: img('photo-1606471191009-63994c53433b') },
    { id: 'p6', name: 'Premium Dry Fruit Box', category: 'Dry Fruit Specials', price: 1499, unit: 'per box', description: 'Cashews, almonds, pistachios, figs and dates in a velvet box.', badge: 'Bestseller', inStock: true, image: img('photo-1596591606975-97ee5cef3a1e') },
    { id: 'p7', name: 'Chocolate Truffle Cake', category: 'Fresh Cakes & Pastries', price: 750, unit: 'per kg', description: 'Belgian chocolate ganache layered over moist cocoa sponge.', badge: 'Fresh Today', inStock: true, image: img('photo-1578985545062-69928b1d9587') },
    { id: 'p8', name: 'Pineapple Pastry', category: 'Fresh Cakes & Pastries', price: 70, unit: 'per pc', description: 'Light vanilla sponge with fresh cream and pineapple chunks.', badge: 'None', inStock: true, image: img('photo-1488477181946-6428a0291777') },
    { id: 'p9', name: 'Bakarwadi', category: 'Namkeen & Snacks', price: 420, unit: 'per kg', description: 'Crispy, spiral-rolled snack with a sweet-spicy masala filling.', badge: 'None', inStock: true, image: img('photo-1601050690597-df0568f70950') },
    { id: 'p10', name: 'Royal Diwali Gift Hamper', category: 'Festival Gift Boxes', price: 2199, unit: 'per box', description: 'Assorted mithai, dry fruits, diyas and a handwritten greeting card.', badge: 'New', inStock: true, image: img('photo-1607920591413-4ec007e70023') },
  ],
  offers: [
    { id: 'f1', title: 'Festive Mithai Combo', subtitle: 'Kaju Katli 500g + Motichoor Ladoo 500g + Rasmalai (6 pcs) at a special price.', discountTag: '20% OFF', expiry: '2026-12-31', active: true, image: img('photo-1601303516534-bf4d4a7ec1e9') },
    { id: 'f2', title: 'Celebration Cake Week', subtitle: 'Flat discount on all 1 kg designer cakes. Free candles & message on cake!', discountTag: 'FLAT ₹150 OFF', expiry: '2026-12-25', active: true, image: img('photo-1578985545062-69928b1d9587') },
  ],
};
