import React from "react";
import axios from "../config/axios";
import {
  Button,
  Grid,
  List,
  ListItem,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Link,
  Spacer,
  Image,
  VStack,
  Progress,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const MilestoneTable = () => {
  const [milestones, setMilestones] = React.useState([]);

  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    axios
      .post("/milestones", { user: user.id })
      .then((res) => {
        return setMilestones(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      minH={"100vh"}
      bgGradient="linear(black,#9d39fe)"
      h="100%"
      w="100%"
      p={[8, 10]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <HStack mb={"20%"} spacing={"20%"}>
        <Link href="/logged/homeuser">
          <Image
            boxSize="40px"
            objectFit="cover"
            src="/banana.png"
            alt="Itesa Coin"
          />{" "}
        </Link>{" "}
        <Heading m={"auto"} ml="26%" color={"#E5EB2F"}>
          {" "}
          Milestones{" "}
        </Heading>
      </HStack>
      <>
        <Table variant="simple" size={"xl"} color={"white"}>
          <Thead>
            <Tr>
              <Th fontSize={"lg"} color={"#E5EB2F"}>
                Nombre
              </Th>
              <Th fontSize={"lg"} color={"#E5EB2F"}>
                Descripcion
              </Th>
              <Th fontSize={"lg"} color={"#E5EB2F"}>
                Tokens
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"transparent"}>
            {milestones.length > 0 ? (
              milestones.map((miles, i) => {
                if (miles.completed) {
                  return (
                    <Tr key={i}>
                      <Td fontWeight={"extrabold"} color={"#2ad37c"}>
                        {miles.name}
                      </Td>
                      <Td color={"#2ad37c"}>{miles.desc} </Td>
                      <Td isNumeric color={"#2ad37c"}>
                        {miles.tokenAmount}
                      </Td>
                    </Tr>
                  );
                } else {
                  return (
                    <Tr key={i}>
                      <Td fontWeight={"extrabold"} color={"#DE5A3F"}>
                        {miles.name}
                      </Td>
                      <Td color={"#DE5A3F"}>{miles.desc} </Td>
                      <Td color={"#DE5A3F"} isNumeric>
                        {miles.tokenAmount}
                      </Td>
                    </Tr>
                  );
                }
              })
            ) : (
              <Tr>
                <Td>Empty</Td>
                <Td>Empty </Td>
                <Td isNumeric>0</Td>
              </Tr>
            )}
          </Tbody>
          <TableCaption
            margin={"auto"}
            ml="-5%"
            fontSize={"xl"}
            fontWeight="extrabold"
            color={"#E5EB2F"}
          >
            Conviertete en el primero de tus amigos en completar todos los
            milestones!
          </TableCaption>
        </Table>
      </>
      <Spacer color={"#4C1281"}>.</Spacer>
      <Spacer color={"#4C1281"}>.</Spacer>
      <Spacer color={"#4C1281"}>.</Spacer>
      {/* <Text color={"white"}> Progreso de milestones:</Text> */}
      {/* <Progress
        mb={"20%"}
        hasStripe
        colorScheme={"whatsapp"}
        isAnimated
        size="md"
        value={40}
      /> */}
      <Navbar />
    </Box>
  );
};

export default MilestoneTable;
