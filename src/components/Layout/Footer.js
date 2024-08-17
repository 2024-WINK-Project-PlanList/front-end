import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/footer_icon/home.svg';
import { ReactComponent as Calendar } from '../../assets/footer_icon/calendar.svg';
import { ReactComponent as TodoList } from '../../assets/footer_icon/todolist.svg';
import { ReactComponent as MyPage } from '../../assets/footer_icon/mypage.svg';

const Footer = () => {
  const location = useLocation().pathname.split('/')[1];

  return (
    <footer className={'fixed bottom-0 bg-white w-p'}>
      <div className="border-t" />
      <div className={'flex justify-between px-10 pb-4'}>
          <Home
            width={'2.3rem'}
            height={'2.3rem'}
            stroke={location === 'main' ? '#000000' : '#858585'}
          />
        </Link>
          <Calendar
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'calendar' ? '#000000' : '#858585'}
          />
        </Link>
          <TodoList
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'todolist' ? '#000000' : '#858585'}
          />
        </Link>
          <MyPage
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'mypage' ? '#000000' : '#858585'}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
