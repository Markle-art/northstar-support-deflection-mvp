# Task Board — The Northstar Sprint

Status column values to use on your actual board tool: `Not Started / In Progress / Blocked / Done`
Update status the same day work happens.

---

**T1 — Solo Baseline Diagnostic (Day 1)**
- Description: Each member completes the assigned 30-minute solo baseline diagnostic individually.
- Owner: All 5 - Mark Kamaamia, Mark Ochieng, Grace Murigi, Loureen Shillah, Maureen Naranoi (separately)
- Priority: High
- Est. time: 0.5h each
- Definition of Done: Each member has submitted their completed diagnostic responses
- Evidence: 5 individual diagnostic documents/screenshots
- Dependency: None
- Note: **PENDING FROM ASSESSOR** — exact diagnostic questions not yet provided

**T2 — Team Charter**
- Description: Draft and finalize the Team Charter (roles, norms, communication plan)
- Owner: Maureen Naranoi (Project & Delivery Lead)
- Priority: High
- Est. time: 2h
- Definition of Done: Charter shared in team workspace, all 5 members sign off
- Evidence: Signed-off Charter doc (link)
- Dependency: None

**T3 — Problem Statement & User Stories**
- Description: Write the problem statement and 3–5 user stories covering order status and stock availability
- Owner: Mark Ochieng (Product Lead)
- Priority: High
- Est. time: 3h
- Definition of Done: Stories reviewed and approved by Technical Lead as buildable
- Evidence: User stories doc
- Dependency: None

**T4 — MVP Scope Definition**
- Description: Define what's in and out of scope for the MVP based on the user stories
- Owner: Mark Ochieng (Product Lead)
- Priority: High
- Est. time: 2h
- Definition of Done: Scope doc lists explicit in-scope/out-of-scope items, confirmed feasible by Technical Lead
- Evidence: Scope doc
- Dependency: T3

**T5 — Customer Journey Map**
- Description: Map the full customer journey for both flows (order status, stock check), including the fallback path
- Owner: Grace Murigi (CX Lead)
- Priority: High
- Est. time: 3h
- Definition of Done: Journey diagram covers happy path + not-found/fallback path for both categories
- Evidence: Journey map (diagram or flowchart)
- Dependency: T4

**T6 — Widget Copy & Conversation Script**
- Description: Write all customer-facing text — greetings, prompts, responses, error/escalation messages
- Owner: Grace Murigi (CX Lead)
- Priority: High
- Est. time: 3h
- Definition of Done: Copy doc covers every conversation state in the journey map
- Evidence: Copy/script doc
- Dependency: T5

**T7 — Build Sample Dataset**
- Description: Create the static sample data (orders + stock) the prototype will query against
- Owner: Mark Kamaamia (Technical Lead)
- Priority: High
- Est. time: 2h
- Definition of Done: `orders.json` (12–15 records) and `stock.json` (12–15 records) complete and realistic
- Evidence: Data files
- Dependency: T4

**T8 — Build Order-Status Lookup Feature**
- Description: Implement the lookup logic and UI flow for order status
- Owner: Mark Kamaamia (Technical Lead)
- Priority: High
- Est. time: 4h
- Definition of Done: Valid order ID returns correct status; invalid ID triggers fallback message
- Evidence: Working feature + short screen recording
- Dependency: T6, T7

**T9 — Build Stock-Availability Lookup Feature**
- Description: Implement the lookup logic and UI flow for stock availability
- Owner: Mark Kamaamia (Technical Lead)
- Priority: High
- Est. time: 4h
- Definition of Done: Valid product name returns correct stock status; invalid input triggers fallback
- Evidence: Working feature + short screen recording
- Dependency: T6, T7

**T10 — Integrate CX Copy into Widget UI**
- Description: Wire the approved copy (T6) into both features so all messages match the script
- Owner: Mark Kamaamia (Technical Lead)
- Priority: Medium
- Est. time: 2h
- Definition of Done: Every message shown in-app matches the approved copy doc
- Evidence: Working demo build
- Dependency: T6, T8, T9

**T11 — Write QA Test Scenarios**
- Description: Write at least 8 test cases covering both categories (happy path, not-found, edge cases)
- Owner: Loureen Shillah (QA & Testing Lead)
- Priority: High
- Est. time: 3h
- Definition of Done: Test case doc with Test ID, input, expected result columns filled for 8+ cases
- Evidence: Test case doc
- Dependency: T4

**T12 — Execute Tests & Log Results**
- Description: Run all test cases against the built prototype, record actual results and pass/fail
- Owner: Loureen Shillah (QA & Testing Lead)
- Priority: High
- Est. time: 3h
- Definition of Done: All test cases executed, results logged with screenshots, bugs reported to Technical Lead
- Evidence: Completed test results doc + screenshots
- Dependency: T10, T11

**T13 — Go-Live Readiness Note**
- Description: Write the 1-page go-live readiness note
- Owner: Maureen Naranoi (Project & Delivery Lead)
- Priority: Medium
- Est. time: 2h
- Definition of Done: Note covers what works, limitations, risks, and next steps; reviewed by Technical Lead
- Evidence: Final 1-page note
- Dependency: T12

**T14 — Compile Audit Trail**
- Description: Collect every task's commit/edit evidence into a single audit trail log
- Owner: Maureen Naranoi (Project & Delivery Lead)
- Priority: Medium
- Est. time: 2h
- Definition of Done: Every task T1–T13 has a mapped commit/edit entry with timestamp
- Evidence: Audit trail doc
- Dependency: T1–T13 (ongoing, compiled at end)

**T15 — Build Pitch Deck & Assign Roles**
- Description: Build the pitch deck using material from all previous tasks; assign each of the 5 members a speaking section
- Owner: Maureen Naranoi (Project & Delivery Lead) (compiles), all 5 (contribute content + rehearse)
- Priority: High
- Est. time: 3h
- Definition of Done: Deck covers all 6 pitch sections, each member has confirmed their part and rehearsed once
- Evidence: Final pitch deck + rehearsal note
- Dependency: T3, T5, T10, T12, T13

---

### Distribution check
- Mark Kamaamia (Technical Lead): T7, T8, T9, T10 (+ contributes to T15)
- Mark Ochieng (Product Lead): T3, T4 (+ contributes to T15)
- Grace Murigi (CX Lead): T5, T6 (+ contributes to T15)
- Loureen Shillah (QA Lead): T11, T12 (+ contributes to T15)
- Maureen Naranoi (Project & Delivery Lead): T2, T13, T14, T15 (compile)
- All 5: T1 (individually)
