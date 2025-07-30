import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.MONGO_URI;


const uri = "mongodb+srv://ttanmay22:Tanmay22@onlyfollowers.0gqllyx.mongodb.net/?retryWrites=true&w=majority&appName=Onlyfollowers";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    if (!client.topology?.isConnected()) {
      await client.connect();
      console.log("✅ Connected to MongoDB Atlas");
    }
    return client;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};

export default connectDB;
