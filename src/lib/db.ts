import mongoose from "mongoose";

const MongoDB_URI = process.env.MongoDB_URI!;
if (!MongoDB_URI) {
    console.error("Please define mongodb uri in env file");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connectToDatabase() {
    if(cached.conn){
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands : true,
            maxPoolSize: 10
        }
        cached.promise = mongoose
            .connect(MongoDB_URI, opts).then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        console.error(error);
        throw new Error("Database Connection Problem");
    }
    return cached.conn;
}
