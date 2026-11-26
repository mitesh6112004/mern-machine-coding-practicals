import config from "../config/config.js";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

const sampleProducts = [
  {
    name: "iphone 15 Pro",
    description:
      "Apple flagship smartphone with A17 Pro chip and titanium design",
    category: "electronics",
    brand: "Apple",
    price: 134900,
    rating: 4.8,
    stock: 15,
  },
  {
    name: "Galaxy S24 Ultra",
    description: "Samsung flagship phone with S-Pen and 200MP camera",
    category: "electronics",
    brand: "Samsung",
    price: 129999,
    rating: 4.7,
    stock: 20,
  },
  {
    name: "WH-1000XM5 Headphones",
    description:
      "Industry leading wireless noise cancelling over-ear headphones",
    category: "electronics",
    brand: "Sony",
    price: 29990,
    rating: 4.9,
    stock: 30,
  },
  {
    name: "MacBook Air M3",
    description:
      "Lightweight 13-inch laptop with Apple M3 chip and 18-hour battery",
    category: "electronics",
    brand: "Apple",
    price: 114900,
    rating: 4.8,
    stock: 10,
  },
  {
    name: "Classic Cotton Polo T-Shirt",
    description: "Breathable 100 percent combed cotton slim fit polo shirt",
    category: "clothing",
    brand: "US Polo",
    price: 1499,
    rating: 4.2,
    stock: 50,
  },
  {
    name: "511 Slim Fit Jeans",
    description: "Stretchable dark indigo denim jeans for everyday comfort",
    category: "clothing",
    brand: "Levis",
    price: 3299,
    rating: 4.5,
    stock: 35,
  },
  {
    name: "Dri-FIT Running Jacket",
    description: "Lightweight sweat-wicking windbreaker jacket for runners",
    category: "clothing",
    brand: "Nike",
    price: 4495,
    rating: 4.4,
    stock: 0,
  },
  {
    name: "Clean Code",
    description:
      "A handbook of agile software craftsmanship by Robert C. Martin",
    category: "books",
    brand: "Pearson",
    price: 2850,
    rating: 4.9,
    stock: 25,
  },
  {
    name: "Designing Data-Intensive Applications",
    description:
      "The big ideas behind reliable, scalable, and maintainable systems",
    category: "books",
    brand: "OReilly",
    price: 3400,
    rating: 4.9,
    stock: 18,
  },
  {
    name: "Atomic Habits",
    description:
      "An easy and proven way to build good habits and break bad ones",
    category: "books",
    brand: "Penguin",
    price: 550,
    rating: 4.7,
    stock: 60,
  },
  {
    name: "Ergonomic Mesh Office Chair",
    description: "Adjustable lumbar support chair for long coding sessions",
    category: "home",
    brand: "Green Soul",
    price: 8999,
    rating: 4.4,
    stock: 12,
  },
  {
    name: "Stainless Steel Electric Kettle",
    description: "1.5 litre fast boiling cordless kettle with auto shut-off",
    category: "home",
    brand: "Prestige",
    price: 1199,
    rating: 4.1,
    stock: 40,
  },
  {
    name: "Smart LED Desk Lamp",
    description: "Touch control study lamp with 3 color modes and USB charging",
    category: "home",
    brand: "Philips",
    price: 1899,
    rating: 4.3,
    stock: 28,
  },
  {
    name: "Pegasus 40 Running Shoes",
    description: "Responsive cushioned road running shoes for daily training",
    category: "sports",
    brand: "Nike",
    price: 9695,
    rating: 4.6,
    stock: 22,
  },
  {
    name: "English Willow Cricket Bat",
    description: "Grade 2 full-size lightweight cricket bat with thick edges",
    category: "sports",
    brand: "SG",
    price: 6499,
    rating: 4.5,
    stock: 14,
  },
  {
    name: "Anti-Slip TPE Yoga Mat",
    description: "6mm thick eco-friendly exercise mat with carrying strap",
    category: "sports",
    brand: "Decathlon",
    price: 999,
    rating: 4.3,
    stock: 0,
  },
];

const seedDatabase = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(sampleProducts);
        console.log("Database seeded successfully with 16 sample products!");
        process.exit(1);
    } catch (error) {
        console.error(`Seeding error: ${error.message}`);
        process.exit(1);
    }
}

seedDatabase();