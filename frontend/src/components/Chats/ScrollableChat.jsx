import { Avatar, Tooltip } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';

const ScrollableChat = () => {
  return (
    <ScrollableFeed>
      <Tooltip label="ankit" placement="bottom-start" hasArrow>
        <Avatar
          mt="7px"
          mr={1}
          size="sm"
          cursor="pointer"
          name="ankit"
          src="http://res.cloudinary.com/dhnnj0xby/image/upload/v1705677294/xosmtm74zfynthda70vl.png"
        />
      </Tooltip>
      <span
        style={{
          backgroundColor: '#BEE3F8',
          borderRadius: '20px',
          padding: '5px 15px',
          maxWidth: '75%',
        }}
      >
        Hi there
      </span>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
