import React from 'react';
import { ReactComponent as Plus } from '../../assets/plus.svg';

function showModal() {
  alert('Modal is shown!');
}

const Header = ({ location }) => {
  switch (location) {
    case 'todolist':
      return (
        <div className={'pt-20'}>
          <header className={'fixed top-0 bg-white'} style={{ width: '480px' }}>
            <div className={'flex justify-between items-center py-4'}>
              <div className={'w-14'}></div>
              <div className={'font-semibold text-2xl'}>TodoList</div>
              <div onClick={showModal}>
                <Plus
                  className={'mr-5'}
                  width={'2.3rem'}
                  height={'2.3rem'}
                  stroke={'#000000'}
                />
              </div>
            </div>
            <div className="border mx-2" />
          </header>
        </div>
      );
  }
};

export default Header;
