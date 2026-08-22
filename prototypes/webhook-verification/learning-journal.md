# Learning & Blocker Journal

## The Meridian Pivot — Sprint 2

**Learner:** Technical Lead MARK KAMAMIA

**Unfamiliar Tool:** Webhook Verification  
**Client:** Northstar Retail Co.  
**Assignment:** Assignment 1 — Solo Recon

---

# Day 1 — Solo Recon

## Starting Point

### What I already know:
I had a basic understanding of what webhooks are: a way for one system to send information to another system when an event occurs. However, I had not previously implemented webhook verification.

### What I don't know:
I did not know how HMAC-SHA256 signatures were generated, how a received webhook signature could be compared with an expected signature, or how webhook requests could be authenticated.

### Why webhook verification is unfamiliar to me:
Webhook verification was genuinely unfamiliar to me. I had not previously built a webhook verification prototype or worked directly with HMAC-based signature verification.

## Learning Goals

- Understand what webhook verification is.
- Understand why webhook verification is necessary.
- Understand how webhook signatures work.
- Build a small working verification prototype.

## Time Box

- Planned start time: 3:00 AM
- Planned duration: Hard time-boxed learning session
- Actual duration: Approximately 4 hours

## Research Log

### Research Session 1

- Topic: Webhook verification
- What I learned: A webhook allows one system to send information to another system when an event happens. The receiving server should not automatically trust every incoming webhook. A secret can be used by the sender to create a signature for the webhook request. The receiving server can use the same secret to calculate an expected signature and compare it with the received signature. If they match, the request can be considered authentic and processed.
- Source/resource: GitHub Documentation — Validating webhook deliveries
- Questions that remained:
  - How exactly does HMAC-SHA256 generate the signature?
    - How is signature verification implemented in code?
      - How can valid and invalid webhook signatures be tested?

      ## Attempts

      ### Attempt 1

      I created and ran a Python prototype using the `hmac` and `hashlib` libraries.

      The prototype used:

      - A shared secret.
      - A sample payload.
      - HMAC-SHA256.
      - A generated hexadecimal signature.

      ### Result

      The prototype successfully generated an HMAC-SHA256 signature.

      The generated signature was:

      `757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17`

      ### Attempt 2 — Verification

      I extended the prototype to simulate a signature received with a webhook.

      The expected signature was compared with the received signature using:

      `hmac.compare_digest()`

      ### Result

      The terminal returned:

      `Webhook signature valid: True`

      The expected and received signatures matched.

      ## Blockers

      ### Problem

      An `IndentationError: unexpected indent` occurred while running the Python prototype.

      ### What I tried

      I inspected the `webhook_verification.py` file and identified incorrect indentation in the verification code.

      ### Result

      I corrected the indentation and reran the program successfully.

      The prototype then generated the expected HMAC-SHA256 signature and completed the verification successfully.

      ### What I learned from the blocker

      Python indentation is syntactically significant. An indentation error can prevent the program from running even when the underlying logic is correct.

      The experience also reinforced the importance of reading the actual error message, locating the affected line, correcting the code, and rerunning the test.

      ## Current Understanding

      I understand that webhook verification can use a shared secret and HMAC-SHA256 to generate a signature from a payload.

      The receiving system can independently generate the expected signature and compare it with the signature received with the webhook.

      I also learned how `hmac.compare_digest()` can be used to compare the signatures.

      ## Day 1 Reflection

      ### What I understand now:

      I understand the basic flow of webhook signature verification and successfully implemented a working Python prototype.

      ### What I still need to learn:

      I still need to understand how the same verification logic would work with a real HTTP webhook request, including receiving the request payload and signature from an external system.

      ### Next step:

      Continue developing my understanding of how webhook verification fits into the team's inventory-sync architecture.

      ---

      # Day 2 — Solo Recon / Prototype Completion

      ## Learning Progress

      I continued working independently on webhook verification and focused on turning the basic HMAC-SHA256 signature generation into an actual verification test.

      The prototype was updated so that it:

      1. Creates an expected HMAC-SHA256 signature.
      2. Simulates a signature received from a webhook.
      3. Compares the two signatures.
      4. Reports whether the webhook signature is valid.

      ## Prototype Test

      The successful terminal output was:

      ```text
      Webhook signature valid: True
      Expected signature: 757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17
      Received signature: 757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17
