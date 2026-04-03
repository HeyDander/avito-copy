import { getStateSnapshot, json, options } from './_lib/store.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return options();
  }

  return json(200, { categories: getStateSnapshot().categories });
}
