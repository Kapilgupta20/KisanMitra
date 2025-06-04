import { MongoClient } from 'mongodb';

let dbs;

const connectDB = async () => {
    const URI = process.env.MONGODB_URI;
    const client = new MongoClient(URI);
    try {
        await client.connect();
        dbs = client.db("KisanMitra");
        console.log(`\n MongoDB connected `);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export const getDB = () => {
    if (!dbs) {
        throw Error('Database not initialized. Call connectDB first.');
    }
    return dbs;
};

export default connectDB
