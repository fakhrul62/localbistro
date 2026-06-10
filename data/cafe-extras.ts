export const cafeInfo = {
  address: "18 Market Lane, Old Town",
  phone: "+1 (555) 018-2048",
  email: "hello@localbistro.cafe",
  hours: [
    { days: "Monday-Friday", time: "7:00 AM-8:00 PM" },
    { days: "Saturday", time: "8:00 AM-9:00 PM" },
    { days: "Sunday", time: "8:00 AM-6:00 PM" },
  ],
};

export const seasonalSpecials = [
  {
    name: "Mango Cold Brew",
    description: "Sixteen-hour cold brew, mango nectar, citrus foam, and a clean espresso finish.",
    price: "$7",
    tag: "summer cup",
  },
  {
    name: "Brown Butter Vanilla Latte",
    description: "House vanilla, browned butter syrup, double espresso, and oat milk on request.",
    price: "$7",
    tag: "comfort",
  },
  {
    name: "Weekend Brunch Set",
    description: "Velvet cappuccino, savory herb toast, and a small sweet from the pastry counter.",
    price: "$14",
    tag: "sat-sun",
  },
];

export const events = [
  {
    title: "Acoustic Table Sessions",
    date: "Every Friday",
    time: "6:30 PM",
    description: "A small, soft-volume live set built for coffee, conversation, and late pastries.",
  },
  {
    title: "Pour Over Class",
    date: "First Saturday",
    time: "10:00 AM",
    description: "Learn grind size, water temperature, blooming, and tasting with the bar team.",
  },
  {
    title: "Book Swap Morning",
    date: "Last Sunday",
    time: "9:00 AM",
    description: "Bring a book, take a book, and get a refill discount while the table is open.",
  },
];

export const reviews = [
  {
    name: "Maya R.",
    quote: "The kind of cafe where the staff remembers your cup and the pastry case never misses.",
  },
  {
    name: "Julian T.",
    quote: "Their cold brew is smooth enough to drink black, and the room feels calm even when it is full.",
  },
  {
    name: "Ari N.",
    quote: "I buy beans here every week because they taste like the coffee I get at the counter.",
  },
];

export const subscriptions = [
  {
    name: "Counter Regular",
    cadence: "1 bag monthly",
    price: "$18",
    description: "A rotating 12 oz bag for easy weekday brewing.",
  },
  {
    name: "Slow Morning",
    cadence: "2 bags monthly",
    price: "$34",
    description: "One comfort roast and one single origin for weekends.",
  },
  {
    name: "Office Table",
    cadence: "4 bags monthly",
    price: "$64",
    description: "A practical refill plan for small teams and shared kitchens.",
  },
];

export const brewGuides = [
  {
    method: "V60 Pour Over",
    ratio: "1:16",
    grind: "medium-fine",
    time: "2:45-3:15",
  },
  {
    method: "French Press",
    ratio: "1:14",
    grind: "coarse",
    time: "4:00",
  },
  {
    method: "Cold Brew",
    ratio: "1:8",
    grind: "coarse",
    time: "16 hours",
  },
];
