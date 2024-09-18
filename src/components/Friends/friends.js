import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Trash } from '../../assets/friendsList/trash.svg';
import FriendsMusic from './friendsMusic';

const Friends = ({ profile, name, email, song, onDelete }) => {
  const [isSlide, setIsSlide] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchX = e.touches[0].clientX;
    const diffX = touchX - startX;

    if (diffX < -50) {
      // 왼쪽으로 50px 이상 드래그 시 슬라이드 활성화
      setIsSlide(true);
    } else if (diffX > 50) {
      // 오른쪽으로 50px 이상 드래그 시 슬라이드 비활성화
      setIsSlide(false);
    }
  };

  return (
    <div
      className="relative h-[100px] pt-[18px] overflow-hidden "
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className={`flex justify-between items-center h-full border-b border-[#D8D8D8] bg-white transition-transform duration-300 ${
          isSlide ? '-translate-x-24' : ''
        }`}
      >
        <div className="flex items-center pl-[17px]">
          {typeof profile === 'string' ? (
            <img
              src={profile}
              alt={name}
              className="w-[63px] h-[63px] rounded-full"
            />
          ) : (
            profile
          )}
          <div className="px-[9px]">
            <div className="font-preSemiBold text-lg">{name}</div>
            <div className="font-preLight text-xs text-[#3F3F3F]">{email}</div>
          </div>
        </div>
        {song === null ? null : <FriendsMusic song={song} />}
      </div>

      {isSlide && (
        <button
          className="absolute right-0 bottom-1 w-[80px] h-[75px] bg-[#FF7272] flex items-center justify-center rounded-[0.625rem]"
          onClick={onDelete}
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

Friends.propTypes = {
  profile: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Friends;
