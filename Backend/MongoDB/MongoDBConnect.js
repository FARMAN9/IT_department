import mongoose from "mongoose";

const URI = process.env.MongoDB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectToMongoDB = async () => {
    const connectDB = async () => {
        try {
            await mongoose.connect(URI, clientOptions);
            await mongoose.connection.db.admin().command({ ping: 1 });
            console.log("MongoDB Connected");
        } catch (error) {
            console.error("MongoDB connection error:", error.message);
            
        }
    };

    
    await connectDB();
};

export default connectToMongoDB;
