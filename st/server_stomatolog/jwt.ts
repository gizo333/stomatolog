import jwt from 'jsonwebtoken';

// Создание токена и заполнение данными пользователя
function createToken(user: { user_id: string; username: string }): string {
  const tokenPayload = {
    id: user.user_id,
    username: user.username,
    roles: ['admin'],
  };

  const secretKey = '54483598';
  const expiresInMinutes = 10;

  const token = jwt.sign(tokenPayload, secretKey, {
    expiresIn: `${expiresInMinutes}m`,
  });

  return token;
}

export default createToken;
