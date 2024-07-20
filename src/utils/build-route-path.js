/**
 * @param {string} path
 * @returns {RegExp}
 */
function build_route_path(path) {
  const route_regex = /:([a-zA-Z]+)/g;
  const path_with_params = path.replaceAll(route_regex, '(?<$1>[a-z0-9-_]+)');

  return new RegExp(`^${path_with_params}(?<query>\\?(.*))?$`);
}

export { build_route_path };
