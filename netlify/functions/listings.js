import { getStateSnapshot, json, listDashboard, options, readBody } from './_lib/store.js';

export default async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return options();
  }

  const state = getStateSnapshot();

  if (event.httpMethod === 'GET') {
    return json(200, {
      listings: state.listings.sort(
        (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      ),
    });
  }

  if (event.httpMethod === 'POST') {
    const body = readBody(event);
    const requiredFields = ['title', 'price', 'city', 'category', 'sellerName', 'image', 'description'];
    const missingField = requiredFields.find((field) => !body[field]);

    if (missingField) {
      return json(400, { error: `Поле "${missingField}" обязательно.` });
    }

    const newListing = {
      id: `listing-${state.listings.length + 1}-${Date.now()}`,
      title: body.title,
      price: Number(body.price),
      city: body.city,
      category: body.category,
      sellerName: body.sellerName,
      badge: body.badge || 'Новая подборка',
      image: body.image,
      description: body.description,
      createdAt: new Date().toISOString(),
    };

    state.listings = [newListing, ...state.listings];

    return json(201, {
      listing: newListing,
      listings: state.listings,
      dashboard: listDashboard(),
    });
  }

  return json(405, { error: 'Method not allowed' });
}
