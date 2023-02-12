import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
	Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { signOut, User } from "@firebase/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/firebase/clientApp";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: FunctionComponent<UserMenuProps> = ({ user }) => {
	const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
	            <>
		            <Icon
			            fontSize={24}
			            mr={1}
			            color="gray.300"
			            as={FaRedditSquare}
		            />
		            <Box
			            display={{ base: "none", lg: "flex" }}
			            flexDirection="column"
			            fontSize="8pt"
			            alignItems="flex-start"
			            mr={8}
		            >
			            <Text fontWeight={700}>
				            {user?.displayName || user?.email?.split("@")[0]}
			            </Text>
			            <Flex alignItems="center">
				            <Icon as={IoSparkles} color="brand.100" mr={1} />
				            <Text color="gray.400">1 karma</Text>
			            </Flex>
		            </Box>
	            </>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => signOut(auth)}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
	          <MenuItem
		          fontSize="10pt"
		          fontWeight={700}
		          _hover={{ bg: "blue.500", color: "white" }}
		          onClick={() =>
			          setAuthModalState({
				          open: true,
				          view: "login",
			          })
		          }
	          >
		          <Flex align="center">
			          <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
			          Log In / Sign Up
		          </Flex>
	          </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;