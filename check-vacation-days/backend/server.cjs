// 1. Импортируем зависимости
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./db.cjs"); // твоя база

// 2. Создаём приложение
const app = express();

// 3. Middleware
app.use(cors());
app.use(bodyParser.json()); // чтобы req.body работал

// 4. Тестовый маршрут (опционально)
app.get("/ping", (req, res) => {
  res.send("pong");
});

// 5. Маршрут регистрации
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "Все поля обязательны" });

  const password_hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`,
    [username, email, password_hash],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: "Имя пользователя или email уже заняты" });
      }
      res.json({ message: "Регистрация успешна!" });
    }
  );
});

// 6. Маршрут логина
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Все поля обязательны" });

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (!user) return res.status(400).json({ error: "Пользователь не найден" });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(400).json({ error: "Неверный пароль" });

      res.json({ message: "Успешный вход", username: user.username });
    }
  );
});

// 7. Запуск сервера
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
