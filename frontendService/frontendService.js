const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const CATALOG_URL = "http://catalog:4401";
const ORDER_URL = "http://order:4402";

app.get("/search/:topic", async (req, res) => {
  try {
    const response = await axios.get(
      `${CATALOG_URL}/search/${req.params.topic}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error details:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching catalog data", error: error.message });
  }
});

app.get("/info/:id", async (req, res) => {
  try {
    const response = await axios.get(`${CATALOG_URL}/info/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item data" });
  }
});

app.post("/purchase/:id", async (req, res) => {
  try {
    const response = await axios.post(`${ORDER_URL}/purchase/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error processing purchase" });
  }
});

// Start Frontend service Server
app.listen(3000, function () {
  console.log("Frontend service running on port 3000");
});
