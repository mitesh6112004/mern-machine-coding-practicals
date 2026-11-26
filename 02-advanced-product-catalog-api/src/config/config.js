import "dotenv/config";

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
};

export default config; 