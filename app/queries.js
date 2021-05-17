const { DBPassword } = require("../CONFIG.json");
const PGPOOL = require("pg").Pool;
const myPool = new PGPOOL({
    user: "me",
    host: "localhost",
    database: "api",
    password: DBPassword,
    port: 5432
});