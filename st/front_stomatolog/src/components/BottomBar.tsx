import '../styles/BottomBar.css';
import React from 'react';
import { useBottomBar } from './BottomBarContext';
import uslugi from '../img/uslugi.svg';
import doctors from '../img/doctors.svg';
import record from '../img/record.svg';
import about from '../img/about.svg';
import contacts from '../img/contacts.svg';

const BottomBar: React.FC = () => {
  const { onButtonClick } = useBottomBar();

  return (
    <div className="bottom-bar">
      <div className='btn-bar' onClick={() => onButtonClick(0)}>
        <img className='img-btn' src={uslugi} alt="uslugi" />
        <span className='img-sp'>Услуги</span>
      </div>
      <div className='btn-bar' onClick={() => onButtonClick(1)}>
        <img className='img-btn' src={doctors} alt="doctors" />
        <span className='img-sp'>Врачи</span>
      </div>
      <div className='btn-bar' onClick={() => onButtonClick(2)}>
        <img className='img-btn' src={record} alt="record" />
        <span className='img-sp'>Записаться</span>
      </div>
      <div className='btn-bar' onClick={() => onButtonClick(3)}>
        <img className='img-btn' src={about} alt="about" />
        <span className='img-sp'>О Клинике</span>
      </div>
      <div className='btn-bar' onClick={() => onButtonClick(4)}>
        <img className='img-btn' src={contacts} alt="contacts" />
        <span className='img-sp'>Контакты</span>
      </div>
    </div>
  );
};

export default BottomBar;