const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [{ login: '1', password: '1' }];

const secret = 'Информация с сервера. 0123 ⚡️';

app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.post('/createUser', (req, res) => {
  const user = req.body;
  users.push(user);
  console.log('Зарегистрированные пользователи:', users);
  res.sendStatus(200);
});

app.post('/loginUser', (req, res) => {
  const loginUser = req.body;
  const userIndex = users.findIndex(user => user.login === loginUser.login);
  if (userIndex === -1 || users[userIndex].password !== loginUser.password) {
    res.sendStatus(401);
    return;
  }
  res.sendStatus(200);
});

app.post('/secret', (req, res) => {
  const loginUser = req.body;
  const userIndex = users.findIndex(user => user.login === loginUser.login);
  if (userIndex === -1 || users[userIndex].password !== loginUser.password) {
    res.sendStatus(401);
    return;
  }
  res.send(secret);
});

app.listen(3000, () => console.log('port 3000'));
