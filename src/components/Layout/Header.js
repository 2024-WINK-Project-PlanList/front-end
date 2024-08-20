import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Plus } from '../../assets/header/plus.svg';
import { ReactComponent as Left } from '../../assets/header/left.svg';
import { ReactComponent as Bell } from '../../assets/header/bell.svg';
import Logo from '../../assets/header/logo.png';

const Header = ({ showModal }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const back = () => {
    navigate(-1);
  };

  const pages = {
    '/main/notification': {
      left: true,
      right: false,
      text: '알림',
    },
    '/calendar/list': {
      left: true,
      right: false,
      text: '공유 캘린더',
    },
    '/calendar': {
      left: false,
      right: false,
      text: '공유 캘린더',
    },
    '/todolist': {
      left: false,
      right: true,
      text: '투두리스트',
    },
    '/mypage': {
      left: false,
      right: false,
      text: '마이페이지',
    },
    '/mypage/friends': {
      left: true,
      right: true,
      text: '내 친구',
    },
    '/mypage/playlist': {
      left: true,
      right: false,
      text: '플레이리스트',
    },
  };

  if (location !== '/main') {
    return (
      <header className={'pt-17'}>
        <div className={'fixed top-0 bg-white w-p'}>
          <div className={'flex justify-between items-center py-5 w-p px-5'}>
            <div className={'w-10'}>
              {pages[location].left ? (
                <Left stroke={'#000000'} onClick={back} />
              ) : null}
            </div>
            <div className={'font-semibold text-xl tracking-tighter'}>
              {pages[location].text}
            </div>
            <div className={'w-10'}>
              {pages[location].right ? (
                <Plus stroke={'#000000'} onClick={showModal} />
              ) : null}
            </div>
          </div>
          <div className="border-t" />
        </div>
      </header>
    );
  } else {
    return (
      <header className={'pt-17'}>
        <div className={'fixed top-0 bg-white w-p'}>
          <div className={'flex justify-between items-center py-5 w-p px-5'}>
            <img src={Logo} alt={'logo'} />
            <Link to={'/main/notification'}>
              <Bell />
            </Link>
          </div>
          <div className="border-t mt-px" />
        </div>
      </header>
    );
  }
};

export default Header;
