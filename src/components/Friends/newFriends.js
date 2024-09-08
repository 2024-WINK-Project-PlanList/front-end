import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewFriends = ({ profile, name, email }) => {
  const [isCliked, setIsCliked] = useState(false);

  const btnCliked = () => {
    setIsCliked(!isCliked);
  };

  return (
    <div className="relative h-[42px] overflow-hidden">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center pl-[7px]">
          {typeof profile === 'string' ? (
            <img src={profile} alt={name} className="w-[35px] h-[37px]" />
          ) : (
            profile
          )}
          <div className="px-[8px]">
            <div className="font-preRegular text-sm">{name}</div>
            <div className="font-preRegular text-[10px] text-[#787878]">
              {email}
            </div>
          </div>
        </div>
        <div
          onClick={btnCliked}
          className={`flex justify-center items-center text-xs font-preMedium w-[3.3125rem] h-[1.41963rem] rounded-[0.3125rem] ${isCliked ? 'text-[#9E9E9E] bg-[#E7E7E7]' : 'text-white bg-[#6AB6FF]'}`}
        >
          요청
        </div>
      </div>
    </div>
  );
};

NewFriends.propTypes = {
  profile: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default NewFriends;
