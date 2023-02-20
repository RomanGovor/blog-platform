import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {createUser} from "@/helpers/createUser";

type OAuthButtonsProps = {};

const OAuthButtons: FunctionComponent<OAuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	const signIn = async () => {
		const us = await signInWithGoogle();
		createUser(us);
	}

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={signIn}
      >
        <Image src="/images/googlelogo.png" alt="google" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
