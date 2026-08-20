import hmac
import hashlib
secret = b"It's a Secret to Everybody"
payload = b"Hello, World!"
signature = hmac.new(
    secret,
    payload,
    hashlib.sha256
).hexdigest()

print(signature)
