// CONTRACT TO ABSTRACT REPOSITORY IMPLEMENTATION
export interface QueueRepositoryContract {
  save(data: any): Promise<boolean>;
}
