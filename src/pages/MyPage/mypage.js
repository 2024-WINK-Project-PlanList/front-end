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
import { fetchToken } from '../../api/music';
import { getTrackById } from '../../api/music';

const MyPage = () => {
  const [profileData, setProfileData] = useState([]);
  const [countFriends, setCountFriends] = useState(0);
  const [modalIsOpen, setModalState] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  // const [token, setToken] = useState('');
  // const [songTitle, setSongTitle] = useState(null);
  // const [songArtist, setSongArtist] = useState(null);
  // const [songTime, setSongTime] = useState(null);

  // spotify token 가져오기
  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const token = await fetchToken();
  //       setToken(token);
  //       console.log('토큰이왓서요', token);
  //     } catch (error) {
  //       console.error('토큰 에러 발생:', error);
  //     }
  //   };
  //
  //   getToken();
  // }, []);

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

        // if (data.user.songId && token) {
        //   const trackData = await getTrackById(token, data.user.songId);
        //   setSongTitle(trackData.name);
        //   setSongArtist(trackData.artist.name);
        //   setSongTime(trackData.duration_ms);
        //   console.log('노래정보', trackData);
        //   console.log('송인포에뇨', songTitle);
        //   console.log(songArtist);
        //   console.log(songTime);
        // }

        console.log('내정보', data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

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
        <PlayList onClick={clickPlayList} music={!!profileData?.songId} />

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
