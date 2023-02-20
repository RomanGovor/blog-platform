import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";
import {CommunityType} from "@/types/community";

export interface Community {
	id: string;
	creatorId: string;
	numberOfMembers: number;
	privacyType: CommunityType;
	createdAt?: Timestamp;
	imageURL?: string;
}