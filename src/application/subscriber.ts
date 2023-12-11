import { QueueContract } from '../domain/queue-contract';
import { QueueRepositoryContract } from '../domain/queue-repository-contract';

export class Subscriber {
  constructor(
    private queue: QueueContract,
    private queueRepository: QueueRepositoryContract
  ) {}

  public run() {
    return this.queue.subscribe(
      'channel1',
      (message: string, channel: string, items: any) => {
        // RETURN MESSAGE FROM CHANNEL
        console.log(`Message receive from ${channel}`);
        console.log(`Message: ${message}`);

        // SAVE MESSAGE ON DB
        this.queueRepository.save(items);
      }
    );
  }
}
