import mongoose from 'mongoose';

const PLACEHOLDER_PATTERNS = [
  '<username>',
  '<password>',
  'xxxxx',
  'your-cluster',
];

const validateMongoUri = () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.trim() === '') {
    console.error(
      'MongoDB Connection Error: MONGO_URI is missing.\n' +
        'Copy server/.env.example to server/.env and set your Atlas connection string.'
    );
    process.exit(1);
  }

  const hasPlaceholder = PLACEHOLDER_PATTERNS.some((pattern) =>
    uri.includes(pattern)
  );

  if (hasPlaceholder) {
    console.error(
      'MongoDB Connection Error: MONGO_URI still contains placeholder values.\n' +
        'Replace <username>, <password>, and cluster0.xxxxx with your real Atlas credentials.\n' +
        'Atlas → Database → Connect → Drivers → copy the connection string.'
    );
    process.exit(1);
  }
};

const connectDB = async () => {
  validateMongoUri();

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);

    if (error.message.includes('ENOTFOUND')) {
      console.error(
        'Hint: Check that your cluster hostname in MONGO_URI is correct (from MongoDB Atlas).'
      );
    }

    if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.error(
        'Hint: Verify your database username and password in MONGO_URI.'
      );
    }

    process.exit(1);
  }
};

export default connectDB;
