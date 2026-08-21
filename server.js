const express = require("express");

const app = express();
const PORT = 3000;

// Simulated warehouse API
const warehouseAPI = {
    stock: {
        laptop: 12,
        phone: 25,
        headphones: 8,
        keyboard: 15,
        mouse: 30
    }
};

// Stock cache
const stockCache = {};

// Poll warehouse API
function pollWarehouse() {
    console.log("Polling warehouse API...");

    for (const product in warehouseAPI.stock) {
        const quantity = warehouseAPI.stock[product];

        stockCache[product] = {
            quantity: quantity,
            available: quantity > 0,
            lastUpdated: new Date().toISOString()
        };
    }

    console.log("Stock cache updated.");
}

// Initial poll
pollWarehouse();

// Poll every 5 minutes
setInterval(pollWarehouse, 5 * 60 * 1000);

// Query endpoint
app.get("/stock/:product", (req, res) => {
    const product = req.params.product.toLowerCase();
    const result = stockCache[product];

    if (!result) {
        return res.status(404).json({
            found: false,
            product: product,
            message: "Product not found."
        });
    }

    res.json({
        found: true,
        product: product,
        quantity: result.quantity,
        available: result.available,
        lastUpdated: result.lastUpdated
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Stock service running on port ${PORT}`);
});