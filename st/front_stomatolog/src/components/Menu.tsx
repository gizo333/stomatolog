
import React, { useState } from 'react';
import '../styles/menu.css';
import menu from '../img/menu.svg';
import arrow from '../img/down-arrow.svg';
import { Link } from 'react-router-dom';

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

const BurgerMenu: React.FC<BurgerMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className='burger-menu-container'>
      <button className='menu-button' onClick={toggleMenu}>
        <img className='burger-icon' src={menu} alt="Open menu" />
      </button>
      {open && (
        <div className='burger-menu'>
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

interface MenuItemComponentProps {
  item: MenuItem; // Элемент меню
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item }) => {
  // Состояние для отслеживания открытия/закрытия подменю
  
  const [openSubMenu, setOpenSubMenu] = useState(false);

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

export default BurgerMenu;
