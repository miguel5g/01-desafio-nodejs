/**
 * @param {string} query
 * @returns {object}
 */
function parse_query_params(query) {
  return query
    .substring(1)
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');

      return { ...params, [key]: value };
    }, {});
}

export { parse_query_params };
