const stockCache = {
  "Wireless Headphones": 25,
  "USB-C Cable": 18,
  "Laptop Stand": 7,
  "Bluetooth Speaker": 0
};

// FINAL DAY 5 ARCHITECTURE
// Warehouse pushes inventory updates through a webhook.
// The previous polling implementation has been removed.

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
    message: "Stock cache updated",
    updatedAt: new Date().toISOString()
  };
}

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

module.exports = {
  receiveWarehouseWebhook,
  queryStock
};
