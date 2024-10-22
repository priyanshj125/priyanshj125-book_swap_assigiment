import { Box } from "@chakra-ui/layout";
import { useState,useEffect } from "react";
import { ChatState } from "../../components/context/contextProvider";
import SideDrawer from "../../components/miscellaneous/sideDrawer";
import ChatBox from "../../components/chatBox.jsx";
import MyChats from "../../components/myChats.jsx";
import { useNavigate } from "react-router-dom";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token')==	undefined) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ width: "100%" }}>
       {user && <SideDrawer/>}

      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage; 