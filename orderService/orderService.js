require("dotenv").config({ path: "../.env" });
const dbCatalog = require("../config/dbconnection"); // catalog database
const dbOrder = require("../config/dbconnection2"); // order database
const express = require("express");
const app = express();

app.post("/purchase/:id", (req, res) => {
  const id = req.params.id;

  // Check stock in the catalog database
  const checkStockQuery = "SELECT quantity FROM catalog WHERE id = ?";
  dbCatalog.query(checkStockQuery, [id], (err, results) => {
    if (err) {
      console.error("Error checking stock:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0 && results[0].quantity > 0) {
      const updateStockQuery = "UPDATE catalog SET quantity = quantity - 1 WHERE id = ?";
      const logOrderQuery = "INSERT INTO orders (item_id) VALUES (?)";

      // Start transaction in dbCatalog
      dbCatalog.beginTransaction((err) => {
        if (err) {
          console.error("Error starting transaction in catalog:", err);
          return res.status(500).json({ message: "Transaction error" });
        }

        // Update stock in catalog database
        dbCatalog.query(updateStockQuery, [id], (err) => {
          if (err) {
            console.error("Error updating stock in catalog:", err);
            return dbCatalog.rollback(() => res.status(500).json({ message: "Server error" }));
          }

          // Start transaction in dbOrder after updating catalog stock
          dbOrder.beginTransaction((err) => {
            if (err) {
              console.error("Error starting transaction in orders:", err);
              dbCatalog.rollback(() => res.status(500).json({ message: "Transaction error" }));
              return;
            }

            // Log order in orders database
            dbOrder.query(logOrderQuery, [id], (err) => {
              if (err) {
                console.error("Error logging order in orders:", err);
                dbOrder.rollback(() => {
                  dbCatalog.rollback(() => res.status(500).json({ message: "Server error" }));
                });
                return;
              }

              // Commit the transaction in dbOrder
              dbOrder.commit((err) => {
                if (err) {
                  console.error("Error committing transaction in orders:", err);
                  dbOrder.rollback(() => {
                    dbCatalog.rollback(() => res.status(500).json({ message: "Transaction commit error" }));
                  });
                  return;
                }

                // Commit the transaction in dbCatalog if dbOrder commit was successful
                dbCatalog.commit((err) => {
                  if (err) {
                    console.error("Error committing transaction in catalog:", err);
                    dbCatalog.rollback(() => {
                      dbOrder.rollback(() => res.status(500).json({ message: "Transaction commit error" }));
                    });
                    return;
                  }

                  // Success: Both transactions committed
                  res.json({ message: "Purchase successful" });
                });
              });
            });
          });
        });
      });
    } else {
      res.status(400).json({ message: "Item out of stock" });
    }
  });
});

// Start Order Service Server
const PORT = 4402;
app.listen(PORT, () => {
  console.log(`Order Service started on Port ${PORT}`);
});
