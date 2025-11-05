// examples/js/ci-run.js
// CI harness: uses nock to stub /resources then runs index.js logic
const nock = require('nock');
const path = require('path');

// ensure BASE_URL matches examples
const BASE = (process.env.BASE_URL || 'https://api.example.com/v1').replace(/\/$/, '');
const baseOrigin = BASE.replace(/\/v1$/, '') || 'https://api.example.com';

// stub endpoints
nock(baseOrigin)
  .get('/v1/resources')
  .reply(200, [{ id: 'r1', name: 'example-list' }])
  .post('/v1/resources', body => !!body && body.name)
  .reply(201, (uri, requestBody) => ({ id: 'r2', name: requestBody.name || 'example-created' }));

// require node-fetch polyfill if needed (node-fetch v3 is ESM-only; examples use global fetch in Node 18+)
if (typeof fetch === 'undefined') {
  // use node-fetch for older runtimes; CI installs node-fetch@3 which exposes global fetch when imported like below
  try {
    require('node-fetch'); // ensures fetch is available in environments where examples expect it
  } catch (e) {
    // ignore
  }
}

// Run the example file. Adjust relative path if your index.js exports functions instead.
const examplePath = path.join(__dirname, 'index.js');
require(examplePath);
