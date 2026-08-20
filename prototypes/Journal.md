Retry/Backoff Learning Journal

1. Start

I was assigned Retry/Backoff as an unfamiliar tool. My goal was to understand how retrying works when an operation fails and how backoff can prevent repeated requests from happening too quickly.

2. Attempt

I created a small Python prototype that simulates a request failing twice and succeeding on the third attempt.

The prototype allows a maximum of three attempts and waits between failed attempts before trying again.

3. Error / Problem

At first, I needed to understand how to make the program wait between retry attempts and how to increase the waiting time after each failure.

4. Research

I researched retry mechanisms, delays, and exponential backoff. I learned that retry means attempting an operation again after a failure, while backoff means waiting for a period of time before making another attempt.

I also learned about exponential backoff, where the waiting time increases after each failed attempt.

5. Solution

I used Python's "time.sleep()" to create the delay between attempts.

I used the following calculation for the waiting time:

"2 ** (attempt - 1)"

This produces increasing delays:

- Attempt 1 → wait 1 second
- Attempt 2 → wait 2 seconds
- Attempt 3 → successful request

6. What I Learned

I learned that retry and backoff can work together to make repeated attempts more controlled. Instead of immediately sending another request after a failure, the program waits before trying again.

I also learned how exponential backoff increases the delay between retries.

7. Result

I successfully created a small working Retry/Backoff prototype on the "sprint-2" branch. The prototype demonstrates failed attempts, increasing delays, and a successful retry.

8. Next Step

I will test the prototype and record the result as evidence for the Sprint 2 assignment.
