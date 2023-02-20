import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";
import {CommunityType} from "@/types/community";

export interface Community {
	id: string;
	creatorId: string;
	numberOfMembers: number;
	privacyType: CommunityType;
	createdAt?: Timestamp;
	imageURL?: string;
}

export interface CommunitySnippet {
	communityId: string;
	isModerator?: boolean;
	imageURL?: string;
}

interface CommunityState {
	mySnippets: CommunitySnippet[];
}

export const defaultCommunityState: CommunityState = {
	mySnippets: [],
};

export const communityState = atom<CommunityState>({
	key: "communitiesState",
	default: defaultCommunityState,
});