import PropTypes from 'prop-types';
import { ReactComponent as Music } from '../../assets/friendsList/music.svg';
import { fetchToken, getTrackById } from '../../api/music';
import { useEffect, useState } from 'react';

const FriendsMusic = ({ song }) => {
  const [token, setToken] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');

  // spotify token 가져오기
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchToken();
        setToken(token);
        console.log('spotify 토큰', token);
      } catch (error) {
        console.error('토큰 에러 발생:', error);
      }
    };

    getToken();
  }, []);

  // 음악 정보 가져오기
  useEffect(() => {
    const fetchMusicInfo = async () => {
      if (!token || !song) return;

      try {
        const trackData = await getTrackById(token, song);
        setSongTitle(trackData.name);
        setSongArtist(
          trackData.artists.map((artist) => artist.name).join(', '),
        );
      } catch (error) {
        console.error('음악 정보 불러오기 오류:', error);
      }
    };

    fetchMusicInfo();
  }, [token, song]);

  const displayText =
    songTitle && songArtist ? `${songTitle} - ${songArtist}` : '음악 정보 없음';

  return (
    <div className="overflow-hidden flex items-center w-[150px] h-[27px] border border-[#E8E8E8] rounded-lg px-[9px] py-[7px] mr-[7px]">
      <Music />
      <div className="font-preRegular text-xs pl-[7px] w-[111px] overflow-hidden text-ellipsis whitespace-nowrap">
        {displayText}
      </div>
    </div>
  );
};

FriendsMusic.propTypes = {
  song: PropTypes.string.isRequired,
};

export default FriendsMusic;
