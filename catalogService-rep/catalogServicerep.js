require("dotenv").config({ path: "../.env" });
const db = require("../config/dbconnection");
const express = require("express");
const app = express();
app.use(express.json());

// Search books by topic
app.get("/search/:topic", (req, res) => {
  const topic = req.params.topic;
  const query = "SELECT id, title FROM catalog WHERE topic = ?";

  db.query(query, [topic], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to retrieve books");
    }
    res.json(results);
  
  });
});

// Get book info by item ID
app.get("/info/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM catalog WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to retrieve books");
    }

    if (results.length === 0) {
      return res.status(404).send("There is no book with this id");
    }
    res.json(results);
 
  });
});


// Update book stock or price
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { quantity, price } = req.body;
  const query = "UPDATE catalog SET quantity = ?, price = ? WHERE id = ?";
  db.query(query, [quantity, price, id], (err, result) => {
    if (err) console.error(err);
    res.json({ message: "Book updated successfully" });
  });
});

// Start Catalog Service Server
app.listen(4403, function () {
  console.log("Catalog Service started on Port 4403");
 
});
