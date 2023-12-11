export interface QueueRepositoryContract {
  save(data: any): Promise<boolean>;
}
