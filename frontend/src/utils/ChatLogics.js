export const getSender = (user, users) => {
  return users[0]?._id === user?._id ? users[1]?.name : user[0]?.name;
};

export const getSenderFull = (user, users) => {
  return users[0]._id === user._id ? users[1] : user[0];
};
