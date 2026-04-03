import { json, listDashboard, options } from './_lib/store.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return options();
  }

  return json(200, { dashboard: listDashboard() });
}
