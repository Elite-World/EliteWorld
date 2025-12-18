const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: 'secret_test',
});

console.log('notion.databases:', notion.databases);
console.log('notion.databases.query:', notion.databases ? notion.databases.query : 'undefined');

if (typeof notion.databases.query === 'function') {
  console.log('SUCCESS: query is a function');
} else {
  console.log('FAILURE: query is missing');
  console.log('Available keys:', Object.keys(notion.databases));
  // Inspect prototype
  console.log('Prototype keys:', Object.getOwnPropertyNames(Object.getPrototypeOf(notion.databases)));
}

try {
  const pkgPath = require.resolve('@notionhq/client/package.json');
  console.log('Package Path:', pkgPath);
  const pkg = require(pkgPath);
  console.log('Package Version:', pkg.version);

  // Test notion.request
  if (typeof notion.request === 'function') {
      console.log('SUCCESS: notion.request is a function');
      // Try to call it (expecting 401)
      notion.request({
          path: 'users/me', 
          method: 'get'
      }).then(() => console.log('Request success'))
        .catch(e => console.log('Request failed as expected (Auth):', e.code));
  } else {
      console.log('FAILURE: notion.request is missing');
  }

} catch (e) {
  console.log('Could not resolve:', e.message);
}
