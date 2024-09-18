import React from 'react';

const ChooseImageModal = ({ isOpen, onClose, onImageSelect }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(file);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
      onClick={onClose}
    >
      <div
        className="w-full px-4 pb-8"
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#F2F2F2] rounded-lg shadow">
          <div className="mb-4 p-2">
            <div className="text-center">
              <span className="block text-[#787878] text-xs mb-2">
                프로필 사진 설정
              </span>
              <div className="border-t border-[#D5D5D5] absolute inset-x-0 top-8"></div>
              <button
                className="w-full py-4 text-[#1E86FF] bg-[#F2F2F2] rounded-lg mt-1"
                onClick={() => document.getElementById('imageInput').click()}
              >
                앨범에서 사진 선택
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            className="w-full p-4 text-[#1E86FF] bg-white rounded-lg shadow"
            onClick={onClose}
          >
            취소
          </button>
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChooseImageModal;
