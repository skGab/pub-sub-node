import { QueueContract } from '../domain/queue-contract';

export class Queue implements QueueContract {
  public items;
  public count: number;
  public lowerCount: number;

  constructor() {
    this.count = 0;
    this.lowerCount = 0;
    this.items = {};
  }

  public publish() {}
}
