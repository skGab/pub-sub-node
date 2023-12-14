// CONTRACT TO ABSTRACT QUEUE IMPLEMENTATION
export interface QueueContract {
  publish(channel: string, data: any): any;
  subscribe(channel: string, callback: CallableFunction): any;
  isEmpty(): boolean;
}
