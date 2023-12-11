import { QueueContract } from '../domain/queue-contract';
import http from 'http';
import url from 'url';

export class Publisher {
  constructor(
    private readonly server: http.Server,
    private queue: QueueContract
  ) {}

  public run() {
    this.server.on('request', (request, response) => {
      // GET THE REQUEST URL AND PARSE TO OBJECT TO ACESS PROPS
      const parsedUrl = url.parse(request.url || '/', true);
      const pathname = parsedUrl.pathname;

      // CHEKING THE PATH NAME AND HTTP METHOD
      if (pathname === '/channel1' && request.method === 'POST') {
        let body = '';

        // LISTEAN FOR EVENT ON REQUEST OBJECT
        request.on('data', (data: { message: string }) => {
          body += data;
        });

        // PUBLISH THE DATA ON THE CHANNEL
        request.on('end', () => {
          this.queue.publish('channel1', body);

          // SEND RESPONSE TO THE CLIENT
          response.end(
            JSON.stringify({ message: 'Message published to channel1' })
          );
        });
      } else {
        response.end(JSON.stringify({ error: 'Not Found' }));
      }
    });
  }
}
