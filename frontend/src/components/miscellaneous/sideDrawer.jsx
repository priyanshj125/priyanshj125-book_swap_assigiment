// import React, { useState,useEffect } from "react";
// import { Button } from "@chakra-ui/button";
// import { useDisclosure } from "@chakra-ui/hooks";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import {
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/menu";
// import {
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
// } from "@chakra-ui/modal";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { Avatar } from "@chakra-ui/avatar";
// import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory in React Router v6
// import axios from "axios";
// import { useToast } from "@chakra-ui/toast";
// import ChatLoading from "../ChatLoading";
// import { Spinner } from "@chakra-ui/spinner";
// import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";
// import UserListItem from "../userAvtar/UserListItem";
// import { ChatState } from "../context/contextProvider";

// function SideDrawer() {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const token = localStorage.getItem("token");


//   const {
//     setSelectedChat,
//     user,
//     notification,
//     setNotification,
//     chats,
//     setChats,
//   } = ChatState();

//   const toast = useToast();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const navigate = useNavigate(); // useNavigate instead of useHistory

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/"); // Use navigate instead of history.push
//   };

//   const handleSearch = async () => {
//     if (!search) {
//       toast({
//         title: "Please Enter something in search",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top-left",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       // http://www.localhost:5000/api/auth/alluser
//       // console.log(search+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//       // const { data } = await axios.get(`http:localhost:5000/api/auth/alluser?search=`, config);
//       const { data } = await axios.get(`http://www.localhost:5000/api/auth/alluser?search=${search}`, {
//         headers: {
//           "Authorization": token
//         },
//       });

//       console.log("ccccccccccccccalllllllll");
//       console.log(data);
//       setLoading(false);
//       setSearchResult(data);
//     } catch (error) {
//       console.log(error.message);
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Search Results",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };
//   // console.log("user:    "+user);

//   const accessChat = async (userId) => {
//     try {

//       setLoadingChat(true)
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(`http://www.localhost:5000/api/chat`, { userId },  {
//         headers: {
//           "Content-Type":"application/json",
//           "Authorization": token
//         },
//       });
//       // console.log(data+"::: access dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//       // console.log(userId+"access dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//       // console.log(chats+"::: access datazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

//       // if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//       setLoadingChat(false);
//       onClose();
//     } catch (error) {
//       console.error(error);
//       console.log("aaaaaaaaaaaaaaaaaaaa");
//       toast({
//         title: "Error fetching the chat",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   return (
//     <>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bg="white"
//         w="100%"
//         p="5px 10px 5px 10px"
//         borderWidth="5px"
//       >
//         <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
//           <Button variant="ghost" onClick={onOpen}>
//             <i className="fas fa-search"></i>
//             <Text display={{ base: "none", md: "flex" }} px={4}>
//               Search User
//             </Text>
//           </Button>
//         </Tooltip>
//         <Text fontSize="2xl" fontFamily="Work sans">
//           swap-now
//         </Text>
//         <div>
//           <Menu>
//             <MenuButton p={1}>
//               <NotificationBadge
//                 count={notification.length}
//                 effect={Effect.SCALE}
//               />
//               <BellIcon fontSize="2xl" m={1} />
//             </MenuButton>
//             <MenuList pl={2}>
//               {!notification.length && "No New Messages"}
//               {notification.map((notif) => (
//                 <MenuItem
//                   key={notif._id}
//                   onClick={() => {
//                     setSelectedChat(notif.chat);
//                     setNotification(notification.filter((n) => n !== notif));
//                   }}
//                 >
//                   {notif.chat.isGroupChat
//                     ? `New Message in ${notif.chat.chatName}`
//                     : `New Message from ${getSender(user, notif.chat.users)}`}
//                 </MenuItem>
//               ))}
//             </MenuList>
//           </Menu>
//           <Menu>
//             <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
//               <Avatar
//                 size="sm"
//                 cursor="pointer"
//                 name={user.name}
//                 src={user.pic}
//               />
//             </MenuButton>
//             <MenuList>
//               <ProfileModal user={user}>
//                 <MenuItem>My Profile</MenuItem>{" "}
//               </ProfileModal>
//               <MenuDivider />
            
//             </MenuList>
//           </Menu>
//         </div>
//       </Box>

//       <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
//           <DrawerBody>
//             <Box display="flex" pb={2}>
//               <Input
//                 placeholder="Search by name or email"
//                 mr={2}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <Button onClick={handleSearch}>Go</Button>
//             </Box>
//             {loading ? (
//   <ChatLoading /> 
// ) : (
//   searchResult?.map((user) => {
//     // console.log(user + "::::zzzzzzzzzzzzzzzzzzzzzz"); // Correct placement of console.log
//     return (
//       <UserListItem
//         key={user._id}
//         user={user}
//         handleFunction={() => accessChat(user._id)}
//       />
//     );
//   })
// )}
//             {loadingChat && <Spinner ml="auto" display="flex" />}
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }

// export default SideDrawer;
import React, { useState } from "react";
import { Button, Input, Box, Text } from "@chakra-ui/react";
import {
  Menu, MenuButton, MenuDivider, MenuItem, MenuList,
  Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,
  Tooltip, Avatar, Spinner
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import UserListItem from "../userAvtar/UserListItem";
import { ChatState } from "../context/contextProvider";
import { useDisclosure } from "@chakra-ui/react"; // Correct import


function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const token = localStorage.getItem("token");

  const {
    setSelectedChat, user, notification, setNotification, chats, setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://www.localhost:5000/api/auth/alluser?search=${search}`, {
          headers: {
                      "Authorization": token
                    }
      });

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId },
        {
          headers: { Authorization: token },
        }
      );

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px" borderWidth="5px">
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Swap-Now
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge count={notification.length} effect={Effect.SCALE} />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${notif.chat.users[0].name}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
