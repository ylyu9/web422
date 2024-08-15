const { MongoClient } = require('mongodb');

let client;
let clientPromise;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://yingtonglyu0226:4zT1olLwXuPHMJPu@cluster0.t6phhk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!client) {
  client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
  });
  clientPromise = client.connect();
}

async function connectToDatabase() {
  try {
    await clientPromise; // Wait for the client to connect
    const db = client.db("DB_users");
    console.log("Successfully connected to MongoDB!");
    return { db, client };
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };