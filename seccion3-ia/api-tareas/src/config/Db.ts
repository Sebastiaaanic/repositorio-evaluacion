import sql from "mssql";
import { config } from "./env.js";

const dbConfig: sql.config = {
  user: config.DB_USER || "tu_usuario",
  password: config.DB_PASSWORD || "tu_contraseña",
  server: config.DB_HOST || "localhost",
  database: config.DB_NAME || "tu_base_de_datos",
  port: Number(config.DB_PORT) || 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const connectTDB = async (): Promise<sql.ConnectionPool> => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error("FAILED TO CONNECT DB", error);
    throw error;
  }
};

export { sql };
