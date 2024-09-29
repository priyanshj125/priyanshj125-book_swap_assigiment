import React, { useState } from "react";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../components/context/contextProvider";
import { Box } from "@chakra-ui/layout";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();
  return (
    <>
     <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
    </>
  );
}


export default ChatBox;
