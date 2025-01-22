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
  { id: 0, name: 'Petey' },
  { id: 1, name: 'DogMan' },
  { id: 2, name: 'Chief' },
  { id: 3, name: 'April' },
  { id: 4, name: 'Lil Petey' },
];
export default class ChatStream {
  interval?: Timer;
  ids: number[] = [];
  onMessage?: (message: Message) => void;

  start() {
    this.interval = setInterval(() => {
      if (this.onMessage == null) return
      this.onMessage(this.generateMessage());
    }, 1000);
  }

  generateMessage(): Message {
    const id = this.ids[-1] || 1;
    const message = {
      id,
      author: this.getRandomAuthor(),
      timestamp: Date.now(),
      body: faker.hacker.phrase(),
    }

    this.ids.push(id);

    return message;
  }

  getRandomAuthor(): Author {
    const randomIndex = Math.floor(Math.random() * AUTHORS.length);
    return AUTHORS[randomIndex];
  }
}
