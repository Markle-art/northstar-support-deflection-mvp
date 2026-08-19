import time

max_retries = 3

for attempt in range(1, max_retries + 1):
    print(f"Attempt {attempt}")

    # Simulate a request
    if attempt < 3:
        print("Request failed")

        wait_time = 2 ** (attempt - 1)
        print(f"Waiting {wait_time} seconds before retrying...")

        time.sleep(wait_time)

    else:
        print("Request successful!")
