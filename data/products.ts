export type ProductCategory =
  | "Coffee Beans"
  | "Ground Coffee"
  | "Equipment"
  | "Merchandise";

export type Product = {
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  category: ProductCategory;
  badge?: string;
  image: string;
  roast?: string;
  notes?: string[];
};

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "ethiopia-yirgacheffe-250g",
    name: "Ethiopia Yirgacheffe 250g",
    description: "Floral single origin with citrus, honey, and tea-like clarity.",
    fullDescription:
      "A bright washed coffee from Yirgacheffe with layered jasmine aroma, lemon peel, and soft honey sweetness. Roasted light to preserve its delicate structure for pour-over and filter brewing.",
    price: 18,
    category: "Coffee Beans",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1200&q=85",
    roast: "Light roast",
    notes: ["Jasmine", "Lemon", "Honey"],
  },
  {
    slug: "colombia-huila-250g",
    name: "Colombia Huila 250g",
    description: "Balanced medium roast with caramel, cacao, and red apple.",
    fullDescription:
      "A rounded Colombian lot from Huila built for everyday cups without losing character. Expect caramel depth, red apple brightness, and a cacao finish that works beautifully as espresso or drip.",
    price: 17,
    category: "Coffee Beans",
    image:
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=1200&q=85",
    roast: "Medium roast",
    notes: ["Caramel", "Cacao", "Red apple"],
  },
  {
    slug: "sumatra-mandheling-250g",
    name: "Sumatra Mandheling 250g",
    description: "Deep, earthy dark roast with cedar, molasses, and spice.",
    fullDescription:
      "A rich Sumatran coffee roasted for slow mornings and bold milk drinks. Its low acidity, syrupy body, and notes of cedar, molasses, and baking spice make it a Local Bistro staple.",
    price: 19,
    category: "Coffee Beans",
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=85",
    roast: "Dark roast",
    notes: ["Cedar", "Molasses", "Spice"],
  },
  {
    slug: "morning-table-ground",
    name: "Morning Table Ground",
    description: "Pre-ground breakfast blend with toasted nut and cream notes.",
    fullDescription:
      "Ground fresh for easy daily brewing, Morning Table is a soft, comforting blend for moka pots, drip machines, and French press. It has a smooth toasted nut profile with a gentle cream finish.",
    price: 15,
    category: "Ground Coffee",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
    roast: "Medium roast",
    notes: ["Hazelnut", "Cream", "Brown sugar"],
  },
  {
    slug: "afterhours-espresso-ground",
    name: "Afterhours Espresso Ground",
    description: "Fine-ground espresso blend with dark chocolate and orange.",
    fullDescription:
      "A pre-ground espresso blend designed for stovetop and pressurized home machines. Dark chocolate, orange rind, and a clean finish make it dependable for short cups and milk drinks.",
    price: 16,
    category: "Ground Coffee",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
    roast: "Medium-dark roast",
    notes: ["Dark chocolate", "Orange", "Roasted almond"],
  },
  {
    slug: "heritage-french-press",
    name: "Heritage French Press",
    description: "Glass and steel French press for rich, unhurried coffee.",
    fullDescription:
      "A sturdy French press made for full-bodied weekend brewing. The heat-resistant glass chamber and stainless filter keep the ritual simple, tactile, and deeply satisfying.",
    price: 42,
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1545665225-b23b99e4d45e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "ceramic-pour-over-dripper",
    name: "Ceramic Pour-Over Dripper",
    description: "Hand-finished ceramic dripper for precise filter coffee.",
    fullDescription:
      "A weighty ceramic dripper with a steady flow profile for clean, articulate cups. Pair it with light roast beans to draw out florals, citrus, and soft sweetness.",
    price: 34,
    category: "Equipment",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1525088553748-01d6e210e00b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "local-bistro-stoneware-mug",
    name: "Local Bistro Stoneware Mug",
    description: "Cream stoneware mug with a hand-stamped Local Bistro mark.",
    fullDescription:
      "A comfortable stoneware mug with a satin cream glaze and subtle Local Bistro mark. It is made for the first cup at home, the last espresso in the shop, and every pause between.",
    price: 24,
    category: "Merchandise",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "market-canvas-tote",
    name: "Market Canvas Tote",
    description: "Durable cotton tote for beans, books, and morning errands.",
    fullDescription:
      "A heavy cotton canvas tote printed in espresso ink with the Local Bistro cup mark. Sized for market runs, coffee gear, and a small stack of books.",
    price: 28,
    category: "Merchandise",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=85",
  },
];

export const featuredProducts = products.slice(0, 3);

export const menuItems: MenuItem[] = [
  {
    name: "Velvet House Espresso",
    description: "Dense crema, cacao nib, burnt sugar, and a clean finish.",
    price: "$5",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Amber Cold Brew",
    description: "Steeped for sixteen hours with maple depth and low acidity.",
    price: "$7",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Yirgacheffe Pour Over",
    description: "Slow-filtered florals, lemon peel, and honeyed clarity.",
    price: "$8",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Sage Vanilla Latte",
    description: "Seasonal latte with vanilla, browned butter, and sage foam.",
    price: "$8",
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Mocha Tonic",
    description: "Espresso, dark cocoa, tonic sparkle, and orange zest.",
    price: "$7",
    image:
      "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Cinnamon Cloud Cappuccino",
    description: "Microfoam, cinnamon bark, and toasted milk sweetness.",
    price: "$6",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=85",
  },
];
