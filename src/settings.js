import dotenv from "dotenv";

dotenv.config();

const { env } = process;

export const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = env;
