import { seed } from './seed.js';

function cloneSeed() {
  return structuredClone(seed);
}

function getState() {
  if (!globalThis.__listAmState) {
    globalThis.__listAmState = cloneSeed();
  }

  return globalThis.__listAmState;
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    },
    body: JSON.stringify(body),
  };
}

export function options() {
  return json(200, { ok: true });
}

export function readBody(event) {
  if (!event.body) {
    return {};
  }

  return JSON.parse(event.body);
}

export function listDashboard() {
  const state = getState();
  const topCategories = state.categories.map((category) => ({
    category: category.name,
    count: state.listings.filter((listing) => listing.category === category.name).length,
  }));

  return {
    totalListings: state.listings.length,
    totalFavorites: state.favorites.length,
    responseRate: state.conversations.reduce(
      (sum, conversation) => sum + conversation.messages.length,
      0,
    ),
    topCategories: topCategories.sort((left, right) => right.count - left.count),
  };
}

export function getStateSnapshot() {
  return getState();
}
