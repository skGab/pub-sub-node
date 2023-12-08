import { FastifyInstance } from 'fastify';
import { QueueContract } from '../domain/queue-contract';
import { Queue } from '../infrastructure/queue';

export class Publisher {
  fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  public publish() {
    // RECEBE E REGISTRA REQUISIÇÕES NO CANAL
    this.fastify.get('/', (request, reply) => {
      const queue: QueueContract = new Queue();

      queue.publish('channel-1', request.body);
      reply.send({ message: 'Data stored on channel 1' });
    });
  }
}
