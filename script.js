// ---------------------------------------------------------
// QuickAnswer — Support Deflection MVP
// Data is embedded directly so this works from a local
// index.html with no server and no fetch/CORS issues.
// ---------------------------------------------------------

const ORDERS = [
  { orderId: "#1001", status: "Processing", date: "2026-08-10" },
  { orderId: "#1002", status: "Shipped", date: "2026-08-09" },
  { orderId: "#1003", status: "Out for Delivery", date: "2026-08-13" },
  { orderId: "#1004", status: "Shipped", date: "2026-08-11" },
  { orderId: "#1005", status: "Delivered", date: "2026-08-05" },
  { orderId: "#1006", status: "Processing", date: "2026-08-12" },
  { orderId: "#1007", status: "Delivered", date: "2026-08-02" },
  { orderId: "#1008", status: "Out for Delivery", date: "2026-08-13" },
  { orderId: "#1009", status: "Shipped", date: "2026-08-10" },
  { orderId: "#1010", status: "Processing", date: "2026-08-13" },
  { orderId: "#1011", status: "Delivered", date: "2026-07-30" },
  { orderId: "#1012", status: "Shipped", date: "2026-08-08" },
  { orderId: "#1013", status: "Out for Delivery", date: "2026-08-12" },
  { orderId: "#1014", status: "Processing", date: "2026-08-13" },
  { orderId: "#1015", status: "Delivered", date: "2026-08-01" }
];

const STOCK = [
  { product: "Wireless Headphones", quantity: 3, restockDate: "2026-08-20" },
  { product: "Bluetooth Speaker", quantity: 12, restockDate: null },
  { product: "USB-C Charging Cable", quantity: 0, restockDate: "2026-08-18" },
  { product: "Smart Watch", quantity: 7, restockDate: null },
  { product: "Laptop Sleeve", quantity: 2, restockDate: "2026-08-16" },
  { product: "Wireless Mouse", quantity: 0, restockDate: "2026-08-22" },
  { product: "Phone Case", quantity: 25, restockDate: null },
  { product: "Portable Power Bank", quantity: 4, restockDate: "2026-08-19" },
  { product: "Desk Lamp", quantity: 9, restockDate: null },
  { product: "Backpack", quantity: 1, restockDate: "2026-08-17" },
  { product: "Noise Cancelling Earbuds", quantity: 0, restockDate: "2026-08-25" },
  { product: "Water Bottle", quantity: 30, restockDate: null },
  { product: "Yoga Mat", quantity: 6, restockDate: null },
  { product: "Keyboard", quantity: 0, restockDate: "2026-08-21" },
  { product: "Webcam", quantity: 5, restockDate: null }
];

const body = document.getElementById("widgetBody");

// ---------- helpers ----------

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function scrollToBottom() {
  requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
}

function addBotMessage(text) {
  const m = el("div", "msg bot", text);
  body.appendChild(m);
  scrollToBottom();
  return m;
}

