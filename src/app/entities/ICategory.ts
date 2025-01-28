import { TransactionType } from "./enums";

export type ICategory = {
	id: string;
	userId: string;
	name: string;
	icon: string;
	type: TransactionType;
	createdAt: Date;
	updatedAt: Date;
};
