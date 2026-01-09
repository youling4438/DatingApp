export type User = {
	id: string;
	displayName: string;
	email: string;
	token: string;
	imageUrl?: string;
};

export type LoginCreds = {
	password: string;
	email: string;
};

export type RegisterCreds = {
	password: string;
	email: string;
	displayName: string;
};
