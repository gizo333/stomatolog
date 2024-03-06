import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import '../styles/Registration.css'

const Registration: React.FC = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const regSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Проверка паролей на совпадение
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:4199/register/', {
        username: fullname,
        email: email,
        password: password,
      });

      // Проверяем, есть ли токен в ответе от сервера и сохраняем его в localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        console.log('Токен сохранен в localStorage:', localStorage.getItem('token'));
      } else {
        console.log('Токен отсутствует')
      }

      console.log('Ответ:', response.data);

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      window.location.replace("/");

    } catch (error: any) {
        console.error("Ошибка", error);
        if (error.response && (error.response as any).data) {
          alert((error.response as any).data.detail);
        } else {
          alert("Произошла неизвестная ошибка.");
        }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="reg_container">
      <Home showWelcomePage={false} />
      <div className="reg_content">
        <div className="wrapperWelcome">
          <div className="welcomeText">
            <h3>Добро пожаловать!</h3>
            <p>Мы рады видеть вас на нашем сайте и благодарим
              за проявленный интерес и желание стать
              частью нашего увлекательного сообщества!</p>
            <p>Процесс регистрации прост и займет у вас всего несколько минут.
                 Просто заполните форму ниже.</p>
            <p>Если у вас уже есть аккаунт, <Link to="/auth">войдите!</Link></p>
          </div>
        </div>
        <form className="registrationForm" onSubmit={regSubmit}>
          <div className="formGroup">
            <label htmlFor="fullname"></label>
            <input
              className="reg-input"
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email"></label>
            <input
              className="reg-input"
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
              autoComplete="email"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password"></label>
            <input
              className="reg-input"
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Введите ваш пароль"
              required
              autoComplete="new-password"
            />
            <span
              className="toggle-password-icon"
              onClick={handleTogglePasswordVisibility}
            >
              {isPasswordVisible ? "👁️" : "🙈"}
            </span>
          </div>

          <div className="formGroup">
            <label htmlFor="confirmPassword"></label>
            <input
              className="reg-input"
              type={isPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите ваш пароль"
              required
              autoComplete="new-password"
            />
            <span
              className="toggle-password-icon"
              onClick={handleTogglePasswordVisibility}
            >
              {isPasswordVisible ? "👁️" : "🙈"}
            </span>
          </div>

          <button className="button-style" type="submit">Зарегистрироваться</button>

        </form>

        <footer className="wrapper-footer">
          <div className="footer-content">
            <p>Мы уважаем вашу приватность и обеспечиваем безопасность ваших персональных данных.
                Для подробностей, пожалуйста, ознакомьтесь с нашей Политикой Конфиденциальности.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Registration;
