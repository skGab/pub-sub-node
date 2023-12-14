import assert from 'assert';
import test from 'node:test';
import { Queue } from '../dist/infrastructure/queue.js';

test('Queue should handle publish and subscribe correctly', () => {
    const queue = new Queue();
    const testChannel = 'channel1';
    const testData = { message: 'Test Message' };
    let receivedMessage = null;

    // SUBSCRIVE TO THE CHANNEL
    queue.subscribe(testChannel, (message) => {
        receivedMessage = message;
    });

    // PUBLISH A MESSAAGE TO THE CHANNEL
    queue.publish(testChannel, JSON.stringify(testData));

    // CHECK IF THE MESSAGE WAS RECEVED
    assert.deepStrictEqual(receivedMessage, testData);
});
