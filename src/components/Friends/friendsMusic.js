import PropTypes from 'prop-types';
import { ReactComponent as Music } from '../../assets/friendsList/music.svg';

const FriendsMusic = ({ song }) => {
  return (
    <div className="overflow-hidden flex items-center w-[150px] h-[27px] border border-[#E8E8E8] rounded-lg px-[9px] py-[7px] mr-[7px]">
      <Music />
      <div className="font-preRegular text-xs pl-[7px] w-[111px] overflow-hidden text-ellipsis whitespace-nowrap">
        {song}
      </div>
    </div>
  );
};

FriendsMusic.propTypes = {
  song: PropTypes.string.isRequired,
};

export default FriendsMusic;
