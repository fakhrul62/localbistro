export type CafeMenuItem = {
  name: string;
  description: string;
  regular: string;
  large?: string;
  badge?: string;
};

export type CafeMenuSection = {
  title: string;
  note: string;
  items: CafeMenuItem[];
};

export const cafeMenuSections: CafeMenuSection[] = [
  {
    title: "Espresso Bar",
    note: "pulled short, served warm, made slowly",
    items: [
      {
        name: "House Espresso",
        description: "Dense crema, cacao, burnt sugar",
        regular: "$4",
        large: "$6",
        badge: "daily ritual",
      },
      {
        name: "Velvet Cappuccino",
        description: "Cloud foam, toasted milk, cinnamon dust",
        regular: "$5",
        large: "$7",
      },
      {
        name: "Flat White",
        description: "Silky microfoam, double espresso base",
        regular: "$5",
        large: "$7",
      },
      {
        name: "Mocha No. 18",
        description: "Dark cocoa, espresso, cream finish",
        regular: "$6",
        large: "$8",
      },
    ],
  },
  {
    title: "Slow Coffee",
    note: "brewed to order from our favorite beans",
    items: [
      {
        name: "Yirgacheffe Pour Over",
        description: "Jasmine, lemon peel, honey clarity",
        regular: "$8",
        large: "$10",
        badge: "single origin",
      },
      {
        name: "Colombia Huila V60",
        description: "Caramel, cacao, red apple",
        regular: "$7",
        large: "$9",
      },
      {
        name: "French Press for Two",
        description: "Deep body, slow table service",
        regular: "$12",
      },
      {
        name: "Batch Brew",
        description: "Rotating roast, quick and comforting",
        regular: "$4",
        large: "$6",
      },
    ],
  },
  {
    title: "Cold Cups",
    note: "low acid, chilled, built for long afternoons",
    items: [
      {
        name: "Amber Cold Brew",
        description: "16-hour steep, maple depth",
        regular: "$6",
        large: "$8",
      },
      {
        name: "Iced Vanilla Latte",
        description: "House vanilla, espresso, cold milk",
        regular: "$6",
        large: "$8",
      },
      {
        name: "Espresso Tonic",
        description: "Sparkling tonic, citrus, fresh espresso",
        regular: "$7",
        large: "$9",
        badge: "bright",
      },
      {
        name: "Cold Mocha Cream",
        description: "Cocoa, cold brew, whipped cream",
        regular: "$7",
        large: "$9",
      },
    ],
  },
  {
    title: "Seasonal & Comfort",
    note: "a little sweet, never too loud",
    items: [
      {
        name: "Sage Vanilla Latte",
        description: "Vanilla, browned butter, sage foam",
        regular: "$7",
        large: "$9",
        badge: "seasonal",
      },
      {
        name: "Caramel Hearth Latte",
        description: "Burnt caramel, sea salt, espresso",
        regular: "$7",
        large: "$9",
      },
      {
        name: "Honey Oat Cortado",
        description: "Oat milk, honey, compact espresso",
        regular: "$6",
      },
      {
        name: "Cinnamon Cloud",
        description: "Milk foam, cinnamon bark, soft spice",
        regular: "$6",
        large: "$8",
      },
    ],
  },
  {
    title: "Pastry Counter",
    note: "baked early, best with a second cup",
    items: [
      {
        name: "Butter Croissant",
        description: "Flaky, golden, served warm",
        regular: "$5",
      },
      {
        name: "Almond Morning Bun",
        description: "Almond cream, citrus sugar",
        regular: "$6",
      },
      {
        name: "Banana Espresso Loaf",
        description: "Moist banana bread, coffee glaze",
        regular: "$5",
      },
      {
        name: "Savory Herb Toast",
        description: "Cream cheese, herbs, cracked pepper",
        regular: "$7",
      },
    ],
  },
];
