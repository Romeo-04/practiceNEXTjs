import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env file'
  );
}

/**
 * Global connection cache to prevent multiple connections
 * during hot-reloads in development mode
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Caches the connection to reuse across function calls
 * 
 * @returns {Promise<mongoose.Connection>} The MongoDB connection
 */
async function connectToDatabase(): Promise<mongoose.Connection> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable mongoose buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset promise on error to allow retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
