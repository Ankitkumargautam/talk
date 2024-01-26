import { useState } from 'react';

const useSideDrawer = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const openModalDrawer = () => {
    setIsOpenDrawer(true);
    console.log('Modal opened: ', isOpenDrawer);
  };

  const closeModalDrawer = () => {
    console.log('Modal closed');
    setIsOpenDrawer(false);
  };

  return {
    isOpenDrawer,
    openModalDrawer,
    closeModalDrawer,
  };
};

export default useSideDrawer;
