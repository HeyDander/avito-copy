import { getStateSnapshot, json, options, readBody } from './_lib/store.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return options();
  }

  const state = getStateSnapshot();

  if (event.httpMethod === 'GET') {
    return json(200, { conversations: state.conversations });
  }

  if (event.httpMethod === 'POST') {
    const { conversationId, author, text } = readBody(event);

    if (!conversationId || !author || !text) {
      return json(400, { error: 'conversationId, author and text are required' });
    }

    state.conversations = state.conversations.map((conversation) => {
      if (conversation.id !== conversationId) {
        return conversation;
      }

      return {
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            id: `message-${Date.now()}`,
            author,
            text,
          },
        ],
      };
    });

    return json(200, { conversations: state.conversations });
  }

  return json(405, { error: 'Method not allowed' });
}
