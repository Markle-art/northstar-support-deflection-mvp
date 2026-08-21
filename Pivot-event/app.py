from queue import PrintQueue
from printer import BadgePrinter
from webhook import PrintWebhook


attendees = {
    "A001": {"name": "Alice", "status": "NOT_CHECKED_IN"},
    "A002": {"name": "Brian", "status": "NOT_CHECKED_IN"},
    "A003": {"name": "Carol", "status": "NOT_CHECKED_IN"},
}


print_queue = PrintQueue()
printer = BadgePrinter()
webhook = PrintWebhook(attendees)


def check_in(attendee_id):
    attendee = attendees.get(attendee_id)

    if attendee is None:
        return "Attendee not found."

    if attendee["status"] in ["PENDING", "CHECKED_IN"]:
        return (
            f"{attendee['name']} is already being processed "
            "or checked in. No duplicate badge."
        )

    attendee["status"] = "PENDING"

    print_request = {
        "print_request_id": f"PR-{attendee_id}",
        "attendee_id": attendee_id,
    }

    print_queue.publish(print_request)

    return f"{attendee['name']} is PENDING."


def process_print_requests():
    while True:
        request = print_queue.consume()

        if request is None:
            break

        confirmation = printer.print_badge(request)

        print(webhook.receive_confirmation(confirmation))


# Test three attendees
print(check_in("A001"))
print(check_in("A002"))
print(check_in("A003"))

# Process the print queue
process_print_requests()

# Test duplicate scan
print(check_in("A001"))

print("\nFinal attendee statuses:")
for attendee_id, attendee in attendees.items():
    print(attendee_id, attendee)
