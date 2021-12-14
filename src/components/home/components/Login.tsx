import { FormEventHandler, useContext, useState } from "react";
import { Button, Center, Input } from "@chakra-ui/react";
import { UserContext } from "../../../App";

const Login = () => {
  const [username, setUsername] = useState("");

  const userContext = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userContext?.setUsername(username);
  };
  return (
    <Center flexDir="column" align="center" py={16}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter username"
          size="lg"
          w={"80%"}
          mb={4}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          colorScheme="orange"
          onClick={() => {
            userContext?.setUsername(username);
          }}
        >
          Login
        </Button>
      </form>
    </Center>
  );
};

export default Login;
