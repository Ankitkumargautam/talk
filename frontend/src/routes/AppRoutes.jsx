import { Route, Routes } from 'react-router-dom';
import Chatpage from '../Pages/Chatpage';
import Homepage from '../Pages/Homepage';
import PrivateRoutes from '../utils/PrivateRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Homepage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/chats" element={<Chatpage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
