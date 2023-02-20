import { ChangeEvent, FunctionComponent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi2";
import {doc, runTransaction, serverTimestamp} from "@firebase/firestore";
import {auth, firestore} from "@/firebase/clientApp";
import {useAuthState} from "react-firebase-hooks/auth";
import {CommunityEnum, CommunityType} from "@/types/community";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: FunctionComponent<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
	const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState<CommunityType>(CommunityEnum.PUBLIC);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;

    setCommunityType(event.target.name as CommunityType);
  };

	const handleCreateCommunity = async () => {
		if (error) setError("");
		const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

		if (format.test(communityName) || communityName.length < 3) {
			return setError(
				"Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
			);
		}

		setLoading(true);
		try {
			// Create community document and communitySnippet subcollection document on user
			const communityDocRef = doc(firestore, "communities", communityName);

			await runTransaction(firestore, async (transaction) => {
				const communityDoc = await transaction.get(communityDocRef);
				if (communityDoc.exists()) {
					throw new Error(`Sorry, /r${name} is taken. Try another.`);
				}

				transaction.set(communityDocRef, {
					creatorId: user?.uid,
					createdAt: serverTimestamp(),
					numberOfMembers: 1,
					privacyType: communityType,
				});

				transaction.set(
					doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
					{
						communityId: communityName,
						isModerator: true,
					}
				);
			});
		} catch (error: any) {
			console.log("Transaction error", error);
			setError(error.message);
		}
		// setSnippetState((prev) => ({
		// 	...prev,
		// 	mySnippets: [],
		// }));
		// handleClose();
		// router.push(`r/${name}`);
		setLoading(false);
	};

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
	            <Text fontSize="9pt" color="red" pt={1}>
		            {error}
	            </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name={CommunityEnum.PUBLIC}
                    isChecked={communityType === CommunityEnum.PUBLIC}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name={CommunityEnum.RESTRICTED}
                    isChecked={communityType === CommunityEnum.RESTRICTED}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name={CommunityEnum.PRIVATE}
                    isChecked={communityType === CommunityEnum.PRIVATE}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={2}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
