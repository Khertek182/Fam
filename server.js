const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sources = [];
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


// Отдаём файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));


// Пример простого маршрута для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});
// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuvan_fam',
  password: '12345',
  port: 5432,
});

// Получение всех фамилий
app.get('/api/surnames', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM surnames ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении фамилий:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Получение деталей по фамилии
app.get('/api/surnames/:id/details', async (req, res) => {
  const surnameId = req.params.id;

  try {
    const queryText = 'SELECT detail_key, detail_value FROM surname_details WHERE surname_id = $1';
    const { rows } = await pool.query(queryText, [surnameId]);
    res.json(rows);
  } catch (error) {
    console.error('Ошибка при получении деталей:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Авторизация администратора
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
console.log('Получены данные для добавления:', req.body);
  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const admin = result.rows[0];
    const match = await bcrypt.compare(password, admin.password_hash);

    if (!match) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.json({ message: 'Успешный вход', token });
  } catch (err) {
    console.error('Ошибка при авторизации:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавить фамилию
app.post('/api/surnames', async (req, res) => {
  const { surname, meaning_tuvan, meaning_russian } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO surnames (surname, meaning_tuvan, meaning_russian) VALUES ($1, $2, $3) RETURNING *',
      [surname, meaning_tuvan, meaning_russian]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});

app.delete('/api/surnames/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM surnames WHERE id = $1', [id]);
  res.sendStatus(200);
}); 

app.put('/api/surnames/:id', async (req, res) => {
  const { id } = req.params;
  const { surname, meaning_tuvan, meaning_russian } = req.body;
  await pool.query(
    'UPDATE surnames SET surname = $1, meaning_tuvan = $2, meaning_russian = $3 WHERE id = $4',
    [surname, meaning_tuvan, meaning_russian, id]
  );
  res.sendStatus(200);
});

// Запуск сервера
// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
