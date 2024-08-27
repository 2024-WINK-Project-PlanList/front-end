import React from 'react';
import PropTypes from 'prop-types';
// import { ReactComponent as ProfilPic } from '../../assets/friendsList/profilePic.svg';
import { ReactComponent as Music } from '../../assets/friendsList/music.svg';

const Friends = ({ profile, name, email, song }) => {
  return (
    <div className="flex justify-between items-center h-[100px] mt-[18px] border-b border-[#D8D8D8]">
      <div className="flex items-center pl-[17px]">
        {typeof profile === 'string' ? (
          <img src={profile} alt={name} className="w-[63px] h-[63px]" />
        ) : (
          profile
        )}
        <div className="pl-[9px]">
          <div className="font-preSemiBold text-lg">{name}</div>
          <div className="font-preLight text-xs text-[#3F3F3F]">{email}</div>
        </div>
      </div>

      <div className="overflow-hidden flex items-center w-[150px] h-[27px] border border-[#E8E8E8] rounded-lg px-[9px] py-[7px] mr-[7px]">
        <Music />
        <div className="font-preRegular text-xs pl-[7px] w-[111px] overflow-hidden text-ellipsis whitespace-nowrap">
          {song}
        </div>
      </div>
    </div>
  );
};

Friends.propTypes = {
  profile: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
};
export default Friends;
