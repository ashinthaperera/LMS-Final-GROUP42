// require("reflect-metadata");
// const { DataSource } = require("typeorm");
// // const { Student } = require("./entities/studentEntity");
// const { User } = require("./models/userEntity");
// const dotenv = require("dotenv");

// dotenv.config();

// const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [Student, User],
//   synchronize: true,
//   logging: false,
//   subscribers: [],
//   migrations: [],
// });

// module.exports = { AppDataSource };
