import EventEmitter from 'events';
import { QueueContract } from '../domain/queue-contract';

export class Queue extends EventEmitter implements QueueContract {
  public items: { [key: string]: any };
  public count: number;
  public lowerCount: number;

  constructor() {
    super();
    // DEFINING PROPS TO HANDLE THE QUEUE
    this.count = 0;
    this.lowerCount = 0;
    this.items = {};
  }

  // STORE DATA AND PUBLISH EVENTS
  public publish(channel: string, data: any) {
    if (!this.items[channel]) {
      this.items[channel] = {};
    }

    // STORING DATA ON FIRST POSTION
    this.items[channel][this.count] = JSON.parse(data);

    // INCREMENTING COUNT TO BE THE NEXT POSITION FROM THE NEW DATA
    this.count++;

    // TRIGGER THE EVENT
    this.emit('newMessage', channel);
  }

  // LISTEAN EVENTS FROM CHANNEL
  public subscribe(channel: string, callback: CallableFunction) {
    this.on('newMessage', (eventChannel) => {
      // CHECK IF HAS EVENTS ON THE CHANNEL AND IF IS NOT EMPTY
      if (eventChannel === channel && !this.isEmpty()) {
        // GET FIRST MESSAGE FROM CHANNEL AND STORE ON LOCAL VARIABLE
        const message = this.items[channel][this.lowerCount];

        // INCREMENTING LOWER COUNT TO BE THE NEXT POSITION OF THE FIRST ITEM
        this.lowerCount++;

        // RETURN DATA TO THE APPLICATION SUBSCRIBER METHOD
        callback(message, channel, this.items);
      }
    });
  }

  // CHECK IF THE QUEUE IS EMPTY
  public isEmpty() {
    if (this.count - this.lowerCount === 0) return true;
    return false;
  }
}
