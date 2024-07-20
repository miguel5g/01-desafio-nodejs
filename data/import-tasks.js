import { createReadStream } from 'node:fs';
import { parse } from 'csv-parse';

const data = createReadStream(new URL('input.csv', import.meta.url));
let headers = null;

data.pipe(parse()).on('data', (item) => {
  if (headers === null) {
    headers = item;
    return;
  }

  const data = {};

  item.forEach((value, index) => {
    data[headers[index]] = value;
  });

  fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(() => {
      console.log('Task criada');
    })
    .catch((error) => {
      console.log(error.message);
    });
});
