import type { Dispatch, SetStateAction, MutableRefObject } from "react";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type Require<T, U extends keyof T> = T & { [P in U]-?: T[P] };

export type RequireWithPartial<T, U extends keyof T> = Partial<T> & {
	[P in U]-?: T[P];
};

export type CustomOmit<T, U extends keyof T> = {
	[K in keyof T as K extends U ? never : K]: T[K];
};
export type Full<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

export type IUseState<T> = Dispatch<SetStateAction<T>>;
export type EmptyObject = Record<string, never>;

export type IUseRef<T> = MutableRefObject<T>;
