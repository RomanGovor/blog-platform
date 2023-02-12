import { FunctionComponent } from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User } from "@firebase/auth";
import Icons from "@/components/Navbar/RightContent/Icons";
import UserMenu from "@/components/Navbar/RightContent/UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: FunctionComponent<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
