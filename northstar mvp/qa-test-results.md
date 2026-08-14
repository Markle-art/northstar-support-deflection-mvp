The following section presents the results obtained during the testing of the Northstar Support Deflection MVP. The tests were conducted to verify that the prototype functions as expected, responds correctly to different user inputs, and provides accurate support outcomes. The results below summarize the key observations and outcomes from the QA testing process.

QA Test Results — QuickAnswer

Tester: Loureen Shillah
Role: QA & Testing Lead

Test 1: Valid order ID lookup

Input: #1004

Expected Result: Returns "Shipped" with date 2026-08-11.

Actual Result: Returns "Shipped" with date 2026-08-11.

Result: PASS ✅

---

Test 2: Invalid/unknown order ID

Input: #9999

Expected Result: Shows fallback/escalation message.

Actual Result: Shows fallback/escalation message.

Result: PASS ✅

---

Test 3: Order ID with different casing/spacing

Input: #1004 with lowercase or extra space

Expected Result: Still matches and returns the correct status.

Actual Result: Matches and returns the correct status.

Result: PASS ✅

---

Test 4: Empty order ID submitted

Input: Blank

Expected Result: Prompts "Please enter a value"; no lookup attempted.

Actual Result: Prompts the user to enter a value without attempting a lookup.

Result: PASS ✅

---

Test 5: Valid product name lookup

Input: Wireless Headphones

Expected Result: Returns "Low Stock" with restock date 2026-08-20.

Actual Result: Returns "Low Stock" with restock date 2026-08-20.

Result: PASS ✅

---

Test 6: Valid product name lookup — partial match

Input: headphones

Expected Result: Returns the same result as Test 5.

Actual Result: Returns "Low Stock" with restock date 2026-08-20.

Result: PASS ✅

---

Test 7: Out-of-stock product

Input: USB-C Charging Cable

Expected Result: Returns "Out of Stock" with restock date 2026-08-18.

Actual Result: Returns "Out of Stock" with restock date 2026-08-18.

Result: PASS ✅

---

Test 8: In-stock product

Input: Bluetooth Speaker

Expected Result: Returns "In Stock" with no restock date shown.

Actual Result: Returns "In Stock" with no restock date shown.

Result: PASS ✅

---

Test 9: Invalid/unknown product name

Input: Drone

Expected Result: Shows fallback/escalation message.

Actual Result: Shows fallback/escalation message.

Result: PASS ✅

---

Test 10: Empty product name submitted

Input: Blank

Expected Result: Prompts "Please enter a value"; no lookup attempted.

Actual Result: Prompts the user to enter a value without attempting a lookup.

Result: PASS ✅

---

Test 11: "Anything else?" loop

Input: Click "Anything else?" after Test 1.

Expected Result: Returns to the greeting/category selection screen.

Actual Result: Returns to the greeting/category selection screen.

Result: PASS ✅

---

Test 12: Switch category mid-flow

Input: Click "Check Stock" while the Order input is showing.

Expected Result: Cleanly switches to the Stock input panel with no leftover state.

Actual Result: Successfully switches to the Stock input panel without leftover order state.

Result: PASS 


Test summary 

Total test: 12

Passed: 12

Failed: 0


