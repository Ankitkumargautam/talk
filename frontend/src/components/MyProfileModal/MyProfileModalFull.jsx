import { CloseIcon, ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Text } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';
import './MyProfileModal.css';

const MyProfileModalFull = ({ isOpen, openModal, closeModal, user }) => {
  // const { user } = ChatState();
  return (
    <>
      <IconButton
        d={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={openModal}
      />
      {isOpen && (
        <div className="modal-overlay-profile">
          <div className="modal-content-profile">
            <div className="modal-header-profile">
              <span className="modal-title-profile">{user.name}</span>
              <div className="close-button-profile" onClick={closeModal}>
                <CloseIcon />
              </div>
            </div>
            <div className="modal-body-profile">
              <Image
                borderRadius="full"
                boxSize="200px"
                src={user.pic}
                alt={user.name}
              />
            </div>
            <Text> Email: {user.email}</Text>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfileModalFull;
