# SDK Examples (minimal)

## Quickstart
1. Set env vars:
   - export AUTH_TOKEN=sk_test_xxx
   - export BASE_URL=https://api.example.com/v1
2. Run Node example:
   - (Node 18+) cd examples/js && node index.js
3. Run Python example:
   - (Python 3.10+) cd examples/python && python example.py
4. Run sanitized demo (safe for recording):
   - ./demo.sh

Expected: JSON-like responses for list/create API calls. Replace BASE_URL with a real sandbox URL to call a live test API.

## Stubbing (recommended for public repos / CI)
- Node: use `nock` to intercept HTTP calls. Example:
```js
const nock = require("nock");
nock(process.env.BASE_URL || "https://api.example.com")
  .get("/v1/resources").reply(200, [{ id: "r1", name: "example" }])
  .post("/v1/resources").reply(201, { id: "r2", name: "example" });
```

- Python: use `requests-mock` or `VCRpy`. Example with `requests-mock`:
```py
import requests_mock
with requests_mock.Mocker() as m:
    m.get(f"{BASE_URL}/resources", json=[{"id":"r1","name":"example"}])
    m.post(f"{BASE_URL}/resources", json={"id":"r2","name":"example"})
    # run example script logic here
```

## CI & secrets
- Add TEST_TOKEN in repository Settings → Secrets.
- In CI, either point BASE_URL to a sandbox endpoint or enable stubbing so tests run without network calls.
- Never commit real tokens.

## Notes
- BASE_URL is a placeholder. Replace it with a provider sandbox or keep stubbing.
