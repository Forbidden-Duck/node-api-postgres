const { DBPassword } = require("../CONFIG.json");
const PGPOOL = require("pg").Pool;
const myPool = new PGPOOL({
    user: "me",
    host: "localhost",
    database: "api",
    password: DBPassword,
    port: 5432
});

const getUsers = (req, res) => {
    myPool.query("SELECT * FROM users ORDER BY id ASC",
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        });
};

const getUserByID = (req, res) => {
    const id = parseInt(req.params.id);

    myPool.query("SELECT * FROM users WHERE id = $1", [id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        });
};

const createUser = (req, res) => {
    const { name, email } = req.body;

    myPool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id", [name, email],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(201).send(`User added with ID: ${results.rows[0].id}`)
        });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    myPool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User modified with ID: ${id}`);
        });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    myPool.query("DELETE FROM users WHERE id = $1", [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
};