const { Client } = require("pg");
const e = require("express");
const client = new Client({
  user: "postgres",
  host: "postgres_database",
  database: "group_drive",
  password: "example",
  port: 5432,
});
client
  .connect()
  .then(() => {
    console.log("postgres db connection is successfull");
  })
  .catch((e) => {
    console.log("no connection to postgres, did something go wrong?");
  });

module.exports = client;
