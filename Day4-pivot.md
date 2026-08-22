# Day 4 — Meridian Pivot

## Client Change

Northstar Retail Co. announced that the warehouse polling method would be discontinued within 48 hours.

The deadline could not be extended, so the team had to replace the polling architecture with a webhook push model.

## Original Architecture

Warehouse API → Poll every 5 minutes → Stock Cache → Query

## New Architecture

Warehouse → Webhook Push → Stock Cache → Query

## Changes Made

- Replaced scheduled polling with webhook-based updates.
- Added a webhook receiver for warehouse stock updates.
- Kept the stock cache so support queries remain fast.
- Kept the stock query functionality.
- Added validation for incoming webhook data.

## Why This Is a Real Pivot

The synchronization mechanism changed from the system repeatedly requesting stock information to the warehouse actively pushing stock updates to the system.

The change affects the architecture rather than only changing the user interface.

## Day 4 Status

The webhook prototype is implemented and provides the foundation for the Day 5 refactor.

The original polling code remains temporarily available so the team can verify the regression before it is removed or deprecated during Day 5.
