const stockCache = {
  "Wireless Headphones": 12,
  "USB-C Cable": 25,
  "Laptop Stand": 7,
  "Bluetooth Speaker": 0
};

// Simulated warehouse API
function warehouseAPI() {
  return {
    "Wireless Headphones": 12,
    "USB-C Cable": 25,
    "Laptop Stand": 7,
    "Bluetooth Speaker": 0
  };
}

// Day 3: Poll warehouse every 5 minutes
function pollWarehouse() {
  const warehouseStock = warehouseAPI();

  Object.assign(stockCache, warehouseStock);

  console.log("Stock cache updated:", new Date().toISOString());
}

// Query cached inventory
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

// Initial poll
pollWarehouse();

// Repeat every 5 minutes
setInterval(pollWarehouse, 5 * 60 * 1000);

module.exports = {
  queryStock,
  pollWarehouse
};
