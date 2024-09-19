import React, { useState } from 'react';
import { ReactComponent as Uncheck } from '../../assets/todolist/uncheck.svg';
import { ReactComponent as Check } from '../../assets/todolist/check.svg';
import { ReactComponent as Trash } from '../../assets/todolist/trash.svg';
import { customAxios } from '../../api/customAxios';
const token = localStorage.getItem('token');

const TodoItem = ({ id, content, checked, removeTodo }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isSwiped, setIsSwiped] = useState(false);
  const [startX, setStartX] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 30) {
      setIsSwiped(true);
    } else if (diffX < -30) {
      setIsSwiped(false);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const onClick = () => {
    setIsChecked(!isChecked);
    customAxios
      .patch(
        '/todolist/tasks',
        {
          id: id,
          content: content,
          checked: !checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch((error) => {
        console.error('투두리스트 수정 오류', error);
      });
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`transition-transform rounded-xl w-[90%] h-[4.5rem] my-2 mx-auto content-center border 
        ${isChecked ? 'border-blue-100 bg-blue-100' : ''} 
        ${isSwiped ? '-translate-x-24' : ''}`}
      >
        <div className={'flex justify-start'}>
          <div onClick={onClick} className={'w-5 mx-4'}>
            {isChecked ? <Check /> : <Uncheck />}
          </div>
          <p className={'font-semibold tracking-tight'}>{content}</p>
        </div>
      </div>
      <Trash
        height={'4.5rem'}
        className={`absolute right-8 -translate-y-20 transition-opacity ${isSwiped ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => removeTodo(id)}
      />
    </div>
  );
};

export default TodoItem;
