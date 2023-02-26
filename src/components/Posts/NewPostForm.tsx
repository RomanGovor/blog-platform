import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { User } from "firebase/auth";
import TabItem from "./TabItem";
import TextInputs from "@/components/Posts/PostForm/Textinputs";
import ImageUpload from "@/components/Posts/PostForm/ImageUpload";
import {Post} from "@/atoms/postsAtom";
import { useRouter } from "next/router";
import {addDoc, serverTimestamp} from "@firebase/firestore";
import { collection, Timestamp, updateDoc } from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import useSelectFile from "@/hooks/useSelectFile";

type NewPostFormProps = {
  user: User;
  // communityImageURL?: string;
};

export enum TabsEnum {
  POST = "Post",
  MEDIA = "Images & Video",
  LINK = "Link",
  POLL = "Poll",
  TALK = "Talk",
}

const formTabs: TTabItem[] = [
  {
    title: TabsEnum.POST,
    icon: IoDocumentText,
  },
  {
    title: TabsEnum.MEDIA,
    icon: IoImageOutline,
  },
  {
    title: TabsEnum.LINK,
    icon: BsLink45Deg,
  },
  {
    title: TabsEnum.POLL,
    icon: BiPoll,
  },
  {
    title: TabsEnum.TALK,
    icon: BsMic,
  },
];

export type TTabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
      const { communityId } = router.query;

      const newPost: Post = {
        communityId: communityId as string,
        creatorId: user.uid,
        creatorDisplayName: user.email!.split("@")[0],
        title: textInputs.title,
        body: textInputs.body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
      };


      setLoading(true);
      try {
        const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

        if (selectedFile) {
          const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
          await uploadString(imageRef, selectedFile, "data_url");
          const downloadURL = await getDownloadURL(imageRef);

          await updateDoc(postDocRef, {
            imageURL: downloadURL,
          });
        }

        router.back();
      } catch (error: any) {
        console.log("handleCreatePost error", error.message);
        setError(true);
      }
      setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === TabsEnum.POST && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === TabsEnum.MEDIA && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
