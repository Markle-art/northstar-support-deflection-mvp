class PrintWebhook:
    def __init__(self, attendees):
        self.attendees = attendees

    def receive_confirmation(self, confirmation):
        attendee_id = confirmation["attendee_id"]

        if attendee_id not in self.attendees:
            return "Attendee not found."

        if confirmation["status"] != "PRINTED":
            return "Print was not confirmed."

        self.attendees[attendee_id]["status"] = "CHECKED_IN"

        return (
            f"{self.attendees[attendee_id]['name']} "
            f"is now CHECKED_IN."
        )
