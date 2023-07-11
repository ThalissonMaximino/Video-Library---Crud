import { Client } from "pg";



const client = new Client({
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected.");
};

export { client, connectDatabase };
