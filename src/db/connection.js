import { MongoClient } from "mongodb";
import { config } from "../config/index.js";

let client = null;
let db = null;

async function connectDB() {
  if (db) {
    return db;
  }

  if (!config.mongoUri) {
    throw new Error(
      "MONGODB_URI is not defined. Please set it in your .env file.",
    );
  }

  client = new MongoClient(config.mongoUri);
  await client.connect();
  db = client.db(config.dbName);
  console.log(
    `Connected to MongoDB successfully. Database name: ${db.databaseName}`,
  );
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("MongoDB connection closed.");
  }
}

export { connectDB, getDB, closeDB };
