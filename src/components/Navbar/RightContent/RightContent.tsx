import { FunctionComponent } from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";

type RightContentProps = {};

const RightContent: FunctionComponent<RightContentProps> = () => {
  return (
    <>
	    <AuthModal />
      <Flex justify="center" align="center">
         <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
