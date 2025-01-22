# Setup
1. Clone the repo
1. Install bun `curl -fsSL https://bun.sh/install | bash`
1. `bun install`
1. `bun build:watch`
1. `bun start` (in a new terminal window)

# TODO

1. Display the chat messages on the page
1. Display the authors name with the messages
1. Some of the message come out of order, ensure they are ordered by timestamp
1. Some messages have a `threadId`, nest those messages under the message with that id.
1. If an author has more than 1 consecutive message, only show the author name on the first message
1. The message IDs suffer from a race condition bug, when you send a message there is a chance it will have a duplicate id as an incoming message. Fix this.
1. Limit to only show the last 100 messages

# Notes

- Don't worry too much about performance as long as the chat flows smoothly, we're good.
