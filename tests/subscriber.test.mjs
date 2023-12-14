import assert from 'assert';
import test from 'node:test';
import { Subscriber } from '../dist/application/subscriber.js';

// SIMULATE A MESSAAGE RECEIVE ON THE CHANNEL
class MockQueueContract {
    subscribe(channel, callback) {
        const message = 'Test Message';
        callback(message, channel, { data: message });
    }
}

// SIMULATING THE REPOSITORY CONTRACT
class MockQueueRepositoryContract {
    save(items) {
        this.lastSavedItems = items;
    }
}

// RUNNING MOCK OBJECTS AND THE SUBSCRIBER INSTANCE
const queue = new MockQueueContract();
const queueRepository = new MockQueueRepositoryContract();
const subscriber = new Subscriber(queue, queueRepository);

// CREATE THE TEST CASE
test('Subscriber should handle message from channel1', () => {
    subscriber.run();

    // VERIFY IF MESSAGE WAS RECEIVED AND HADLE
    assert.strictEqual(queueRepository.lastSavedItems.data, 'Test Message');
});
