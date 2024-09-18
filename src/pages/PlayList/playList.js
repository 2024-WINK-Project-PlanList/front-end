import React, { useState, useEffect } from 'react';
import { ReactComponent as Glass } from '../../assets/friendsList/magnifyingGlass.svg';
import Song from '../../components/PlayList/song';
import { ReactComponent as Cover } from '../../assets/playList/noCover.svg';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { fetchToken, searchTracks, modifySong } from '../../api/music';

const PlayList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');
  const [findMusic, setFindMusic] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchToken();
        setToken(token);
      } catch (error) {
        console.error('토큰 에러 발생:', error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (searchInput === '') {
      setFindMusic([]);
    } else {
      const fetchSongs = async () => {
        try {
          if (token) {
            const tracks = await searchTracks(token, searchInput);
            setFindMusic(tracks);
            console.log(tracks);
          }
        } catch (error) {
          console.error('검색 에러 발생:', error);
        }
      };

      fetchSongs();
    }
  }, [searchInput, token]);

  const getValue = (e) => {
    setSearchInput(e.target.value);
  };

  const selectSong = async (songId) => {
    try {
      await modifySong({ songId });
      alert('나만의 playList가 변경되었습니다.');
      console.log(songId);
    } catch (error) {
      console.error('노래 변경 오류 발생', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col overflow-y-auto items-center font-preRegular pt-[26px] pb-[5.875rem]">
        <div className="relative w-full px-[24px]">
          <input
            placeholder="노래, 아티스트 검색"
            onChange={getValue}
            className="w-full h-[45px] pl-[50px] bg-[#D9D9D9]/50 rounded-[0.625rem] text-base"
          />
          <Glass className="absolute bottom-[12px] left-[40px] w-[20px] h-[20px] fill-[#3F3F3F]" />
        </div>
        <div className="w-full px-[19px]">
          {searchInput === '' && findMusic.length === 0 ? (
            <div className="flex justify-center font-preRegular text-xl pt-[73px]">
              나만의 플레이리스트 찾아보세요!
            </div>
          ) : findMusic.length === 0 ? (
            <div className="flex justify-center font-preRegular text-xl pt-[73px]">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid gap-y-[6px] pt-[18px]">
              {findMusic.map((track) => (
                <Song
                  key={track.id}
                  onClick={() => selectSong(track.id)}
                  cover={
                    <img
                      src={track.album.images[2]?.url || Cover}
                      alt="cover"
                    />
                  }
                  title={track.name}
                  artist={track.artists.map((artist) => artist.name).join(', ')}
                  time={
                    Math.floor(track.duration_ms / 60000) +
                    ':' +
                    Math.floor((track.duration_ms % 60000) / 1000)
                      .toString()
                      .padStart(2, '0')
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PlayList;
