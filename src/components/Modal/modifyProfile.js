import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ProfilePic } from '../../assets/mypage/profile.svg';
import { ReactComponent as PicChange } from '../../assets/mypage/picChange.svg';
import { ReactComponent as Pencil } from '../../assets/mypage/pencil.svg';

const ModifyProfile = ({ onClose, onSave, profileData }) => {
  const [text, setText] = useState(profileData.comment || '');
  const [name, setName] = useState(profileData.nickname || '');
  const [uploadedImage, setUploadedImage] = useState(
    profileData.profileImagePath,
  );
  const [previewUrl, setPreviewUrl] = useState(profileData.profileImagePath);
  const fileInputRef = useRef(null);
  const maxLength = 30;
  const [isClose, setIsClose] = useState(false);

  const handleChangeBio = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSave = () => {
    setIsClose(true);
    setTimeout(() => {
      onSave({
        nickname: name,
        comment: text,
        profileImagePath: uploadedImage,
        songId: profileData.songId,
      });
      onClose();
    }, 150);
  };

  const handleCancel = () => {
    // 취소 시 애니메이션 실행 후 onClose 호출
    setIsClose(true);
    setTimeout(() => {
      onClose();
    }, 150); // 애니메이션 시간에 맞춰서 setTimeout 조정
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-10 flex justify-center items-end">
      <div
        className={`w-full max-w-[480px] mx-auto h-[826px] bg-white rounded-t-[30px] px-[32px] overflow-hidden ${isClose ? 'animate-[bottom-sheet-down_200ms_ease-in-out]' : 'animate-[bottom-sheet-up_200ms_ease-in-out]'}`}
      >
        <div className="flex justify-between pt-[16px]">
          <div onClick={handleCancel} className="font-preMedium text-lg">
            취소
          </div>
          <div
            onClick={handleSave}
            className="font-preMedium text-lg text-[#4584FF]"
          >
            수정
          </div>
        </div>
        <div
          onClick={handleProfilePicClick}
          className="relative flex justify-center items-center pt-[73px] cursor-pointer"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="프로필"
              className="w-[154px] h-[154px] object-cover rounded-full"
            />
          ) : (
            <ProfilePic />
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={onChangeImage}
            accept="image/*"
          />
          <PicChange className="absolute bottom-[13px] right-[110px]" />
        </div>
        <div className="relative">
          <input
            value={name}
            onChange={handleChangeName}
            maxLength="10"
            className="w-full h-[50px] rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-[31px] px-[19px] font-preRegular"
          />
          <Pencil className="absolute bottom-[17px] right-[17px]" />
        </div>
        <div className="flex justify-between items-center h-[50px] rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-[20px] px-[19px] font-preRegular">
          {profileData.email}
        </div>
        <div className="relative">
          <textarea
            onChange={handleChangeBio}
            value={text}
            maxLength="30"
            className="w-full h-[134px] resize-none rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-[20px] pl-[19px] pr-[74px] pt-[18px] font-preRegular"
          />
          <Pencil className="absolute top-[40px] right-[17px]" />
          <div className="absolute bottom-[15px] right-[17px] font-preLight text-sm text-[#676767]">
            {text.length}/{maxLength}
          </div>
        </div>
      </div>
    </div>
  );
};

ModifyProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  profileData: PropTypes.object.isRequired,
};

export default ModifyProfile;
