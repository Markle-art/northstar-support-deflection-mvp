class BadgePrinter:
    def print_badge(self, print_request):
        print(
            f"Badge printing completed for "
            f"attendee {print_request['attendee_id']}"
        )

        return {
            "print_request_id": print_request["print_request_id"],
            "attendee_id": print_request["attendee_id"],
            "status": "PRINTED"
        }
