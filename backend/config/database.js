import mongoose from 'mongoose';

const log = (msg, level = 'info') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${msg}`);
};

export const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gene-guard';

    log('Connecting to MongoDB...');

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    log('✓ MongoDB connected successfully to gene-guard database', 'info');

    return mongoose.connection;
  } catch (error) {
    log(`✗ MongoDB connection failed: ${error.message}`, 'error');
    log('Starting in offline mode with rule-based fallback', 'warn');
    return null;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    log('✓ MongoDB disconnected', 'info');
  } catch (error) {
    log(`✗ Failed to disconnect: ${error.message}`, 'error');
  }
};

export default mongoose;
