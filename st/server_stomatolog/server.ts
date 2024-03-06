import express, { Request, Response } from 'express';
import  bodyParser  from 'body-parser';
import cors from 'cors';
import { User, sequelize } from '../server_stomatolog/models/ Users'
import createToken from './jwt';


const app = express();
const port = 4199;

// Промежуточное ПО для обработки тела запроса в формате JSON
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

// Регистрация нового пользователя
app.post('/register', async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
  
      // Проверка, что пользователь с таким email не существует
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }
  
      // Создание нового пользователя
      const newUser = await User.create({
        username,
        email,
        password,
      });
  
      // Создание токена для нового пользователя
      const token = createToken(newUser);
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(500).json({ error: 'Ошибка регистрации пользователя' });
    }
  });


  

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      if (user.password === password) {
        const token = createToken(user);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
      }
    } else {
      res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

(async () => {
  await sequelize.sync(); // Синхронизация с базой данных (выполняет миграции)
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
})();
