import { ViewIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
  Image,
  Text,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';

const ProfileModal = ({ user, children }) => {
  // const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}> {children}</span>
      ) : (
        <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} /> //this is eye button
      )}

      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text> Email: {user.email}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
