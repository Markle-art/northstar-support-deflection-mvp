# Go-Live Readiness Note — QuickAnswer Support Deflection MVP

**Project:** The Northstar Sprint | **Team:** Mark Kamaamia, Mark Ochieng, Grace Murigi, Loureen Shillah, Maureen Naranoi | **Date:** [fill in submission date]

## What Works
QuickAnswer is a working prototype that lets customers self-serve answers to two of Northstar Retail's most common support ticket categories: **order status** and **stock availability**. Customers select a category, enter an order ID or product name, and receive an instant, correctly formatted status response. When no match is found, the widget honestly informs the customer and directs them to a human agent rather than guessing. This was validated against [X] QA test cases covering both the happy path and fallback path (see QA Test Plan for full results).

## Known Limitations
- Runs against a small static sample dataset (15 orders, 15 products) — not connected to Northstar's real order or inventory systems
- Product name matching is simple partial-text matching, not true search — unusual phrasing or typos may not match
- No user authentication — anyone can look up any order ID if they know or guess it
- No persistent history across sessions
- Returns/refunds are not covered in this MVP

## Risks
- **Data accuracy risk:** connecting to real systems would require validated, live data feeds — untested in this prototype
- **Privacy risk:** exposing order status by ID alone (with no login) could allow lookups by anyone with an ID — a real deployment would need basic verification (e.g., email + order ID)
- **Scale risk:** static in-memory lookup does not reflect how a real system would perform under production traffic or a large product catalog

## What Northstar Needs to Provide (to move toward real deployment)
- Access to real, structured order and inventory data (API or export)
- A decision on what customer verification is acceptable (e.g., email match) before showing order details
- Confirmation of which support categories to prioritize next (e.g., returns/refunds)

## What Northstar Needs to Do to Take Over
- Replace static JSON files with a live data connection
- Add basic verification before displaying order details
- Decide on hosting/embedding location (storefront widget vs. standalone help page)
- Assign an internal owner to maintain and expand the tool's content/rules over time

## Recommended Next Steps
1. Pilot with a small, real (anonymized) dataset to validate matching accuracy
2. Add basic customer verification before showing order details
3. Expand to a third category (returns/refunds) once policy logic is defined
4. Measure actual ticket deflection rate over a real pilot period before making performance claims
