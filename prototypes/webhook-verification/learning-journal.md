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

  ## Experiment 1 — HMAC-SHA256 Signature Generation

**Tool:** Python `hmac` and `hashlib`

**Objective:**  
Understand how webhook signatures are generated and verify that I can reproduce an HMAC-SHA256 signature from a secret and payload.

**What I learned:**  
A webhook can use a shared secret to generate a cryptographic signature for its payload. HMAC-SHA256 combines the secret and the payload to produce a signature that can later be used to verify that the request came from a trusted source and has not been modified.

**What I did:**  
I created a Python mini-prototype using the `hmac` and `hashlib` libraries. I used the GitHub documentation's test secret and the payload `Hello, World!` and generated an HMAC-SHA256 digest.

**Result:**  
The prototype ran successfully and produced the expected HMAC-SHA256 digest:

`757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17`

**Blocker:**  
Initially, I had difficulty running the prototype because I was working from the wrong workspace/path. After locating the actual Sprint 2 repository and the correct file path, the prototype ran successfully.

**How I resolved it:**  
I located the correct repository and used the exact path:

`./prototypes/webhook-verification/webhook_verification.py`

I then executed the prototype successfully with Python.

**Outcome:**  
Successful. I can now generate an HMAC-SHA256 signature from a secret and payload.

**Time spent:**  
[1 hour]

**Next learning goal:**  
Use the generated signature to determine whether a webhook request is authentic, including testing both valid and invalid signatures.
