const https = require('https');

const auth = 'ntn_V88787815245wDv1iRXUIDhzz3Noyxq8fZoLOJadxBX7bo';
const rawId = '2cb211377454801e9b34d4c32c2c6a67';
const databaseId = `${rawId.substr(0, 8)}-${rawId.substr(8, 4)}-${rawId.substr(12, 4)}-${rawId.substr(16, 4)}-${rawId.substr(20)}`;

function doRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.notion.com',
            path: '/v1/' + path,
            method: method,
            headers: {
                'Authorization': 'Bearer ' + auth,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        };

        console.log(`REQ: ${method} https://${options.hostname}${options.path}`);

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                console.log(`STATUS: ${res.statusCode}`);
                if (res.statusCode >= 400) {
                     console.log('BODY:', data);
                } else {
                     console.log('BODY (preview):', data.substring(0, 100));
                }
                resolve();
            });
        });

        req.on('error', (e) => console.error(e));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

(async () => {
    console.log('--- TEST GET ---');
    await doRequest('GET', `databases/${databaseId}`);

    console.log('--- TEST POST QUERY ---');
    await doRequest('POST', `databases/${databaseId}/query`, { page_size: 1 });
})();

