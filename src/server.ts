import http from 'http';
import { Queue } from './infrastructure/queue';
import { Publisher } from './application/publisher';
import { Subscriber } from './application/subscriber';
import { QueueRepository } from './infrastructure/queue-repository';

// CREATE INSTANCE
const server = http.createServer();

const queue = new Queue();
const queueRepository = new QueueRepository();
const publisher = new Publisher(server, queue);
const subscriber = new Subscriber(queue, queueRepository);

// RUNNING PUBLISHER
publisher.run();

// RUNNING WORKER
subscriber.run();

// HANDLE ERROS
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// RUNNING SERVER
server.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
