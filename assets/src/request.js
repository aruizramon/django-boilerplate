/**
 * Request utility.
 * Based on the mxstbr react boilerplate version, tweaked to behave with
 * Django/DRF.
**/

import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export function parseJSON(response) {
  console.log(response)
  if (response.status !== 204) {
    return response.json();
  }
  // 204's in Django Rest Framework return a No Content response, and don't
  // have a json() method.
  // We need to create a promise that can resolve with the status text to
  // avoid breaking the other status codes.
  return new Promise((resolve, reject) => {
    resolve({ data: response.statusText });
    reject({ data: 'Something Went Wrong!' });
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing "status" and "data"
 */

export default function request(url, options) {
  return fetch(url, options)
    .then((response) =>
      parseJSON(response)
      .then((data) => ({ status: response.status, data }))
        .catch(() => ({ status: response.status, data: {} })) // Inner catch if data JSON parsing fails
    .then((result) => result))
    .catch((error) => console.warn(error));
}
