import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { getSender } from '../../utils/ChatLogics';

const Navbar = ({
  openModal,
  openModalDrawer,
  notification,
  setNotification,
}) => {
  const navigate = useNavigate();
  const { user, setSelectedChat } = ChatState();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px "
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={() => openModalDrawer()}>
            <i className="fas fa-search"></i>
            <Text d={{ base: 'none', md: 'flex' }} px={4}>
              Search modal
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Chat's Up
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && 'No New Messages'}

              {notification?.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `new msg in ${notif.chat.chatName}`
                    : `New msg from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              {/* <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider /> */}
              <MenuItem onClick={() => openModal()}>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default Navbar;
