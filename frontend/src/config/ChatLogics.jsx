export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
   
  
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
   
    try {
      
      if (users && users.length > 0) {
  
        console.log(users);
        return users[0]?._id === loggedUser.user?.id ? users[1].name : users[0].name;
       
      } else {
        console.log(JSON.stringify(users._id));
        console.log("aaaaaa");
        console.log(JSON.stringify(loggedUser.user.id));
        console.log("aaaaaa");
  
        console.log("Users array is empty or undefined");
      }
  
      return true
    } catch (error) {
      window.location.reload(); 
      
    }
  };
  export const getSender2= (loggedUser, users) => {
   
    try {
      
      if (users && users.length > 0) {
  
        console.log(users);
        return users[0]?._id === loggedUser.user?.id ? users[0].name : users[1].name;
       
      } else {
        console.log(JSON.stringify(users._id));
        console.log("aaaaaa");
        console.log(JSON.stringify(loggedUser.user.id));
        console.log("aaaaaa");
  
        console.log("Users array is empty or undefined");
      }
  
      return true
    } catch (error) {
      window.location.reload(); 
      
    }
  };
  export const getSenderProfilePic = (loggedUser, users) => {
    try {
      
      console.log("aaaaaaaaaa");
      // console.log(JSON.stringify(users, null, 2));
      console.log(users[0].pic );
      console.log("aaaaaaaaaa");
      return users[0]._id === loggedUser._id ? users[0].pic : users[1].pic;
    } catch (error) {
      if(!users){
      window.location.reload();} 
    }
  };
  
  
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[0] : users[1];
  };