import React, {useEffect} from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import {Community, communityState} from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "@/components/Community/About";

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
	const setCommunityStateValue = useSetRecoilState(communityState);

	useEffect(() => {
		setCommunityStateValue((prev) => ({
			...prev,
			currentCommunity: communityData,
		}));
	}, [communityData]);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
	        <CreatePostLink />
	        <Posts communityData={communityData} />
        </>
        <>
	        <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error - [community]", error);
  }
}
