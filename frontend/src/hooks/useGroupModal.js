import { useState } from 'react';

const useModalGroup = () => {
  const [isOpenGroup, setIsOpenGroup] = useState(false);

  const openModalGroup = () => {
    setIsOpenGroup(true);
    console.log('Modal opened: ', isOpenGroup);
  };

  const closeModalGroup = () => {
    console.log('Modal closed');
    setIsOpenGroup(false);
  };

  return {
    isOpenGroup,
    openModalGroup,
    closeModalGroup,
  };
};

export default useModalGroup;
