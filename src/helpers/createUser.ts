import {doc, runTransaction} from "@firebase/firestore";
import {firestore} from "@/firebase/clientApp";
import { UserCredential } from "firebase/auth";

export const createUser = async (data: UserCredential | undefined): Promise<void> => {
	await runTransaction(firestore, async (transaction) => {
		// Duplicate user data to firestore
		if (data?.user) {
			const userDocRef = doc(firestore, "users", data.user.uid);

			const userDoc = await transaction.get(userDocRef);

			if (!userDoc.exists()) {
				await runTransaction(firestore, async (transaction) => {
					transaction.set(userDocRef, JSON.parse(JSON.stringify(data.user)));
				});
			}
		}
	})
}