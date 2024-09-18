import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfilePic } from '../../assets/mypage/profile.svg';
import { ReactComponent as FriendsIcon } from '../../assets/mypage/friends.svg';
import { ReactComponent as SignIcon } from '../../assets/mypage/sign.svg';
import { ReactComponent as MySentenceIcon } from '../../assets/mypage/mySentence.svg';
import PlayList from '../../components/PlayList/playList';
import ModifyProfile from '../../components/Modal/modifyProfile';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { getUserInfo, modifyUserInfo } from '../../api/user';
import { fetchToken, getTrackById } from '../../api/music';

const MyPage = () => {
  const [profileData, setProfileData] = useState([]);
  const [countFriends, setCountFriends] = useState(0);
  const [modalIsOpen, setModalState] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [token, setToken] = useState('');
  const [songTitle, setSongTitle] = useState(null);
  const [songArtist, setSongArtist] = useState(null);
  const [songTime, setSongTime] = useState(null);
  const [songCover, setSongCover] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

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

  // 프로필 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setProfileData(data.user);
        setCountFriends(data.totalFriendCount);

        if (data.user.profileImagePath) {
          setImagePreview(data.user.profileImagePath);
        }

        if (data.user.songId && token) {
          setLoading(true); // 데이터 로딩 시작
          const trackData = await getTrackById(token, data.user.songId);
          setSongTitle(trackData.name);
          setSongArtist(
            trackData.artists.map((artist) => artist.name).join(', '),
          );
          setSongTime(
            `${Math.floor(trackData.duration_ms / 60000)}:${Math.floor(
              (trackData.duration_ms % 60000) / 1000,
            )
              .toString()
              .padStart(2, '0')}`,
          );
          setSongCover(trackData.album.images[2].url);
          console.log(songTitle);
          console.log(songArtist);
          console.log(songTime);
          console.log(songCover);
          console.log('노래정보', trackData);
          setLoading(false); // 데이터 로딩 완료
        } else {
          setLoading(false); // 데이터가 없더라도 로딩 완료
        }

        console.log('내정보', data);
      } catch (error) {
        console.error('정보불러오기 오류:', error);
        setLoading(false); // 오류 발생 시 로딩 완료
      }
    };

    fetchUserInfo();
  }, [token]);

  // 프로필 수정
  const handleSaveProfile = async (updatedProfile) => {
    try {
      await modifyUserInfo(updatedProfile);

      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...updatedProfile,
      }));

      if (updatedProfile.profileImagePath instanceof File) {
        const imageUrl = URL.createObjectURL(updatedProfile.profileImagePath);
        setImagePreview(imageUrl);
      } else if (updatedProfile.profileImagePath) {
        setImagePreview(updatedProfile.profileImagePath);
      }

      console.log('프로필 수정 성공', updatedProfile);
    } catch (error) {
      console.error('프로필 수정 중 오류 발생', error);
    }
  };

  function clickedModifyButton() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  function clickFriends() {
    navigate('/friends', { state: { userData: profileData.id } });
  }

  function clickPlayList() {
    navigate('/playList');
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="mt-[30px] w-[154px] h-[154px] object-cover rounded-full"
          />
        ) : (
          <ProfilePic className="mt-[30px]" />
        )}
        <div className="text-2xl font-preSemiBold pt-[15px]">
          {profileData?.nickname || '이름 없음'}
        </div>
        <div className="text-base font-preLight text-[#3F3F3F] pt-[7px]">
          {profileData?.email || '이메일 없음'}
        </div>
        <div
          className="flex justify-center items-center text-sm text-white font-preMedium bg-[#6AB6FF] w-[5.8125rem] h-[1.6875rem] rounded-[0.625rem] mt-4"
          onClick={clickedModifyButton}
        >
          내 정보 수정
        </div>
        <div
          onClick={clickFriends}
          className="flex justify-between items-center w-[22rem] h-[3.0625rem] rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-6 pl-[22px] pr-[16px]"
        >
          <div className="flex items-center">
            <FriendsIcon />
            <div className="font-preRegular pl-[6px]">내 친구</div>
          </div>
          <div className="flex items-center">
            <div className="font-preSemiBold text-xl text-[#5DA4E7] pr-[17px]">
              {countFriends}명
            </div>
            <SignIcon />
          </div>
        </div>
        <div className="flex justify-between items-center w-[22rem] h-[3.0625rem] rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-6 pl-[22px] pr-[16px]">
          <div className="flex items-center">
            <MySentenceIcon />
            <div className="font-preRegular pl-[6px]">나의 한마디</div>
          </div>
          <div className="font-preLight text-sm max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
            {profileData?.comment || '한마디 없음'}
          </div>
        </div>
        <div className="w-full pb-[13px] pt-[33px] pl-[33px] font-preSemiBold text-xl">
          나의 PlayList
        </div>
        {loading ? (
          <div className="flex justify-center items-center w-full h-[200px] text-xl">
            음악 로딩중...
          </div>
        ) : (
          <PlayList
            onClick={clickPlayList}
            music={!!profileData?.songId}
            title={songTitle}
            artist={songArtist}
            time={songTime}
            cover={songCover}
          />
        )}

        {modalIsOpen && (
          <ModifyProfile
            onClose={closeModal}
            onSave={handleSaveProfile}
            profileData={profileData}
          />
        )}
      </div>
      {!modalIsOpen && <Footer />}
    </>
  );
};

export default MyPage;
