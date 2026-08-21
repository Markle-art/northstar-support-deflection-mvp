# Retry with Exponential Backoff

## Overview

This project demonstrates the use of **retry logic with exponential backoff** to make applications more reliable when requests fail temporarily.

Instead of repeatedly sending requests immediately after a failure, the application waits for an increasing amount of time before trying again.

## Problem

Network requests and external services can sometimes fail because of temporary issues such as:

* Network interruptions
* Temporary service unavailability
* Server overload
* Connection timeouts

If an application immediately retries a failed request repeatedly, it can place unnecessary pressure on the service.

## Solution

This project uses a retry mechanism with **exponential backoff**.

When a request fails:

1. The application detects the failure.
2. It waits before trying again.
3. The waiting period increases after each failed attempt.
4. The application stops when the request succeeds or the maximum number of retries is reached.

### Example

```text
Attempt 1 → Request failed
             ↓
          Wait 1 second
             ↓
Attempt 2 → Request failed
             ↓
          Wait 2 seconds
             ↓
Attempt 3 → Request successful
```

## Implementation

The main implementation is contained in:

* `retry_demo.py` — contains the retry and exponential backoff logic.
* `journal.md` — contains development notes and observations.
* `README.md` — provides documentation for the project.

## Testing

The retry mechanism was tested by simulating failed requests followed by a successful request.

### Test Result

```text
Attempt 1
Request failed
Waiting 1 seconds before retrying...

Attempt 2
Request failed
Waiting 2 seconds before retrying...

Attempt 3
Data request successful
```

The test confirms that the application correctly:

* Detects failed requests.
* Retries the request.
* Waits between attempts.
* Increases the waiting period.
* Successfully completes the request when it becomes available.

## Benefits

Using retry with exponential backoff can help applications:

* Handle temporary failures more gracefully.
* Improve reliability.
* Reduce unnecessary repeated requests.
* Avoid overwhelming external services.
* Recover automatically from temporary problems.

## Conclusion

The retry and exponential backoff mechanism was successfully implemented and tested. The application recovered from two failed attempts and successfully completed the request on the third attempt.

This demonstrates how retry strategies can improve the reliability and resilience of applications that depend on external services.

## Project Structure

```text
retry-backoff/
├── retry_demo.py
├── journal.md
└── README.md
```

## Status

**Completed and tested successfully.** ✅
