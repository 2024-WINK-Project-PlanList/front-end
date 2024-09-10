import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Song = ({ cover, title, artist, time }) => {
  const [isCliked, setIsCliked] = useState(false);

  const btnCliked = () => {
    setIsCliked(!isCliked);
  };

  return (
    <div className="relative h-[100px] border-b border-[#D8D8D8] overflow-hidden pl-[21px] pr-[15px]">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          {typeof cover === 'string' ? (
            <img
              src={cover}
              alt={artist}
              style={{ width: '55px', height: '55px' }}
              className="w-[55px] h-[55px]"
            />
          ) : (
            cover
          )}
          <div className="px-[13px]">
            <div className="font-preSemiBold text-base pb-[4px]">{title}</div>
            <div className="font-preLight text-sm text-[#3F3F3F]">
              {artist} • {time}
            </div>
          </div>
        </div>
        <div
          onClick={btnCliked}
          className={`flex justify-center items-center text-xs font-preMedium w-[3.9375rem] h-[1.6875rem] rounded-[0.3125rem] ${isCliked ? 'text-[#9E9E9E] bg-[#E7E7E7]' : 'text-white bg-[#6AB6FF]'}`}
        >
          선택
        </div>
      </div>
    </div>
  );
};

Song.propTypes = {
  cover: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Song;
