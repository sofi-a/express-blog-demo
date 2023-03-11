import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const mongo = {
  uri:
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_TEST_URI
      : process.env.MONGO_URI,
  auth: {
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
};
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
