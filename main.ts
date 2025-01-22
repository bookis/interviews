import ChatStream from './ChatStream';

document.addEventListener('DOMContentLoaded', () => {
  const chatStream = new ChatStream()

  chatStream.onMessage = (message) => {
    const chatEl = document.createElement('div');
    chatEl.innerText = message.body;
    document.querySelector('#chat')?.appendChild(chatEl);;
  }

  chatStream.start();
});
