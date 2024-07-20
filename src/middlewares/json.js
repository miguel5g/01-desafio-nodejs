async function json(request, response) {
  // TODO: adicionar uma condição para fazer parse do body apenas se for application/json

  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  response.setHeader('Content-Type', 'application/json');
}

export { json };
