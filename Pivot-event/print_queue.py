from collections import deque


class PrintQueue:
    def __init__(self):
        self.messages = deque()

    def publish(self, message):
        self.messages.append(message)
        print(f"Print request queued: {message}")

    def consume(self):
        if not self.messages:
            return None

        return self.messages.popleft()
