import { FunctionComponent } from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";

type RightContentProps = {
  user: any;
};

const RightContent: FunctionComponent<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <div>This user</div> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;
