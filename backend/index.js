import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lamadev",
});

app.use(express.json());
app.use(cors());

// sometimes when we create new db will have to run this commad for auth
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM BOOKS";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  // INSERT INTO `lamadev`.`books` (`id`, `title`, `desc`, `price`) VALUES ('1', 'test', 'desc');

  const q = "INSERT INTO BOOKS (`title`, `desc`, `cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book have be created sucessfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM BOOKS WHERE (`id` = ? )";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book have deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book have deleted successfully");
  });
});

app.listen(8000, () => {
  console.log("connected to backend");
});
