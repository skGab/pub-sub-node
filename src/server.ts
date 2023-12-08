// ESM
import Fastify from 'fastify';
import { Publisher } from './application/publisher';

const fastify = Fastify({
  logger: true,
});

const publisher = new Publisher(fastify);

publisher.publish();

fastify.listen({ port: 3000 }, (err, adress) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
