import mongoose from "mongoose";
import { config } from "dotenv";
import User from "@/internal/models/user";
import Category from "@/internal/models/category";
import Product from "@/internal/models/product";
import { connectDB } from "@/internal/config/database";

config();

const seed = async () => {
   try {
      const connection = connectDB();

      await new Promise((resolve) => connection.on("open", resolve));
      console.log("Connected to database for seeding...");

      // Clear existing data
      await User.deleteMany({});
      await Category.deleteMany({});
      await Product.deleteMany({});
      console.log("Cleared existing data.");

      // Seed Categories
      const categories = await Category.insertMany([
         { name: "Electronics", description: "Gadgets and devices" },
         { name: "Clothing", description: "Apparel and accessories" },
         { name: "Books", description: "Educational and fiction books" },
         {
            name: "Home & Kitchen",
            description: "Home appliances and kitchenware",
         },
      ]);
      console.log(`Seeded ${categories.length} categories.`);

      // Seed Users
      const users = await User.create([
         {
            name: "Admin User",
            email: "admin@example.com",
            password: "password123",
            role: "admin",
         },
         {
            name: "Seller One",
            email: "seller1@example.com",
            password: "password123",
            role: "seller",
         },
         {
            name: "Buyer One",
            email: "buyer1@example.com",
            password: "password123",
            role: "buyer",
         },
      ]);
      console.log(`Seeded ${users.length} users.`);

      const seller = users.find((u) => u.role === "seller");
      const electronics = categories.find((c) => c.name === "Electronics");
      const home = categories.find((c) => c.name === "Home & Kitchen");

      if (seller && electronics && home) {
         // Seed Products
         const products = await Product.insertMany([
            {
               name: "Smartphone X",
               description: "Latest model smartphone with high-end specs.",
               price: 999,
               stock: 50,
               category: electronics._id,
               sellerId: seller._id,
            },
            {
               name: "Laptop Pro",
               description: "Powerful laptop for professionals.",
               price: 1500,
               stock: 20,
               category: electronics._id,
               sellerId: seller._id,
            },
            {
               name: "Coffee Maker",
               description: "Automatic coffee maker for your morning brew.",
               price: 80,
               stock: 100,
               category: home._id,
               sellerId: seller._id,
            },
         ]);
         console.log(`Seeded ${products.length} products.`);
      }

      console.log("Seeding completed successfully!");
      process.exit(0);
   } catch (error) {
      console.error("Error during seeding:", error);
      process.exit(1);
   }
};

seed();
