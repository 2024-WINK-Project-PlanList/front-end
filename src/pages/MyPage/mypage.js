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
import { getUserInfo } from '../../api/user';

const MyPage = () => {
  const [profileData, setProfileData] = useState([]);
  const [modalIsOpen, setModalState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setProfileData(data.user);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSaveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  function clickedModifyButton() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  function clickFriends() {
    navigate('/friends');
  }

  function clickPlayList() {
    navigate('/playList');
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        {profileData.profileImagePath ? (
          <img
            src={profileData.profileImagePath}
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
              {profileData?.totalFriendCount || '0명'}
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
        <PlayList onClick={clickPlayList} music={true} />

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
