# Scope Delta Analysis — Meridian Pivot Sprint 2

## 1. Original Specification — Day 3

The original requirement was to:

- Poll the warehouse API every 5 minutes.
- Cache the latest stock information.
- Expose a query endpoint for support tools.
- Return accurate stock availability information.

### Original Architecture

Warehouse API
↓
5-minute polling
↓
Stock cache
↓
GET /stock/:product

---

## 2. Client Pivot — Day 4

The client announced that the polling method would be discontinued within 48 hours.

The team therefore had to replace polling with a webhook push model without extending the deadline or negotiating the requirement back to the original specification.

---

## 3. Scope Delta

### Dropped

- 5-minute warehouse polling.
- `setInterval()` polling mechanism.
- Local simulated warehouse polling process.
- Continuous polling dependency for stock updates.

### Modified

- Stock cache update mechanism.
- Server architecture.
- Inventory synchronization flow.
- Stock freshness mechanism.

### Added

- Webhook endpoint: `POST /webhook/stock`
- HMAC-SHA256 webhook signature verification.
- Webhook authentication using a shared secret.
- Invalid-signature rejection.
- Webhook-driven cache updates.
- Health-check endpoint showing the webhook-push model.

---

## 4. New Architecture

Warehouse
↓
Webhook POST
↓
HMAC-SHA256 verification
↓
Stock cache
↓
GET /stock/:product

The query endpoint remains available to downstream support tooling.

---

## 5. Regression Check

The original query capability was tested after the pivot.

### Valid webhook

A valid signed webhook updated the laptop stock quantity to 20.

Result:

- Webhook accepted.
- Cache updated.
- Product marked available.
- Query endpoint returned the updated quantity.

### Invalid webhook

An invalid webhook signature was submitted.

Result:

- Request rejected.
- Cache was not updated.

### Query endpoint

`GET /stock/laptop` successfully returned the updated stock information after the webhook update.

Therefore, the core stock-query functionality remained operational after the architectural change.

---

## 6. Trade-offs

### Benefits

- Removes dependence on continuous polling.
- Stock updates can arrive immediately when the warehouse changes inventory.
- Reduces unnecessary repeated requests to the warehouse service.
- Adds authentication to incoming stock updates.
- Maintains the existing stock query interface.

### Costs

- Introduced webhook verification logic.
- Added a shared-secret requirement.
- Added new failure modes around webhook delivery and authentication.
- Required refactoring the original polling architecture.
- Required additional testing for valid and invalid webhook requests.
- Required coordination between the warehouse system and the webhook receiver.

---

## 7. Reprioritized Backlog

### Completed

- Replace polling with webhook updates.
- Implement webhook signature verification.
- Update stock cache from webhook events.
- Preserve the stock query endpoint.
- Test valid webhook requests.
- Test invalid webhook requests.
- Remove obsolete polling code.

### Deferred / Future Work

- Persistent database-backed stock cache.
- Production webhook secret management.
- Webhook replay protection.
- Event delivery retry handling.
- Monitoring and alerting.
- Production warehouse API integration.
- Automated integration tests.

---

## 8. Architectural Integrity

The team did not run the old polling mechanism alongside the new webhook mechanism.

The obsolete polling code was removed after the pivot.

The existing stock query interface was preserved, reducing the impact on downstream support tooling.

The pivot therefore changed the synchronization mechanism while preserving the core inventory-query capability.

---

## 9. Pivot Cost

The pivot required:

- Refactoring the stock synchronization mechanism.
- Implementing HMAC-SHA256 verification.
- Adding and testing a webhook endpoint.
- Re-testing the stock query endpoint.
- Removing the obsolete polling implementation.
- Updating documentation and testing evidence.

The main architectural cost was replacing a scheduled pull model with an authenticated event-driven push model while keeping the same stock-query capability.