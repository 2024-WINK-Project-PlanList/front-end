import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactComponent as ColorMoveIcon } from '../../assets/mainpage/colormove.svg';

const ColorSelectModal = ({ isOpen, onClose, onSelectColor }) => {
  const [colors, setColors] = useState(['#98CCFF', '#FF9898', '#D2FF98']);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  if (!isOpen) return null;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(colors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColors(items);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="colors">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {colors
                    .filter((color) => color !== selectedColor)
                    .map((color, index) => (
                      <Draggable key={color} draggableId={color} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center"
                          >
                            <div
                              className="w-[87%] h-6 rounded-2xl cursor-pointer ml-2"
                              style={{
                                backgroundColor: color,
                                ...provided.draggableProps.style,
                              }}
                              onClick={() => handleColorSelect(color)}
                            />
                            <div className="ml-2" {...provided.dragHandleProps}>
                              <ColorMoveIcon />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelectModal;
