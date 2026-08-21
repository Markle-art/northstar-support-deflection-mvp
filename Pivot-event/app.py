attendees = {
    "A001": {"name": "Alice", "status": "NOT_CHECKED_IN"},
    "A002": {"name": "Brian", "status": "NOT_CHECKED_IN"},
    "A003": {"name": "Carol", "status": "NOT_CHECKED_IN"},
}


def check_in(attendee_id):
    attendee = attendees.get(attendee_id)

    if attendee is None:
        return "Attendee not found."

    if attendee["status"] in ["PENDING", "CHECKED_IN"]:
        return f"{attendee['name']} is already being processed or checked in. No duplicate badge."

    attendee["status"] = "PENDING"

    return f"{attendee['name']} is pending. Print request created."


print(check_in("A001"))
print(check_in("A002"))
print(check_in("A003"))

# Duplicate scan test
print(check_in("A001"))
