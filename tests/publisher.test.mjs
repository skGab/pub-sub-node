import http from 'http';
import assert from 'assert';
import test from 'node:test';
import { Publisher } from '../dist/application/publisher.js';

// DEFINING MOCK QUEUE CONTRACT
class MockQueueContract {
    publish(channel, data) {
        this.lastPublished = { channel, data };
    }
}

// RUNNING MOCK QUEUE AND HTTP SERVER
const queue = new MockQueueContract();
const server = http.createServer();

// RUNNING PUBLISH INSTANCE WITH SERVER AND QUEUE
const publisher = new Publisher(server, queue);
publisher.run();

// CREATE THE TEST CASE
test('POST to /channel1 should publish a message', async () => {
    await new Promise((resolve, reject) => {
        server.listen(0, 'localhost', () => {
            // GET THE SERVER PORT
            // CREATE THE TEST MESSAGE
            const { port } = server.address();
            const postData = JSON.stringify({ message: 'Test Message' });

            // CREATE THE REQUEST CONFIG OPTIONS
            const options = {
                hostname: 'localhost',
                port,
                path: '/channel1',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                },
            };


            // CREATE AND SEND THE REQUEST
            const req = http.request(options, (res) => {
                let responseBody = '';
                res.on('data', (chunk) => { responseBody += chunk; });
                res.on('end', () => {
                    assert.strictEqual(res.statusCode, 200);
                    assert.strictEqual(queue.lastPublished.channel, 'channel1');
                    assert.strictEqual(queue.lastPublished.data, postData);
                    server.close();
                    resolve();
                });
            });

            // HANDLE ERROR
            req.on('error', (error) => {
                reject(error);
            });

            // WRITE THE DATA TO THE POST REQUEST AND END IT
            req.write(postData);
            req.end();
        });

        // HANDLE ERROR
        server.on('error', (error) => {
            reject(error);
        });
    });
});
