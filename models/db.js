import mysql from "mysql";
import dbConfig from "../config/db.config.json";

export default mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
