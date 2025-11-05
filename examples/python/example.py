# Minimal Python example (20–30 lines)
# Usage: AUTH_TOKEN=sk_test_xxx BASE_URL=https://api.example.com/v1 python example.py
import os, sys, requests

BASE_URL = os.environ.get("BASE_URL", "https://api.example.com/v1")
AUTH = os.environ.get("AUTH_TOKEN")
if not AUTH:
    print("Missing AUTH_TOKEN", file=sys.stderr); sys.exit(1)

headers = {"Authorization": f"Bearer {AUTH}", "Content-Type": "application/json"}

def fetch(path, method="GET", json=None):
    r = requests.request(method, f"{BASE_URL}{path}", headers=headers, json=json)
    try:
        body = r.json()
    except ValueError:
        body = r.text
    return r.status_code, body

if __name__ == "__main__":
    print("Listing resources...", fetch("/resources"))
    print("Creating resource...", fetch("/resources", method="POST", json={"name":"example"}))
