import path from 'path';
import { QueueRepositoryContract } from './../domain/queue-repository-contract';
import { writeFile } from 'fs';

export class QueueRepository implements QueueRepositoryContract {
  save(data: any): Promise<boolean> {
    // GET THE PATH TO THE FILE SYSTEM
    const filePath = path.resolve(__dirname, './db/simple_db.json');

    // WRITE THE DATA ON THE FILE
    // RETURN FALSE IF ERROR AND LOG IT
    writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });

    // RETURN RESPONSE
    return Promise.resolve(true);
  }
}
