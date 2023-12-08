export interface QueueContract {
  publish(canal: string, data: any): any;
}
