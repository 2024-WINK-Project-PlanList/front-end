import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ReactComponent as Calendar } from '../../assets/footer/calendar.svg';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

const CreateTodoItem = ({ hideModal, addTodo, date }) => {
  const [text, setText] = useState('');
  const [isClose, setIsClose] = useState(false);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const navigate = useNavigate();

  const fixedDate = dayjs(
    `20${date[0] + date[1]}-${date[2] + date[3]}-${date[4] + date[5]}`,
  );

  const closeModal = () => {
    setIsClose(true);
    setTimeout(() => {
      hideModal();
    }, 150);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onClick = () => {
    if (text) {
      addTodo(text);
      closeModal();
    }
  };

  return (
    <div className={'tracking-tighter'}>
      <div
        className={'fixed inset-0 bg-black/50 z-10'}
        onClick={closeModal}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-p h-[500px] bg-white rounded-t-3xl z-20 ${isClose ? 'animate-[bottom-sheet-down_200ms_ease-in-out]' : 'animate-[bottom-sheet-up_200ms_ease-in-out]'}`}
      >
        <div>
          <div className={'p-8 font-bold text-lg'}>어떤 할 일이 있나요?</div>
          <div className={'border-b-[1px] border-black mx-10 pb-1 text-sm'}>
            <input
              className={'mx-4 focus:outline-none'}
              placeholder={'할 일 명을 입력하세요'}
              value={text}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <div className={'p-8 font-bold text-lg'}>언제 해야 하나요?</div>
          <div
            className={
              'border-b-[1px] border-black mx-10 flex justify-between items-center'
            }
          >
            <a className={'mx-4 tracking-widest text-sm'}>
              {fixedDate.format('YYYY/MM/DD')}({days[fixedDate.format('d')]})
            </a>
            <div>
              <DatePicker
                selected={new Date(fixedDate.format('YYYY-MM-DD'))}
                onChange={(date) =>
                  navigate(`/todolist/${dayjs(date).format('YYMMDD')}`)
                }
                locale={ko}
                customInput={
                  <Calendar
                    fill={'black'}
                    width={'25px'}
                    height={'25px'}
                    className={'my-1 mx-3'}
                  />
                }
                calendarContainer={({ className, children }) => {
                  return (
                    <div className={'-translate-x-20'}>
                      <CalendarContainer className={className}>
                        {children}
                      </CalendarContainer>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`mx-auto mt-20 h-14 text-center rounded-xl w-4/6 content-center text-lg ${text ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-500'}`}
          onClick={onClick}
        >
          <a>할 일 추가</a>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoItem;
