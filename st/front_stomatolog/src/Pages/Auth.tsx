import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import '../styles/Auth.css'
import axios from 'axios'; 
import Cookies from 'js-cookie';




const Auth: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;

    try {
        const response = await axios.post('http://127.0.0.1:4199/login/', {
          email,
          password,
        });
  
        const data = response.data;
  
        if (response.status === 200) {
            const authToken = data.token;
            Cookies.set('token', authToken, { expires: 1 / 144});
  
          window.location.replace('/');
        } else if (response.status === 421) {
          setMessage('Неверный пароль!');
        } else {
          console.error(data.message || 'Ошибка при входе');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

  return (
    <div className="enter-container">
      <Home showWelcomePage={false} />
      <div className="enter-content">
        <div className="wrapperWelcome">
          <div className="welcomeText">
            <h3>Добро пожаловать обратно!</h3>
            <p>Мы рады видеть вас снова! Введите свои учетные данные ниже, чтобы войти в свой аккаунт.</p>
            <p>
              Если у вас еще нет аккаунта, <Link to="/registration">зарегистрируйтесь</Link>!
            </p>
          </div>
        </div>

        <form className="enterForm" onSubmit={handleSubmit}>
          {message && <p>{message}</p>}
          <div className="formGroup">
            <label htmlFor="email"></label>
            <input className="reg-input" type="email" id="email" placeholder="Введите ваш email" required autoComplete="email" />
          </div>

          <div className="formGroup">
            <label htmlFor="password"></label>
            <input className="reg-input" type="password" id="password" placeholder="Введите ваш пароль" required autoComplete="new-password" />
          </div>

          <button className="button-style" type="submit">
            Войти
          </button>

          <Link className='enter-link' to="/reset">
            <button className="button-style" type="submit">
              Забыли пароль?
            </button>
          </Link>
          <Link className='enter-link' to="/registration">
            <button className="button-style" type="submit">
              Зарегистрируйтесь
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Auth;
