import crypto from 'node:crypto';

import { Router } from './libs/router.js';
import { Database } from './libs/database.js';

const routes = new Router();
const database = new Database();

routes.post('/tasks', (request, response) => {
  const { title, description } = request.body;

  const task_data = {
    id: crypto.randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  database.insert('tasks', task_data);

  return response.status(201).json({ message: 'Task criada' });
});

routes.get('/tasks', (request, response) => {
  const { search } = request.query;

  const tasks = database.select('tasks', search ? { title: search, description: search } : null);

  return response.json(tasks);
});

routes.put('/tasks/:id', (request, response) => {
  const { id } = request.params;
  const { title, description } = request.body;

  const [task] = database.select('tasks', { id });

  if (!task) {
    return response.status(404).json({ message: 'Task não encontrada' });
  }

  const task_data = {
    ...task,
    updated_at: new Date(),
  };

  if (title) task_data.title = title;
  if (description) task_data.description = description;

  database.update('tasks', id, task_data);

  return response.json({ message: 'Task atualizada' });
});

routes.delete('/tasks/:id', (request, response) => {
  const { id } = request.params;

  const [task] = database.select('tasks', { id });

  if (!task) {
    return response.status(404).json({ message: 'Task não encontrada' });
  }

  database.delete('tasks', id);

  return response.json({ message: 'Task removida' });
});

routes.patch('/tasks/:id/complete', (request, response) => {
  const { id } = request.params;

  const [task] = database.select('tasks', { id });

  if (!task) {
    return response.status(404).json({ message: 'Task não encontrada' });
  }

  const task_data = {
    ...task,
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  database.update('tasks', id, task_data);

  return response.json({ message: 'Task finalizada' });
});

export { routes };
