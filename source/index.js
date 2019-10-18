import Axios from 'axios';

const createUser = user => Axios.post('/createUser', user);
const loginUser = user => Axios.post('/loginUser', user);
const secret = user => Axios.post('/secret', user);

export { createUser, loginUser, secret };
