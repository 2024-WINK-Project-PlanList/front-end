import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Music } from '../../assets/mypage/music.svg';
import { ReactComponent as Pause } from '../../assets/mypage/pause.svg';
import { ReactComponent as PlayBack } from '../../assets/mypage/play-back.svg';
import { ReactComponent as PlayForward } from '../../assets/mypage/play-forward.svg';

const PlayList = ({ onClick, music }) => {
  return (
    <div onClick={onClick} className="px-[39px] w-full">
      {music === false ? (
        <div className="flex justify-center items-center h-[183px] rounded-[0.625rem] font-preRegular border-[0.5px] border-[#D5D5D5]">
          나만의 PlayList를 설정해주세요
        </div>
      ) : (
        <div className="h-[183px] rounded-[0.625rem] bg-[#ECF5FF] drop-shadow-[4px_4px_6px_rgba(0,0,0,0.25)]">
          <div className="flex items-center pl-[20px] pt-[18px] justify-between">
            <div className="flex items-center">
              <div className="w-[67px] h-[67px] rounded-[0.625rem] bg-[#D9D9D9]"></div>
              <div className="flex-col pl-[12px]">
                <div className="font-preMedium ">JASMINE</div>
                <div className="font-preLight text-sm text-[#676767]">
                  DPR LIVE
                </div>
              </div>
            </div>
            <div className="pr-[28px]">
              <Music />
            </div>
          </div>
          <div className="flex justify-center items-center text-xs pt-[12px]">
            <div className="text-[#676767] pr-[5px]">00:45</div>
            <div className="relative w-[239px] h-[8px] rounded-[0.625rem] bg-[#D1D1D1]">
              <div className="absolute w-[79px] h-[8px] rounded-l-[0.625rem] bg-[#676767]"></div>
            </div>
            <div className="text-[#B3B3B3] pl-[5px]">- 03:16</div>
          </div>
          <div className="flex justify-between items-center pt-[23px] px-[89px]">
            <PlayBack />
            <Pause />
            <PlayForward />
          </div>
        </div>
      )}
    </div>
  );
};

PlayList.propTypes = {
  music: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayList;
