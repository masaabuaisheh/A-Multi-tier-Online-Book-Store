require("dotenv").config({ path: "../.env" });

const db = require("../config/dbconnection");
const express = require("express");
const app = express();

// Purchase book by item ID
app.post("/purchase/:id", (req, res) => {
  const id = req.params.id;

  // Check stock
  const checkStockQuery = "SELECT quantity FROM catalog WHERE id = ?";
  db.query(checkStockQuery, [id], (err, results) => {
    if (err) throw err;

    if (results[0].quantity > 0) {
      // Reduce stock and log order
      const updateStockQuery =
        "UPDATE catalog SET quantity = quantity - 1 WHERE id = ?";
      const logOrder = "INSERT INTO orders (item_id) VALUES (?)";

      db.query(updateStockQuery, [id], (err, result) => {
        if (err) throw err;
        db.query(logOrder, [id], (err, result) => {
          if (err) throw err;
          res.json({ message: "Purchase successful" });
        });
      });
    } else {
      res.status(400).json({ message: "Item out of stock" });
    }
  });
});

// Start Order Service Server
app.listen(4402, function () {
  console.log("Order Service started on Port 4402");
});
