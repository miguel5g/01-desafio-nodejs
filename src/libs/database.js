import fs_promises from 'node:fs/promises';

const DATABASE_PATH = new URL('../data/db.json', import.meta.url);

class Database {
  #store = {};

  constructor() {
    this.#load();
  }

  #persist() {
    fs_promises.writeFile(DATABASE_PATH, JSON.stringify(this.#store));
  }

  #load() {
    fs_promises
      .readFile(DATABASE_PATH, 'utf8')
      .then((data) => {
        this.#store = JSON.parse(data);
      })
      .catch(() => {
        // TODO: poderia tratar melhor os erros
        this.#persist();
      });
  }

  /**
   * @param {object} row
   * @param {object} search
   * @returns {boolean}
   */
  #apply_search(row, search) {
    return Object.entries(search).some(([key, value]) => {
      return row[key].toLowerCase().includes(value.toLowerCase());
    });
  }

  /**
   * @param {string} table
   * @param {object} data
   * @returns {object}
   */
  insert(table, data) {
    if (Array.isArray(this.#store[table])) {
      this.#store[table].push(data);
    } else {
      this.#store[table] = [data];
    }

    this.#persist();

    return data;
  }

  bulk_insert(table, data) {
    if (Array.isArray(this.#store[table])) {
      this.#store[table].push(...data);
    } else {
      this.#store[table] = data;
    }

    this.#persist();

    return data;
  }

  select(table, search) {
    let data = this.#store[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return this.#apply_search(row, search);
      });
    }

    return data;
  }

  delete(table, id) {
    const index = this.#store[table].findIndex((row) => row.id === id);

    if (index > -1) {
      this.#store[table].splice(index, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const index = this.#store[table].findIndex((row) => row.id === id);

    if (index > -1) {
      this.#store[table][index] = { id, ...data };
      this.#persist();
    }
  }
}

export { Database };
