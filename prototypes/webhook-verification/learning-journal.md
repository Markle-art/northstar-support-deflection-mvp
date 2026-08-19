# Learning & Blocker Journal

## Day 1 — Solo Recon

### Starting Point

- What I already know:
- What I don't know:
- Why webhook verification is unfamiliar to me:

### Learning Goals

- Understand what webhook verification is.
- Understand why webhook verification is necessary.
- Understand how webhook signatures work.
- Build a small working verification prototype.

### Time Box

- Planned start time:
- Planned duration:
- Actual duration:

### Research Log

#### Research Session 1

- Topic: Webhook verification
- What I learned: A webhook allows one system to send information to another system when an event happens. The receiving server should not automatically trust every incoming webhook. A secret can be used by the sender to create a signature for the webhook request. The receiving server can use the same secret to calculate an expected signature and compare it with the received signature. If they match, the request can be considered authentic and processed.
- Source/resource: GitHub Documentation — Validating webhook deliveries
- Questions that remain:
  - How exactly does HMAC-SHA256 generate the signature?
  - How do I implement the verification in JavaScript?
  - How can I test both valid and invalid webhook requests?
    
### Attempts

- Attempt 1:
- Result:
  
### Blockers

- Problem: No technical blocker yet, still in the research stage.
- What I tried: Read documentation about webhook verification and signatures.
- Result: I understand the basic verification flow but still need to understand the implementation.
- What I tried next: Research how HMAC-SHA256 verification works in JavaScript.

### Current Understanding

- 

### Day 1 Reflection

- What I understand now:
- What I still need to learn:
- Next step:
