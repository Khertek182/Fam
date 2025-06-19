const bcrypt = require('bcrypt');

const password = 'admin123'; // твой пароль
bcrypt.hash(password, 10).then(hash => {
  console.log('Хеш пароля:', hash);
});