import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import {Community} from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";

interface CommunityPageProps {
	communityData: Community;
}

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
	return <div>Community Page {communityData.id}</div>;
};

export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	console.log("GET SERVER SIDE PROPS RUNNING");

	try {
		const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
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
		// Could create error page here
		console.log("getServerSideProps error - [community]", error);
	}
}