require("dotenv").config({ path: "../.env" });
const db = require("../config/dbconnection"); // primary catalog database
const dbcatalogrep = require("../config/dbconnection4"); // catalog replica database

const express = require("express");
const app = express();
app.use(express.json());

// Search books by topic
app.get("/search/:topic", (req, res) => {
  const topic = req.params.topic;
  const query = "SELECT id, title FROM catalog WHERE topic = ?";

  dbcatalogrep.query(query, [topic], (err, results) => {
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

  dbcatalogrep.query(query, [id], (err, results) => {
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

// Update book stock or price in both primary and replica databases
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { quantity, price } = req.body;
  const query = "UPDATE catalog SET quantity = ?, price = ? WHERE id = ?";

  // Update the primary catalog database
  db.query(query, [quantity, price, id], (err, result) => {
    if (err) {
      console.error("Error updating catalog in primary database:", err);
      return res.status(500).json({ message: "Failed to update book in primary database" });
    }

    // Replicate the update to the replica catalog database
    dbcatalogrep.query(query, [quantity, price, id], (repErr) => {
      if (repErr) {
        console.error("Error updating catalog in replica database:", repErr);
        // Optionally, you could notify about replication errors or trigger alerts
      }

      // Send success response regardless of replica update status
      res.json({ message: "Book updated successfully in primary database and attempted update in replica" });
    });
  });
});

// Start Catalog Service Server
app.listen(4403, function () {
  console.log("Catalog Service started on Port 4403");
 
});
