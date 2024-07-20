import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { parse_query_params } from './utils/parse-query-params.js';

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  console.log(`${method} ${url}`); // TODO: remover em produção

  response.status = (status = 200) => {
    return response.writeHead(status);
  };

  response.json = (content) => {
    response.end(JSON.stringify(content));
  };

  await json(request, response);

  const route = routes.handlers.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const { query, ...params } = url.match(route.path).groups;

    request.params = params;
    request.query = query ? parse_query_params(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});

server.listen(4000, () => {
  console.log(`🚀 Server listen on http://localhost:4000`);
});
