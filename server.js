const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const PORT = 3000;

// Webhook secret used to verify warehouse messages
const WEBHOOK_SECRET = "northstar-demo-secret";

// Stock cache
const stockCache = {};

// =====================================================
// DAY 4 PIVOT
// Polling has been removed.
// Stock updates now arrive through a webhook.
// =====================================================

// Verify webhook signature
function verifyWebhookSignature(payload, signature) {
    const expectedSignature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(payload)
        .digest("hex");

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}


// Webhook endpoint
app.post("/webhook/stock", (req, res) => {
    const signature = req.headers["x-webhook-signature"];

    if (!signature) {
        return res.status(401).json({
            error: "Missing webhook signature"
        });
    }

    const payload = JSON.stringify(req.body);

    let validSignature = false;

    try {
        validSignature = verifyWebhookSignature(payload, signature);
    } catch (error) {
        validSignature = false;
    }

    if (!validSignature) {
        return res.status(401).json({
            error: "Invalid webhook signature"
        });
    }

    const { product, quantity } = req.body;

    if (!product || quantity === undefined) {
        return res.status(400).json({
            error: "Product and quantity are required"
        });
    }

    const productName = product.toLowerCase();

    stockCache[productName] = {
        quantity: quantity,
        available: quantity > 0,
        lastUpdated: new Date().toISOString()
    };

    console.log(`Webhook update received: ${productName} = ${quantity}`);

    res.json({
        success: true,
        product: productName,
        quantity: quantity,
        available: quantity > 0
    });
});


// Stock query endpoint
app.get("/stock/:product", (req, res) => {
    const product = req.params.product.toLowerCase();

    const result = stockCache[product];

    if (!result) {
        return res.status(404).json({
            found: false,
            product: product,
            message: "Product not found in stock cache."
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


// Health check
app.get("/", (req, res) => {
    res.json({
        service: "Northstar Inventory Sync",
        status: "running",
        model: "webhook push"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Stock service running on port ${PORT}`);
});