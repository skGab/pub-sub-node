import path from 'path';
import { QueueRepositoryContract } from './../domain/queue-repository-contract';
import { writeFile } from 'fs';

export class QueueRepository implements QueueRepositoryContract {
  save(data: any): Promise<boolean> {
    const filePath = path.resolve(__dirname, './db/simple_db.json');

    writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
      if (err) {
        console.log(err);
        return false;
      }

      console.log('Updated file successfully');
    });
    return Promise.resolve(true);
  }
}
