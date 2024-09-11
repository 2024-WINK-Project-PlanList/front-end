import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactComponent as ColorMoveIcon } from '../../assets/mainpage/colormove.svg';

// SortableItem 컴포넌트를 생성하여 각 항목을 드래그할 수 있게 설정
const SortableItem = ({ id, color, onClick, selectedColor }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center mb-[2%]"
    >
      <div
        className={`w-[87%] h-6 rounded-2xl cursor-pointer ml-2 ${
          color === selectedColor ? 'ring-2 ring-blue-500' : ''
        }`}
        style={{
          backgroundColor: color,
        }}
        // 클릭 이벤트를 분리하여 설정
        onClick={() => onClick(color)}
      />
      <div className="ml-2" {...listeners}>
        <ColorMoveIcon />
      </div>
    </div>
  );
};

const ColorSelectModal = ({ isOpen, onClose, onSelectColor }) => {
  const [colors, setColors] = useState(['#98CCFF', '#FF9898', '#D2FF98']);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  if (!isOpen) return null;

  const handleOnDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setColors((prevColors) => {
        const oldIndex = prevColors.indexOf(active.id);
        const newIndex = prevColors.indexOf(over.id);
        return arrayMove(prevColors, oldIndex, newIndex);
      });
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color); // 선택한 색상을 상태로 업데이트
    onSelectColor(color); // 부모 컴포넌트에 선택한 색상 전달
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-xs h-[50vh] mx-4 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '80%', maxWidth: '365px', height: '70vh' }}
      >
        <div className="p-4 flex-1">
          <h2 className="text-base font-semibold mb-4 ml-2 mt-3">현재 색상</h2>
          <div
            className="w-[95%] h-6 rounded-2xl cursor-pointer ml-2 mb-4"
            style={{ backgroundColor: selectedColor }}
          />
          <div className="text-sm text-gray-500 mb-2 ml-2">색상 목록</div>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleOnDragEnd}
          >
            <SortableContext
              items={colors}
              strategy={verticalListSortingStrategy}
            >
              {colors
                .filter((color) => color !== selectedColor) // 선택된 색상 제외
                .map((color) => (
                  <SortableItem
                    key={color}
                    id={color}
                    color={color}
                    onClick={handleColorSelect} // 한 번 클릭으로 색상 선택
                    selectedColor={selectedColor} // 선택된 색상 반영
                  />
                ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className="flex justify-between p-4">
          <button
            className="text-gray-500 hover:text-gray-700 ml-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 mr-2"
            onClick={onClose}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelectModal;
