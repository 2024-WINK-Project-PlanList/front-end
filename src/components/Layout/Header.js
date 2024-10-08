import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Plus } from '../../assets/header/plus.svg';
import { ReactComponent as Left } from '../../assets/header/left.svg';
import { ReactComponent as Bell } from '../../assets/header/bell.svg';
import { ReactComponent as BellNew } from '../../assets/header/bell2.svg'; // 새로운 알람 아이콘

import Logo from '../../assets/header/logo.png';

const Header = ({ onClick, newNotificationCount }) => {
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
    '/calendar/': {
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
    '/friends': {
      left: true,
      right: true,
      text: '내 친구',
    },
    '/playList': {
      left: true,
      right: false,
      text: '플레이리스트',
    },
  };

  const page = Object.keys(pages).find((key) => location.startsWith(key));

  if (pages[page] !== undefined) {
    return (
      <header className={'pt-17'}>
        <div className={'fixed top-0 bg-white max-w-[480px] w-full'}>
          <div className={'flex justify-between items-center py-5 px-5'}>
            <div className={'w-10'}>
              {pages[page].left ? (
                <Left stroke={'#000000'} onClick={back} />
              ) : null}
            </div>
            <div className={'font-preSemiBold text-xl tracking-tighter'}>
              {pages[page].text}
            </div>
            <div className={'w-10'}>
              {pages[page].right ? (
                <Plus stroke={'#000000'} onClick={onClick} />
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
        <div className={'absolute top-0 bg-white w-full'}>
          <div className={'flex justify-between items-center py-5 px-5'}>
            <img src={Logo} alt={'logo'} />
            <Link to={`/main/notification`}>
              {/* newNotificationCount가 1 이상이면 BellNew 아이콘, 그렇지 않으면 Bell 아이콘 */}
              {newNotificationCount > 0 ? <BellNew /> : <Bell />}
            </Link>
          </div>
          <div className="border-t mt-px" />
        </div>
      </header>
    );
  }
};

export default Header;
