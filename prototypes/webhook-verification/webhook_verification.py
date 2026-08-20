import hmac
import hashlib

secret = b"It's a Secret to Everybody"
payload = b"Hello, World!"

expected_signature = hmac.new(secret, payload, hashlib.sha256).hexdigest()
received_signature = expected_signature

is_valid = hmac.compare_digest(expected_signature, received_signature)

print("Webhook signature valid:", is_valid)
print("Expected signature:", expected_signature)
print("Received signature:", received_signature)