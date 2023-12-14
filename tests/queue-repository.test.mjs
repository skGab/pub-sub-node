import assert from 'assert';
import test from 'node:test';
import { QueueRepository } from '../dist/infrastructure/queue-repository.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// GET THE DIRECTORY OF THE CURRENT MODULE
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CREATE THE TEST CASE
test('QueueRepository should save data to a file', async () => {
    // RUNNING INSTANCE OF QUEUE REPOSITORY
    // CREATE DATA TEST
    const queueRepository = new QueueRepository();
    const testData = { message: 'Test Message' };

    // CALL SAVE METHOD AND STORE THE RESULT
    const result = await queueRepository.save(testData);
    assert.strictEqual(result, true);

    // CREATE THE PATH WHERE DATA IS SAVED
    // READ AND PARSE THE SAVE DATA FROM THE FILE
    const filePath = path.resolve(__dirname, '../db/simple_db.json');
    const savedData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // ASSERT IF THE DATA MATCHS WITH THE TEST DATA
    assert.deepStrictEqual(savedData.channel1["3"], testData);
});
