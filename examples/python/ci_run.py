# examples/python/ci_run.py
# CI harness: uses requests-mock to stub /resources then runs example.py logic
import os
import runpy
import requests_mock

BASE_URL = os.environ.get('BASE_URL', 'https://api.example.com/v1').rstrip('/')
with requests_mock.Mocker() as m:
    m.get(f"{BASE_URL}/resources", json=[{"id": "r1", "name": "example-list"}], status_code=200)
    m.post(f"{BASE_URL}/resources", json={"id": "r2", "name": "example-created"}, status_code=201)
    # run the example module (it will read AUTH_TOKEN and BASE_URL from env)
    runpy.run_path(os.path.join(os.path.dirname(__file__), "example.py"), run_name="__main__")
