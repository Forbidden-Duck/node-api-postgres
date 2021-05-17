const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 6001;

const db = require("./queries");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ info: "NodeJS, ExpressJS and PostgreSQL API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});