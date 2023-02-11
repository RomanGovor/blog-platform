import { FunctionComponent } from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "@/components/Navbar/SearchInput";
import RightContent from "@/components/Navbar/RightContent/RightContent";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar: FunctionComponent = () => {
	const [user, loading, error] = useAuthState(auth);

	return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center" flex="auto">
        <Image alt="reddit face" src="/images/redditFace.svg" height="30px" />
        <Image
	        alt="reddit text"
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
	      <SearchInput />
	      <RightContent user={user} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
