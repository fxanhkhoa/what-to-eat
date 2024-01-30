export type Base = {
	createdAt: string;
	updatedAt: string;
	createdBy?: string;
	updatedBy?: string;
};

export type APIPagination<T> = {
	data: Array<T>;
	count: number;
};
