
import React, { useState } from 'react';
import '../styles/menu.css';
import menu from '../img/menu.svg';
import arrow from '../img/down-arrow.svg';
import { Link } from 'react-router-dom';

// Интерфейс для определения структуры элемента меню
interface MenuItem {
  label: string;        // Текст, отображаемый в меню
  link?: string;        // Ссылка, на которую переходит элемент меню (опционально)
  subMenu?: MenuItem[]; // Подменю для текущего элемента меню (опционально)
  icon?: any | React.ReactElement; 
}

// Интерфейс для пропсов компонента BurgerMenu
interface BurgerMenuProps {
  items: MenuItem[];    // Массив элементов меню
}

// Компонент BurgerMenu, представляющий собой бургер-меню
const BurgerMenu: React.FC<BurgerMenuProps> = ({ items }) => {
  // Состояние для отслеживания открытия/закрытия меню
  const [open, setOpen] = useState(false);

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    // Обертка для бургер-меню
    <div className='burger-menu-container'>
      {/* Кнопка открытия/закрытия меню */}
      <button className='menu-button' onClick={toggleMenu}>
        <img className='burger-icon' src={menu} alt="Open menu" />
      </button>
      {/* Если меню открыто, отображаем его содержимое */}
      {open && (
        <div className='burger-menu'>
          {/* Формируем список элементов меню на основе переданных пропсов */}
          <ul>
            {items.map((menuItem, index) => (
              <MenuItemComponent key={index} item={menuItem} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Интерфейс для пропсов компонента MenuItemComponent
interface MenuItemComponentProps {
  item: MenuItem; // Элемент меню
}

// Компонент MenuItemComponent, представляющий собой элемент меню
const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item }) => {
  // Состояние для отслеживания открытия/закрытия подменю
  
  const [openSubMenu, setOpenSubMenu] = useState(false);

  // Функция для переключения состояния подменю
  const toggleSubMenu = () => {
    setOpenSubMenu((prevOpen) => !prevOpen);
  };

  return (
    <li className='menu-li'>
    <Link
      to={item.link || '#'}
      className={`menu-link ${item.label.toLowerCase() === 'услуги' ? 'custom-class' : ''}`}
      onClick={toggleSubMenu}
    >
      {item.label}

      {item.label.toLowerCase() === 'услуги' && (
        <img className={`arrow-icon ${openSubMenu ? 'rotate' : ''}`} src={arrow} alt="Arrow" />
      )}
    </Link>

    
    {item.subMenu && openSubMenu && (
      <ul className={`sub-menu`}>
        {item.subMenu.map((subMenuItem, index) => (
          <MenuItemComponent key={index} item={subMenuItem} />
        ))}
      </ul>
    )}
  </li>
);

};

// Массив элементов меню для примера
export const menuItems: MenuItem[] = [
  {
    label: 'Услуги',
    // icon: require('../img/hero-img.png'),
    subMenu: [
      { label: 'Service 1', link: '/service-1' },
      { label: 'Service 2', link: '/service-2' },
      { label: 'Service 1', link: '/service-1' },
      { label: 'Service 2', link: '/service-2' },
      { label: 'Service 1', link: '/service-1' },
      { label: 'Service 2', link: '/service-2' },
      { label: 'Service 1', link: '/service-1' },
      { label: 'Service 2', link: '/service-2' },
      
    ],
  },
  { label: 'Прайс лист', link: '/price' },
  { label: 'Contact', link: '/contact' },
];

// Экспорт компонента BurgerMenu для использования в других частях приложения
export default BurgerMenu;
