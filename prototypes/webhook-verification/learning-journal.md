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

- Planned start time: 3:00 AM
- Planned duration: Not strictly time-boxed
- Actual duration: Approximately 4 hours

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

### Attempts

- Attempt 1: Ran the webhook verification prototype to generate an HMAC-SHA256 signature.
- Result: The first run produced an `IndentationError: unexpected indent`. After correcting the indentation in the Python file, I reran the prototype successfully and generated the expected HMAC-SHA256 signature.
- Attempt 2: Extended the prototype to verify a received webhook signature using HMAC-SHA256 and `hmac.compare_digest()`.
- Result: The verification test succeeded. The output showed `Webhook signature valid: True`, and the expected and received signatures matched.
  
### Blockers

- Problem: An `IndentationError: unexpected indent` occurred when first running the webhook verification prototype.
- What I tried: I inspected the `webhook_verification.py` file and identified an indentation problem.
- Result: I corrected the indentation and reran the script successfully.
- Evidence: The script generated the expected HMAC-SHA256 signature after the correction.
- What I learned: Python indentation is syntactically significant, so an incorrect indentation can prevent the program from running even when the underlying verification logic is correct.
- Next step: Continue testing webhook verification and document the results.

### Current Understanding

- I understand that webhook verification uses a shared secret and HMAC-SHA256 to create and verify a signature. I successfully ran the verification prototype after fixing an indentation error and generated the expected signature. I now understand that both the verification logic and correct Python syntax are necessary for the prototype to run successfully.

### Day 1 Reflection

<<<<<<< HEAD
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
- What I understand now: I understand how webhook verification can use a shared secret and HMAC-SHA256 to generate a signature and how `hmac.compare_digest()` can compare the expected signature with the received signature. I also learned how to troubleshoot a Python indentation error and verify the corrected prototype through a successful terminal test.

- What I still need to learn: I still need to understand how webhook verification works with an actual HTTP webhook request, including receiving the payload and signature from another system.

- Next step: Continue from the working HMAC verification prototype toward understanding how the verification logic would be used in a real webhook request.
(Complete webhook verification prototype and journal)