function addUserMessage(text) {
  const m = el("div", "msg user", escapeHtml(text));
  body.appendChild(m);
  scrollToBottom();
  return m;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function pillClass(label) {
  return label.toLowerCase().replace(/[^a-z]/g, "");
}

function clearTransient() {
  // remove any existing choice groups / input rows so the flow doesn't stack stale controls
  body.querySelectorAll(".choices, .input-row, .input-hint").forEach(n => n.remove());
}

// ---------- flow: greeting ----------

function showGreeting(isFirst) {
  clearTransient();
  if (isFirst) {
    addBotMessage("Hi! I'm QuickAnswer 👋 I can help you check an <strong>order status</strong> or <strong>product stock</strong>. What do you need?");
  } else {
    addBotMessage("Anything else I can help with?");
  }

  const choices = el("div", "choices");

  const orderBtn = el("button", "btn primary", "📦 Track My Order");
  orderBtn.addEventListener("click", () => {
    addUserMessage("Track My Order");
    showOrderInput();
  });

  const stockBtn = el("button", "btn primary", "🔍 Check Stock");
  stockBtn.addEventListener("click", () => {
    addUserMessage("Check Stock");
    showStockInput();
  });

  choices.appendChild(orderBtn);
  choices.appendChild(stockBtn);

  if (!isFirst) {
    const doneBtn = el("button", "btn ghost", "That's all, thanks");
    doneBtn.addEventListener("click", () => {
      addUserMessage("That's all, thanks");
      clearTransient();
      addBotMessage("You're welcome! This session is a demo of the QuickAnswer support widget for Northstar Retail Co.");
    });
    choices.appendChild(doneBtn);
  }

  body.appendChild(choices);
  scrollToBottom();
}

// ---------- flow: order status ----------

function showOrderInput() {
  clearTransient();
  addBotMessage("Sure — what's your order ID? <span style='color:var(--ink-soft)'>(e.g. #1004)</span>");

  const row = el("div", "input-row");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "#1004";
  input.setAttribute("aria-label", "Order ID");

  const goBtn = el("button", "btn primary", "Check");

  function submit() {
    const value = input.value.trim();
    if (!value) {
      input.classList.add("invalid");
      input.placeholder = "Please enter an order ID";
      input.focus();
      return;
    }
    addUserMessage(value);
    clearTransient();
    handleOrderLookup(value);
  }

  goBtn.addEventListener("click", submit);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  input.addEventListener("input", () => input.classList.remove("invalid"));

  row.appendChild(input);
  row.appendChild(goBtn);
  body.appendChild(row);
  scrollToBottom();
  input.focus();
}

function findOrder(id) {
  const normalized = id.trim().toLowerCase().replace(/\s+/g, "");
  const withHash = normalized.startsWith("#") ? normalized : "#" + normalized;
  return ORDERS.find(o => o.orderId.toLowerCase() === normalized || o.orderId.toLowerCase() === withHash);
}

function handleOrderLookup(rawId) {
  const order = findOrder(rawId);

  if (!order) {
    showFallback(`I couldn't find an order matching "${escapeHtml(rawId)}". Please double-check the ID, or reach a human agent for help.`);
    return;
  }

  const card = el("div", "msg result");
  const statusClass = pillClass(order.status);
  card.innerHTML = `
    <div class="result-row">
      <span class="result-label">Order</span>
      <span class="result-value">${order.orderId}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Status</span>
      <span class="status-pill ${statusClass}">${order.status}</span>
    </div>
    <div class="result-row">
      <span class="result-label">${order.status === "Delivered" ? "Delivered on" : "Last updated"}</span>
      <span class="result-value">${formatDate(order.date)}</span>
    </div>
  `;
  body.appendChild(card);
  scrollToBottom();

  setTimeout(() => showGreeting(false), 300);
}

// ---------- flow: stock availability ----------

function showStockInput() {
  clearTransient();
  addBotMessage("Which product are you looking for? <span style='color:var(--ink-soft)'>(e.g. Wireless Headphones)</span>");

  const row = el("div", "input-row");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Wireless Headphones";
  input.setAttribute("aria-label", "Product name");

  const goBtn = el("button", "btn primary", "Check");

  function submit() {
    const value = input.value.trim();
    if (!value) {
      input.classList.add("invalid");
      input.placeholder = "Please enter a product name";
      input.focus();
      return;
    }
    addUserMessage(value);
    clearTransient();
    handleStockLookup(value);
  }

  goBtn.addEventListener("click", submit);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  input.addEventListener("input", () => input.classList.remove("invalid"));

  row.appendChild(input);
  row.appendChild(goBtn);
  body.appendChild(row);
  scrollToBottom();
  input.focus();
}

function findStock(name) {
  const normalized = name.trim().toLowerCase();
  return STOCK.find(s => s.product.toLowerCase() === normalized) ||
         STOCK.find(s => s.product.toLowerCase().includes(normalized));
}

function stockLabel(item) {
  if (item.quantity === 0) return "Out of Stock";
  if (item.quantity <= 5) return "Low Stock";
  return "In Stock";
}

function handleStockLookup(rawName) {
  const item = findStock(rawName);

  if (!item) {
    showFallback(`I couldn't find a product matching "${escapeHtml(rawName)}". Please check the spelling, or reach a human agent for help.`);
    return;
  }

  const label = stockLabel(item);
  const statusClass = pillClass(label);

  const card = el("div", "msg result");
  card.innerHTML = `
    <div class="result-row">
      <span class="result-label">Product</span>
      <span class="result-value">${escapeHtml(item.product)}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Availability</span>
      <span class="status-pill ${statusClass}">${label}</span>
    </div>
    ${item.restockDate ? `
    <div class="result-row">
      <span class="result-label">Restock expected</span>
      <span class="result-value">${formatDate(item.restockDate)}</span>
    </div>` : ""}
  `;
  body.appendChild(card);
  scrollToBottom();

  setTimeout(() => showGreeting(false), 300);
}

// ---------- fallback / escalation ----------

function showFallback(message) {
  const card = el("div", "msg fallback");
  card.innerHTML = `
    <div style="margin-bottom:8px;">${message}</div>
    <div style="font-size:13px; opacity:0.9;">👤 A human agent can help with this — this demo doesn't connect to live systems.</div>
  `;
  body.appendChild(card);
  scrollToBottom();
  setTimeout(() => showGreeting(false), 300);
}

// ---------- boot ----------

showGreeting(true);
//=======================
// =====================================================
// MERIDIAN PIVOT - DAY 3 ORIGINAL BUILD
// Warehouse API -> Polling -> Cache -> Query
// =====================================================

// Simulated warehouse API
const warehouseAPI = {
    stock: {
            laptop: 12,
                    phone: 25,
                            headphones: 8,
                                    keyboard: 15,
                                            mouse: 30
                                                },

                                                    getStock(product) {
                                                            const productName = product.toLowerCase();
                                                                    const quantity = this.stock[productName];

                                                                            if (quantity === undefined) {
                                                                                        return {
                                                                                                        found: false,
                                                                                                                        product: product,
                                                                                                                                        quantity: 0
                                                                                                                                                    };
                                                                                                                                                            }

                                                                                                                                                                    return {
                                                                                                                                                                                found: true,
                                                                                                                                                                                            product: product,
                                                                                                                                                                                                        quantity: quantity
                                                                                                                                                                                                                };
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    };


                                                                                                                                                                                                                    // Stock cache
                                                                                                                                                                                                                    const stockCache = {};


                                                                                                                                                                                                                    // Poll the warehouse API and update the cache
                                                                                                                                                                                                                    function pollWarehouse() {
                                                                                                                                                                                                                        console.log("Polling warehouse API...");

                                                                                                                                                                                                                            for (const product in warehouseAPI.stock) {
                                                                                                                                                                                                                                    const result = warehouseAPI.getStock(product);

                                                                                                                                                                                                                                            stockCache[product] = {
                                                                                                                                                                                                                                                        quantity: result.quantity,
                                                                                                                                                                                                                                                                    available: result.quantity > 0,
                                                                                                                                                                                                                                                                                lastUpdated: new Date().toISOString()
                                                                                                                                                                                                                                                                                        };
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                console.log("Stock cache updated.");
                                                                                                                                                                                                                                                                                                }


                                                                                                                                                                                                                                                                                                // Query the cached stock
                                                                                                                                                                                                                                                                                                function queryStock(product) {
                                                                                                                                                                                                                                                                                                    const productName = product.toLowerCase();
                                                                                                                                                                                                                                                                                                        const result = stockCache[productName];

                                                                                                                                                                                                                                                                                                            if (!result) {
                                                                                                                                                                                                                                                                                                                    return {
                                                                                                                                                                                                                                                                                                                                found: false,
                                                                                                                                                                                                                                                                                                                                            product: product,
                                                                                                                                                                                                                                                                                                                                                        message: "Product not found."
                                                                                                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                        return {
                                                                                                                                                                                                                                                                                                                                                                                found: true,
                                                                                                                                                                                                                                                                                                                                                                                        product: product,
                                                                                                                                                                                                                                                                                                                                                                                                quantity: result.quantity,
                                                                                                                                                                                                                                                                                                                                                                                                        available: result.available,
                                                                                                                                                                                                                                                                                                                                                                                                                lastUpdated: result.lastUpdated
                                                                                                                                                                                                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                                                                                                                                                                                                    // Initial stock synchronization
                                                                                                                                                                                                                                                                                                                                                                                                                    pollWarehouse();


                                                                                                                                                                                                                                                                                                                                                                                                                    // Poll every 5 minutes
                                                                                                                                                                                                                                                                                                                                                                                                                    setInterval(pollWarehouse, 5 * 60 * 1000);


                                                                                                                                                                                                                                                                                                                                                                                                                    // Test query
                                                                                                                                                                                                                                                                                                                                                                                                                    console.log(queryStock("laptop")); 