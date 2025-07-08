export interface IRs_Common<T> {
    code: number;
    message: string;
    data: T | null;
}

export const CommonError: IRs_Common<undefined> = {
    code: 500,
    message: 'Internal Server Error',
    data: null,
};

export type PaginationType = {
    Total: number;
    Limit: number;
    PageCurrent: number;
    PageTotal: number;
};

export type ResponseMeta<T> = {
    Message: string;
    Results: {
        Status: boolean;
        Data: T;
        Pagination?: PaginationType;
    };
};
