const stockCache = {
  "Wireless Headphones": 12,
  "USB-C Cable": 25,
  "Laptop Stand": 7,
  "Bluetooth Speaker": 0
};

// Day 4: Webhook receives warehouse stock updates
function receiveWarehouseWebhook(payload) {
  if (!payload || !payload.stock) {
    return {
      success: false,
      message: "Invalid warehouse update"
    };
  }

  Object.assign(stockCache, payload.stock);

  return {
    success: true,
    message: "Stock cache updated from warehouse webhook",
    updatedAt: new Date().toISOString()
  };
}

// Support tool queries the cached stock
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

// Example warehouse push
const warehouseUpdate = {
  stock: {
    "Wireless Headphones": 20,
    "USB-C Cable": 18
  }
};

console.log(receiveWarehouseWebhook(warehouseUpdate));

module.exports = {
  receiveWarehouseWebhook,
  queryStock
};
