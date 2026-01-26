"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const database_1 = require("../../internal/config/database");
const user_1 = __importDefault(require("../../internal/models/user"));
const category_1 = __importDefault(require("../../internal/models/category"));
const product_1 = __importDefault(require("../../internal/models/product"));
const store_1 = __importDefault(require("../../internal/models/store"));
const cloudinary_1 = require("../../pkg/cloudinary/cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        console.log("Connected to database for seeding...");
        const publicImagePath = path_1.default.resolve("./public/product.jpg");
        const imageBuffer = fs_1.default.readFileSync(publicImagePath);
        const imageUrl = yield (0, cloudinary_1.uploadFile)({
            originalname: "product.jpg",
            buffer: imageBuffer,
            size: imageBuffer.length,
            mimetype: "image/jpeg",
        }, "products");
        // Clear existing data
        yield user_1.default.deleteMany({});
        yield category_1.default.deleteMany({});
        yield product_1.default.deleteMany({});
        yield store_1.default.deleteMany({});
        console.log("Cleared existing data.");
        // Seed Categories
        const categories = yield category_1.default.insertMany([
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
        const users = yield user_1.default.create([
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
        const store = yield store_1.default.create({
            name: "User One Store",
            user: users[1]._id,
        });
        console.log(`Seeded store for ${users[1].name}.`);
        const electronics = categories.find((c) => c.name === "Electronics");
        const home = categories.find((c) => c.name === "Home & Kitchen");
        if (electronics && home) {
            // Seed Products
            const products = yield product_1.default.insertMany([
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
    }
    catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
});
seed();
