import { React, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const RequestFriends = () => {
  return (
    <div className="fixed inset-0 bg-black/20 z-10 flex justify-center items-end">
      <div className="w-full max-w-[480px] h-[586px] bg-white rounded-[30px] px-[32px] overflow-hidden"></div>
    </div>
  );
};

RequestFriends.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  profileData: PropTypes.object.isRequired,
};

export default RequestFriends;
