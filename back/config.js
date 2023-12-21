import { MongoClient } from "mongodb";

const uri = 'mongodb://127.0.0.1:27017';
export const client = new MongoClient(uri,{});
export async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}
}