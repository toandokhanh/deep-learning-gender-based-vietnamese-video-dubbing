// Adapter for the local Python worker. Never log service credentials or payloads.
const post = async (options, callback) => {
  let response;
  let body;
  try {
    response = await fetch(options.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify(options.json),
      signal: AbortSignal.timeout(options.timeout || 1800000),
      redirect: 'error',
    });
    body = await response.json();
  } catch (error) {
    return callback(error);
  }
  return callback(null, { statusCode: response.status }, body);
};
module.exports = { post };
