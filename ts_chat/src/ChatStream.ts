import { faker } from '@faker-js/faker';

interface Author {
  id: number,
  name: string,
}

interface Message {
  id: number,
  author: Author,
  timestamp: number,
  body: string
  threadId?: number,
}

const AUTHORS: Author[] = [
  { id: 0, name: faker.internet.username() },
  { id: 1, name: faker.internet.username() },
  { id: 2, name: faker.internet.username() },
  { id: 3, name: faker.internet.username() },
  { id: 4, name: faker.internet.username() },
];

export default class ChatStream {
  interval?: Timer;
  ids: number[] = [];
  onMessages?: (message: Message[]) => void;

  start() {
    this.interval = setTimeout(() => {
      if (this.onMessages == null) return
      this.onMessages(this.generateMessages());
      this.start();
    }, faker.number.int({ min: 10, max: 1000 }));
  }

  generateMessages(): Message[] {
    const messages: Message[] = [];
    const n = faker.number.int({ min: 0, max: 4 });
    for (let i = 0; i < n; i++) {
      messages.push(this.generateMessage());
    }

    return messages;
  }

  send(message: Omit<Message, 'id'>) {
    if (!this.onMessages) return;

    const id = this.getNextId();
    setTimeout(() => {
      this.ids.push(id);
      this.onMessages!([{ ...message, id }]);
    }, 300);
  }

  generateMessage(): Message {
    const id = this.getNextId();
    const threadIndex = faker.number.int({ min: 0, max: this.ids.length * 5 });
    const threadId = this.ids[threadIndex];
    const message = {
      id,
      author: this.getRandomAuthor(),
      timestamp: Date.now() - faker.number.int({ min: 0, max: 3000 }),
      body: faker.hacker.phrase(),
      threadId,
    }

    this.ids.push(id);

    return message;
  }

  getNextId() {
    return (this.ids[this.ids.length - 1] || 0) + 1;
  }

  getRandomAuthor(): Author {
    const randomIndex = Math.floor(Math.random() * AUTHORS.length);
    return AUTHORS[randomIndex];
  }
}
