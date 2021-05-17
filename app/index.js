const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 6001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ info: "NodeJS, ExpressJS and PostgreSQL API" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
});