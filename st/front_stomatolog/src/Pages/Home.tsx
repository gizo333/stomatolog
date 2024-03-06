import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Home.css";
import whatsapp from "../img/whatsapp.svg";
import telegram from "../img/telegram.svg";
import metro from "../img/metro.svg";
import medic from "../img/logo2.png";
import Menu, { menuItems } from "../components/Menu";
import WelcomePage from "../components/WelcomePage";
import BottomBar from "../components/BottomBar";
import search from "../img/search.svg";
import enter from "../img/enter.svg";

interface HomeProps {
  showWelcomePage?: boolean;
}

const Home: React.FC<HomeProps> = ({ showWelcomePage = true }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="header-conten">
      <div className="header-top">
        <div className="header-top-cont">
          <div className="header-top-cont-left">
            <div className="clinic-p">Клиники:</div>
            <img src={metro} alt="metro" className="metro" />
            <ul className="clinic-list">
              <li className="clinic-list-li">Коломенская</li>{" "}
              {/*можно редактировать*/}
            </ul>
          </div>

          <div className="messeg">
            <img src={whatsapp} alt="wats" className="whts" />
            <img src={telegram} alt="telegr" className="telegr" />
          </div>

          <div className="header-top-cont-right">
            <p className="number">8-999-999-99-99</p> {/*можно редактировать*/}
            <p className="number-info">
              Прием звонков ежедневно с 8:00 до 22:00
            </p>
          </div>
        </div>
      </div>

      <div className="header-bot">
        <div className="header-bot-logo">
          <NavLink to="/" className="navlink">
            <img src={medic} alt="logo" className="medic" />
          </NavLink>{" "}
          {/*можно редактировать*/}
        </div>
        <div className="uslugi">
          <ul className="uslugi-ul">
            <li className="uslugi-li">Услуги</li>
            <NavLink to="/price" className="navlink">
              <li className="uslugi-li">Прайс лист</li>
            </NavLink>
            <li className="uslugi-li">Акции</li>
            <li className="uslugi-li">Врачи</li>
            <li className="uslugi-li">Отзывы</li>
          </ul>
        </div>

        <div className="header-bot-button">
          <div className="search-container">
            <img
              src={search}
              alt="search"
              className="search-icon"
              onClick={toggleSearch}
            />
            <div className={`search-popup ${isSearchOpen ? "open" : ""}`}>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
              />
            </div>
          </div>

          <button className="header-bot-button-button">
            Записаться на прием
          </button>

          <div className="welcome">
            <NavLink className="enter-link" to="/auth">
              <img src={enter} alt="enter" className="logo" />
            </NavLink>
          </div>
        </div>
        <Menu items={menuItems} />
      </div>
      {showWelcomePage && <WelcomePage />}
      <BottomBar />
    </header>
  );
};

export default Home;
