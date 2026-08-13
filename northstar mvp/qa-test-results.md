The following section presents the results obtained during the testing of the Northstar Support Deflection MVP. The tests were conducted to verify that the prototype functions as expected, responds correctly to different user inputs, and provides accurate support outcomes. The results below summarize the key observations and outcomes from the QA testing process.

QA Test Results
Test 1: Valid order ID lookup
Input: #1004
Expected: Returns "Shipped" with date 2026-08-11
Actual Result: Returns "Shipped" with date 2026-08-11
Result: PASS ✅
Test 2: Invalid/unknown order ID
Input: #9999
Expected: Shows fallback/escalation message
Actual Result: Shows fallback/escalation message
Result: PASS ✅
Test 3: Order ID with different casing
Input: #1004 typed as lowercase or with extra space
Expected: Still matches and returns correct status
Actual Result: Correctly matches and returns the order status
Result: PASS ✅
Test 4: Empty order ID submitted
Input: Blank
Expected: Prompts "Please enter a value"; no lookup attempted
Actual Result: Prompts the user to enter a value without attempting a lookup
Result: PASS ✅
Test 5: Valid product name lookup (exact)
Input: Wireless Headphones
Expected: Returns "Low Stock" with restock date 2026-08-20
Actual Result: Returns "Low Stock" with restock date 2026-08-20
Result: PASS ✅
Test 6: Valid product name lookup (partial match)
Input: headphones
Expected: Returns low stock with restock date
Actual Result: Returns low stock with restock date 
Result: PASS ✅
Test 7: Out-of-stock product
Input: USB-C Charging Cable
Expected: Returns "Out of Stock" with restock date 2026-08-18
Actual Result: Returns "Out of Stock" with restock date 2026-08-18
Result: PASS ✅
Test 8: In-stock product (quantity 1–5)
Input: Bluetooth Speaker
Expected: Returns "In Stock", no restock date shown
Actual Result: Returns "In Stock" with no restock date shown
Result: PASS ✅
Test 9: Invalid/unknown product name
Input: Drone
Expected: Shows fallback/escalation message
Actual Result: Shows fallback/escalation message
Result: PASS ✅
Test 10: Empty product name submitted
Input: Blank
Expected: Prompts "Please enter a value"; no lookup attempted
Actual Result: Prompts the user to enter a value without attempting a lookup
Result: PASS ✅
Test 11: "Anything else?" loop after order result
Input: Click "Anything else?" after test 1 
Expected: Returns to greeting/category selection screen
Actual Result: Returns to the greeting/category selection screen
Result: PASS ✅
Test 12: Switch category mid-flow
Input: Click "Check Stock" while Order input is showing
Expected: Cleanly switches to Stock input panel, no leftover state
Actual Result: Successfully switches to the Stock input panel without leftover order state
Result: PASS 
