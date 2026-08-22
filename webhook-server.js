// Northstar Retail Co. — Day 4 Pivot
// Polling has been replaced by a webhook push model.

const stockCache = {
  "Wireless Headphones": 20,
  "USB-C Cable": 18,
  "Laptop Stand": 7,
  "Bluetooth Speaker": 0
};

// Simulated message queue
const messageQueue = [];

// Receive a stock update request and place it on the queue
function publishStockUpdate(update) {
  if (!update || !update.stock) {
    return {
      success: false,
      message: "Invalid stock update"
    };
  }

  messageQueue.push(update);

  return {
    success: true,
    message: "Stock update published to queue",
    queueSize: messageQueue.length
  };
}

// Simulated webhook callback after the warehouse processes the request
function receiveWarehouseWebhook(payload) {
  if (!payload || !payload.stock) {
    return {
      success: false,
      message: "Invalid webhook payload"
    };
  }

  Object.assign(stockCache, payload.stock);

  return {
    success: true,
    message: "Stock cache updated from webhook",
    updatedAt: new Date().toISOString()
  };
}

// Support tool queries cached inventory
function queryStock(product) {
  const quantity = stockCache[product];

  if (quantity === undefined) {
    return {
      product,
      found: false,
      inStock: false,
      quantity: 0
    };
  }

  return {
    product,
    found: true,
    inStock: quantity > 0,
    quantity
  };
}

// Test 1 — stock update is published
console.log(
  publishStockUpdate({
    stock: {
      "Wireless Headphones": 25
    }
  })
);

// Test 2 — webhook confirms the update
console.log(
  receiveWarehouseWebhook({
    stock: {
      "Wireless Headphones": 25
    }
  })
);

// Test 3 — query returns updated stock
console.log(queryStock("Wireless Headphones"));

module.exports = {
  publishStockUpdate,
  receiveWarehouseWebhook,
  queryStock
};
