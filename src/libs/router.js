import { build_route_path } from '../utils/build-route-path.js';

class Router {
  #handlers = [];

  get handlers() {
    return this.#handlers;
  }

  get(path, handler) {
    this.#handlers.push({
      method: 'GET',
      path: build_route_path(path),
      handler,
    });
  }

  post(path, handler) {
    this.#handlers.push({
      method: 'POST',
      path: build_route_path(path),
      handler,
    });
  }

  patch(path, handler) {
    this.#handlers.push({
      method: 'PATCH',
      path: build_route_path(path),
      handler,
    });
  }

  put(path, handler) {
    this.#handlers.push({
      method: 'PUT',
      path: build_route_path(path),
      handler,
    });
  }

  delete(path, handler) {
    this.#handlers.push({
      method: 'DELETE',
      path: build_route_path(path),
      handler,
    });
  }
}

export { Router };
