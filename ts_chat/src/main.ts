import ChatStream from './ChatStream';

document.addEventListener('DOMContentLoaded', () => {
  const chatStream = new ChatStream()
  const chatContainer = document.querySelector('#chat')!;

  chatStream.onMessages = (messages) => {
    const chatEl = document.createElement('div');
    chatEl.innerText = `Messages received (${messages.length})`;
    chatContainer.appendChild(chatEl);;
  }

  chatStream.start();

  document.querySelector<HTMLFormElement>('#message-form')!.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputEl = (e.currentTarget as HTMLFormElement).querySelector('input');

    if (inputEl == null) return;
    if (!inputEl.value) return;

    chatStream.send({
      author: { id: 5, name: "Me" },
      timestamp: Date.now(),
      body: inputEl.value,
    })

    inputEl.value = "";
  });
});
