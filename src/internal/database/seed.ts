import { config } from "dotenv";
config();

import { connectDB } from "@/internal/config/database";
import User from "@/internal/models/user";
import Category from "@/internal/models/category";
import Product from "@/internal/models/product";
import Store from "@/internal/models/store";
import { uploadFile } from "@/pkg/cloudinary/cloudinary";
import fs from "fs";
import path from "path";

const seed = async () => {
   try {
      await connectDB();

      console.log("Connected to database for seeding...");
      const publicImagePath = path.resolve("./public/product.jpg");
      const imageBuffer = fs.readFileSync(publicImagePath);
      const imageUrl = await uploadFile(
         {
            originalname: "product.jpg",
            buffer: imageBuffer,
            size: imageBuffer.length,
            mimetype: "image/jpeg",
         } as any,
         "products"
      );

      // Clear existing data
      await User.deleteMany({});
      await Category.deleteMany({});
      await Product.deleteMany({});
      await Store.deleteMany({});
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
            name: "User One",
            email: "user1@example.com",
            password: "password123",
            role: "user",
         },
      ]);
      console.log(`Seeded ${users.length} users.`);

      // Seed Store for User One
      const store = await Store.create({
         name: "User One Store",
         user: users[1]._id,
      });
      console.log(`Seeded store for ${users[1].name}.`);

      const electronics = categories.find((c) => c.name === "Electronics");
      const home = categories.find((c) => c.name === "Home & Kitchen");

      if (electronics && home) {
         // Seed Products
         const products = await Product.insertMany([
            {
               name: "Smartphone X",
               description: "Latest model smartphone with high-end specs.",
               price: 14000000,
               stock: 50,
               category: electronics._id,
               store: store._id,
               imageUrl: imageUrl.publicPath,
            },
            {
               name: "Laptop Pro",
               description: "Powerful laptop for professionals.",
               price: 15000000,
               stock: 20,
               category: electronics._id,
               store: store._id,
               imageUrl: imageUrl.publicPath,
            },
            {
               name: "Coffee Maker",
               description: "Automatic coffee maker for your morning brew.",
               price: 4000000,
               stock: 100,
               category: home._id,
               store: store._id,
               imageUrl: imageUrl.publicPath,
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
