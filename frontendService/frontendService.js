const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

const app = express();
app.use(express.json());

// Initialize cache with default TTL (time to live) of 60 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Array of URLs for load balancing
const CATALOG_URLS = ["http://catalog:4401", "http://catalogrep:4403"];
const ORDER_URLS = ["http://order:4402", "http://orderrep:4404"];

// Indexes to keep track of the current server for each service
let catalogIndex = 0;
let orderIndex = 0;

// Helper function to get the next URL for catalog and order services
function getNextCatalogUrl() {
  const url = CATALOG_URLS[catalogIndex];
  catalogIndex = (catalogIndex + 1) % CATALOG_URLS.length;
  console.log(`Using Catalog URL: ${url}`);  
  return url;
}

function getNextOrderUrl() {
  const url = ORDER_URLS[orderIndex];
  orderIndex = (orderIndex + 1) % ORDER_URLS.length;
  console.log(`Using Order URL: ${url}`);
  return url;
}

app.get("/search/:topic", async (req, res) => {
  const topic = req.params.topic;

  // Check cache for data
  const cachedData = cache.get(`search_${topic}`);
  if (cachedData) {
    console.log("Returning cached data for search");
    return res.json(cachedData);
  }

  // Fetch data from catalog service if not cached
  try {
    const response = await axios.get(`${getNextCatalogUrl()}/search/${topic}`);
    cache.set(`search_${topic}`, response.data);  // Cache the response data
    res.json(response.data);
    console.log("Fetched and cached search data");
  } catch (error) {
    console.error("Error details:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching catalog data", error: error.message });
  }
});

app.get("/info/:id", async (req, res) => {
  const id = req.params.id;

  // Check cache for data
  const cachedData = cache.get(`info_${id}`);
  if (cachedData) {
    console.log("Returning cached data for info");
    return res.json(cachedData);
  }

  // Fetch data from catalog service if not cached
  try {
    const response = await axios.get(`${getNextCatalogUrl()}/info/${id}`);
    if (!response.data) {
      return res.status(404).json({ message: "ID not found" });
    }

    cache.set(`info_${id}`, response.data);  // Cache the response data
    res.json(response.data);
    console.log("Fetched and cached info data");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "ID not found" });
    } else {
      res.status(500).json({ message: "Error fetching item data" });
    }
  }
});

app.post("/purchase/:id", async (req, res) => {
  const id = req.params.id;

  // Check cache for data
  const cachedData = cache.get(`purchase_${id}`);
  if (cachedData) {
    console.log("Returning cached data for purchase");
    return res.json(cachedData);
  }

  // Make purchase request to order service if not cached
  try {
    const response = await axios.post(`${getNextOrderUrl()}/purchase/${id}`);
    cache.set(`purchase_${id}`, response.data);  // Cache the response data
    res.json(response.data);
    console.log("Fetched and cached purchase data");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ message: error.response.data.message });
    } else {
      res.status(500).json({ message: "Error processing purchase" });
    }
  }
});

// Start Frontend service Server
app.listen(3000, function () {
  console.log("Frontend service running on port 3000");
});
