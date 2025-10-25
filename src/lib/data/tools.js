"use strict";

export const tools = [
  {
    id: 'chat',
    title: 'AI Chat',
    description: 'AI-powered chat interface for quick answers and assistance.',
    url: 'https://chat.chronokl.com',
    preview: '/chat-preview.svg',
    accentColor: '#646CFF',
    comingSoon: false
  },
  {
    id: 'cipher',
    title: 'Text Cipher',
    description: 'Encode and decode text with various encryption methods.',
    url: 'https://cipher.chronokl.com',
    preview: '/cipher-preview.svg',
    accentColor: '#4CAF50',
    comingSoon: false
  },
  {
    id: 'more',
    title: 'More Tools',
    description: 'More useful tools coming soon.',
    url: '#',
    preview: null,
    accentColor: '#9C27B0',
    comingSoon: true
  }
];

export function getTools() {
  return tools;
}

export function getToolById(id) {
  return tools.find(tool => tool.id === id);
}
