export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
    console.log(user+" isSameSenderMarginaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  
  export const getSender = (loggedUser, users) => {
    if (users && users.length > 0) {
      return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
      // return  users._id == loggedUser.user.id ? loggedUser.name : users.name;
      // console.log(users[1] + " is alreadyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      // console.log(JSON.stringify(users));
    } else {
      console.log(JSON.stringify(users._id));
      console.log("aaaaaa");
      console.log(JSON.stringify(loggedUser.user.id));
      console.log("aaaaaa");

      console.log("Users array is empty or undefined");
    }
    

    return true
  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };