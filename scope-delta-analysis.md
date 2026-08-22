# Scope Delta Analysis — Northstar Retail Co.

## Original Requirement — Day 3

The original specification required the inventory service to:

- Poll the warehouse API every 5 minutes.
- Cache current inventory data.
- Provide a query endpoint for checking product stock.
- Return accurate stock availability to the support tool.

## Pivot — Day 4

Northstar Retail Co. announced that the warehouse polling method would be discontinued within 48 hours.

The team therefore replaced the polling architecture with a webhook push model without extending the deadline.

## Scope Changes

### Dropped

- Five-minute warehouse polling.
- Scheduled polling using `setInterval`.
- Repeated requests to the warehouse API.

### Modified

- Stock synchronization changed from polling to webhook delivery.
- The inventory cache was retained.
- The stock query functionality was retained.

### Added

- Webhook-based stock update receiver.
- Message-queue simulation for stock updates.
- Validation of incoming webhook data.
- Cache updates when warehouse information is received.

## Architecture Change

### Before

Warehouse API → Poll every 5 minutes → Stock Cache → Query

### After

Warehouse → Message Queue → Webhook → Stock Cache → Query

## Regression Check

The stock-query functionality remains available after the pivot. Products can still be checked for availability and quantity after inventory updates.

## Trade-offs

### Benefits

- Faster inventory updates.
- No unnecessary repeated polling requests.
- Reduced dependence on scheduled jobs.

### Costs

- The warehouse must support webhook delivery.
- Incoming webhook payloads must be validated.
- A production implementation would require retry and monitoring mechanisms.

## Reprioritized Backlog

### Completed

- Inventory cache.
- Stock query functionality.
- Day 3 polling prototype.
- Day 4 webhook prototype.
- Message-queue simulation.
- Removal of polling from the final implementation.

### Deferred

- Production webhook authentication.
- Persistent database storage.
- Advanced retry and monitoring infrastructure.

## Final Outcome

The inventory synchronization service was adapted from polling to a webhook push model within the unchanged deadline while preserving the core stock-query requirement.
