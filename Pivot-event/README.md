# Meridian Pivot Simulation

## Solstice Events Co. — Asynchronous Event Check-In System

### Overview

Solstice Events Co. is running a multi-day technology conference where staff use a kiosk to scan attendee QR codes and print conference badges.

The original system depended on a synchronous REST API provided by the badge-printer vendor. After scanning an attendee's QR code, the kiosk had to wait for the printer to return a successful response before displaying **"Checked In."**

The printer vendor is now deprecating that synchronous API. This prototype demonstrates the required **asynchronous architecture** for the new system.

---

## The Pivot

Instead of waiting for the badge printer to respond directly, the kiosk now:

1. Receives an attendee QR-code scan.
2. Checks whether the attendee has already been checked in or has a pending print request.
3. Creates a unique print request.
4. Publishes the request to a message queue.
5. Shows the attendee as **Pending** while the badge is being printed.
6. Receives a webhook when the printer confirms that the badge has been successfully printed.
7. Updates the attendee's status to **Checked In**.

### New flow

```text
QR Scan
   ↓
Duplicate Check
   ↓
Create Print Request
   ↓
Message Queue
   ↓
Badge Printer
   ↓
Print Completed
   ↓
Webhook
   ↓
Update Check-In Status
   ↓
"Checked In"
```

---

## Why Asynchronous Processing?

The new design removes the kiosk's dependency on an immediate response from the printer.

The kiosk does not need to remain blocked while the printer processes the badge. Instead, the print request is placed on a queue and processed asynchronously.

This makes the system better suited to:

* Delayed printer responses
* Temporary service interruptions
* Multiple simultaneous check-ins
* Out-of-order webhook confirmations
* Reliable event processing

---

## Duplicate-Scan Protection

Duplicate scans are a critical requirement.

An attendee who has already been checked in must **not receive a second badge**.

The system therefore checks the attendee's current state before creating a print request.

Possible states include:

```text
PENDING
PRINTED
```

If an attendee is already `PENDING` or `PRINTED`, another scan will not create a new print request.

This prevents duplicate badge printing even when a second scan occurs before the first print request has completed.

---

## Handling Out-of-Order Confirmations

Asynchronous systems do not guarantee that webhook confirmations will arrive in the same order as QR scans.

For example:

```text
Print Request 001 → Alice
Print Request 002 → Brian
Print Request 003 → Carol
```

The printer could send confirmations in this order:

```text
003 → Carol
001 → Alice
002 → Brian
```

The system uses a unique print request ID and attendee ID to associate each webhook with the correct attendee.

Therefore, confirmations can safely arrive out of order without causing incorrect check-in statuses.

---

## UI States

The kiosk should not immediately display **"Checked In"** after a QR scan.

Instead:

### Before printing

```text
Attendee: Alice
Status: Pending — Printing badge...
```

### After successful webhook confirmation

```text
Attendee: Alice
Status: ✓ Checked In
```

The check-in is only considered successful after the webhook confirms that printing has completed.

---

## Core Components

### 1. Kiosk

Receives attendee QR-code scans and displays the current check-in status.

### 2. Backend

Handles attendee validation, duplicate protection, print-request creation, and status updates.

### 3. Message Queue

Stores print requests until they can be processed by the badge printer.

### 4. Badge Printer

Consumes print requests and processes badge printing asynchronously.

### 5. Webhook

Receives confirmation from the printer when a badge has successfully been printed.

### 6. State Store

Keeps track of each attendee's current check-in and printing status.

---

## Example Data

A print request can contain:

```json
{
  "print_request_id": "PR-001",
  "attendee_id": "A001"
}
```

The system can track the attendee as:

```text
A001 → PENDING → PRINTED
```

The `print_request_id` ensures that the webhook can be matched to the correct print operation.

---

## Test Scenarios

The prototype must successfully demonstrate at least three attendees.

### Test 1 — Successful check-in

```text
Alice scans QR code
→ Print request created
→ Status becomes PENDING
→ Printer processes request
→ Webhook received
→ Status becomes PRINTED
→ UI shows "Checked In"
```

### Test 2 — Multiple attendees

```text
Alice → PR-001
Brian → PR-002
Carol → PR-003
```

All three attendees should eventually become checked in.

### Test 3 — Duplicate scan

```text
Alice scans
→ PR-001 created
→ Alice becomes PENDING

Alice scans again
→ Existing pending request detected
→ No second print request created
```

### Test 4 — Out-of-order webhooks

```text
PR-003 confirmation
PR-001 confirmation
PR-002 confirmation
```

Each attendee must still receive the correct final status.

---

## Expected Results

The prototype is successful when:

* At least three attendees can be processed.
* Print requests are handled asynchronously.
* The UI shows a pending state while printing is incomplete.
* **"Checked In"** is only shown after successful webhook confirmation.
* Duplicate scans do not create duplicate badge-print requests.
* Webhook confirmations can arrive out of order.
* Each confirmation updates the correct attendee.

---

## Project Goal

The goal of this prototype is to demonstrate how Solstice Events Co. can move from a synchronous badge-printing workflow to a reliable asynchronous architecture using **message queues and webhooks**, while maintaining correct check-in and duplicate-scan behaviour.

---

## Status

**Sprint 2 — Meridian Pivot Simulation**

Prototype implementation in progress.
