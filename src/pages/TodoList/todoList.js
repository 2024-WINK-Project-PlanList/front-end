import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Modal from '../../components/Modal/createTodoItem';
import Days from '../../components/TodoList/Days';
import TodoItem from '../../components/TodoList/TodoItem';

const TodoList = () => {
  const [isShow, setShow] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const nextId = useRef(1);
  const date = useParams().date;

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const addTodo = (text) => {
    const todoItem = { id: nextId.current, text: text };
    setTodoItems([...todoItems, todoItem]);
    nextId.current += 1;
  };

  const removeTodo = (id) => {
    setTodoItems(todoItems.filter((todoItem) => todoItem.id !== id));
  };

  const todoExist = [
    false,
    false,
    false,
    Boolean(todoItems.length),
    false,
    false,
    false,
  ];

  return (
    <div className={'select-none'}>
      <Header onClick={showModal} />
      <div>
        <Days date={date} todoExist={todoExist} />
        {todoItems.length ? (
          <div className={'h-10'} />
        ) : (
          <div className={'text-center font-bold py-16'}>
            오늘의 할 일을 추가해주세요
          </div>
        )}
        <div>
          {todoItems.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
      {isShow && <Modal hideModal={hideModal} addTodo={addTodo} date={date} />}
      <Footer />
    </div>
  );
};
export default TodoList;
