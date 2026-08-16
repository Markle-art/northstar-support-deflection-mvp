# QA Test Plan — QuickAnswer

Tester: Loureen Shillah (QA & Testing Lead). Fill in **Actual Result** and **Pass/Fail** columns once tests are run against the real build.

| Test ID | Scenario | Input | Expected Result | Actual Result | Pass/Fail | Tester |
|---|---|---|---|---|---|---|
| TC01 | Valid order ID lookup | `#1004` | Returns "Shipped" with date 2026-08-11 | | | |
| TC02 | Invalid/unknown order ID | `#9999` | Shows fallback/escalation message | | | |
| TC03 | Order ID with different casing | `#1004` typed as lowercase or with extra space | Still matches and returns correct status | | | |
| TC04 | Empty order ID submitted | (blank) | Prompts "Please enter a value", no lookup attempted | | | |
| TC05 | Valid product name lookup (exact) | `Wireless Headphones` | Returns "Low Stock" with restock date 2026-08-20 | | | |
| TC06 | Valid product name lookup (partial match) | `headphones` | Returns same result as TC05 | | | |
| TC07 | Out-of-stock product | `USB-C Charging Cable` | Returns "Out of Stock" with restock date 2026-08-18 | | | |
| TC08 | In-stock product (qty > 5) | `Bluetooth Speaker` | Returns "In Stock", no restock date shown | | | |
| TC09 | Invalid/unknown product name | `Drone` | Shows fallback/escalation message | | | |
| TC10 | Empty product name submitted | (blank) | Prompts "Please enter a value", no lookup attempted | | | |
| TC11 | "Anything else?" loop after order result | Click "Anything else?" after TC01 | Returns to greeting/category selection screen | | | |
| TC12 | Switch category mid-flow | Click "Check Stock" while Order input is showing | Cleanly switches to Stock input panel, no leftover state | | | |

## Bug Log
(QA Lead fills this in during T12 for anything that fails)

| Bug ID | Related Test ID | Description | Severity | Reported To | Status |
|---|---|---|---|---|---|
| | | | | Technical Lead | |

## Test Summary (fill in after T12)
- Total test cases: 12
- Passed: [fill in]
- Failed: [fill in]
- Bugs found and fixed before demo: [fill in]
- Known unresolved issues (if any, disclose honestly in the Go-Live Readiness Note): [fill in]

## QA Evidence

### Order-status success
Tested with order `#1004`. The prototype returned the expected shipped status.

![Order status success](..qa-evidence/Screenshot_20260816_212643_Chrome.jpg)

### Order-status fallback
Tested with an invalid order ID. The prototype returned a fallback message and directed the customer to a human agent.

![Order status fallback](..qa-evidence/Screenshot_20260816_212944_Chrome.jpg)

### Stock-availability success
Tested product lookup using "Speaker". The prototype returned the expected Bluetooth Speaker availability result.

![Stock availability success](..qa-evidence/Screenshot_20260816_212859_Chrome.jpg)
