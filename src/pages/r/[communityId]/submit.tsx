import PageContent from "@/components/Layout/PageContent";
import { NextPage } from "next";
import {Box, Text} from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/NewPostForm";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const SubmitPostPage: NextPage = () => {
	const [user] = useAuthState(auth);

	return (
	  <PageContent maxWidth="1060px">
		  <>
			  <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
				  <Text fontWeight={600}>Create a post</Text>
			  </Box>
			  {user && (
				  <NewPostForm user={user} />
			  )}
		  </>
		  <>
		  </>
	  </PageContent>
  );
};

export default SubmitPostPage;
