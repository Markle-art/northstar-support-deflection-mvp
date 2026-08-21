// run `node index.js` in the terminal
import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import {schema} from'./schema.js';
const yoga = createYoga({
    schema
    });



const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
