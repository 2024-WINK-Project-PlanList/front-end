import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Modal from '../../components/Modal/createTodoItem';
import Days from '../../components/TodoList/Days';
import TodoItem from '../../components/TodoList/TodoItem';
import { customAxios } from '../../api/customAxios';
const token = localStorage.getItem('token');

const TodoList = () => {
  const [isShow, setShow] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [todoExist, setTodoExist] = useState(new Array(7).fill(false));
  const date = useParams().date;

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const addTodo = () => {
    setTodoItems([...todoItems, { id: 1 }]);
  };

  const removeTodo = (id) => {
    setTodoItems([...todoItems, { id: 1 }]);
    customAxios
      .delete(`/todolist/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error('투두리스트 삭제 오류', error);
      });
  };

  useEffect(() => {
    setTodoExist(new Array(7).fill(false));
    customAxios
      .get('/todolist/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodoItems(response.data);
        let day = dayjs(`20${date}`);
        response.data.forEach((item) => {
          let diff = dayjs(item.date).diff(day, 'day');
          if (Math.abs(diff) <= 3) {
            setTodoExist((prevItems) => {
              const newItems = [...prevItems];
              newItems[3 + diff] = true;
              return newItems;
            });
          }
        });
      })
      .catch((error) => {
        console.error('투두리스트 조회 오류', error);
      });
  }, [date, todoItems.length]);

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
          {todoItems
            .filter((todo) => dayjs(todo.date).format('YYMMDD') === date)
            .map((todo) => (
              <TodoItem key={todo.id} removeTodo={removeTodo} {...todo} />
            ))}
        </div>
      </div>
      {isShow && <Modal hideModal={hideModal} addTodo={addTodo} date={date} />}
      <Footer />
    </div>
  );
};
export default TodoList;
