import { getStateSnapshot, json, options, readBody } from './_lib/store.js';

export default async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return options();
  }

  const state = getStateSnapshot();

  if (event.httpMethod === 'GET') {
    return json(200, { favorites: state.favorites });
  }

  if (event.httpMethod === 'POST') {
    const { listingId } = readBody(event);

    if (!listingId) {
      return json(400, { error: 'listingId is required' });
    }

    const alreadySaved = state.favorites.includes(listingId);
    state.favorites = alreadySaved
      ? state.favorites.filter((id) => id !== listingId)
      : [...state.favorites, listingId];

    return json(200, { favorites: state.favorites });
  }

  return json(405, { error: 'Method not allowed' });
}
