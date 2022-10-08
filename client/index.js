const socket = io('https://nyj6h.sse.codesandbox.io/');

const appElm = new Promise((res, rej) => {
  const elm = document.getElementById('app');
  if (elm !== null) {
    res(elm);
  } else {
    rej(`No element with id 'app' found`);
  }
});
socket.on('createItem', {}, (e) => {
  console.log(e);
});
socket.on('findAllItems', (e) => {
  console.log(e);
});
socket.on('connect', function () {
  console.log('Connected');
  socket.emit('createItem', {}, (e) => {
    console.log(e);
  });
  socket.emit('findAllItems', (response) => {
    console.log(response);
  });
  socket.emit('events', { test: 'test' });
  socket.emit('identity', 0, (response) => console.log('Identity:', response));
});
socket.on('events', function (data) {
  console.log('event', data);
});
socket.on('exception', function (data) {
  console.log('event', data);
});
socket.on('disconnect', function () {
  console.log('Disconnected');
});
const message = document.getElementById('input');
const messages = document.getElementById('messages');
socket.on('message', ({ data }) => {
  handleNewMessage(data);
  message.value = '';
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

const sendMessage = (e) => {
  socket.emit('message', { data: message.value });
  console.log(e);
};
document.getElementById('send-button').addEventListener('click', sendMessage);

appElm
  .then((e) => {
    const txt = document.createTextNode('Test');
    e.appendChild(txt);
  })
  .catch((e) => console.error(e));
