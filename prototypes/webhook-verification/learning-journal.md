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

## Research Log

#### Research Session 1

- Topic: Webhook verification and validating webhook deliveries

- What I learned: A webhook allows one system to send information to another system when an event happens because webhook endpoints can receive requests from the internet, the receiver system needs a way to determine whether a request is genuine. A secret can be used to generate a signature, which the receiving system can independently verify.

- Source/resource: GitHub Documentation — Validating webhook deliveries

- Questions that remain:
  - How exactly is the HMAC-SHA256 signature generated?
  - How does the receiving server compare the signature securely?
  - How do I implement this in my chosen programming language?
    
### Attempts

- Attempt 1:
- Result:

### Blockers

- Problem: No technical blocker yet, still in the research stage.
- What I tried: Read the GitHub documentation on validating webhook deliveries.
- Result: I now understand the basic purpose of webhook verification, but I still need to understand the implementation details.
- What I tried next: Continue researching HMAC-SHA256 and signature verification.
  
### Current Understanding

- 

### Day 1 Reflection

- What I understand now:
- What I still need to learn:
- Next step:
