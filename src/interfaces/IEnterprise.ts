export interface IEnterprise{
    _id?: string;
    name: string;
    date: Date;
    type: string;
    comments: string;
    favorite: string;
    token?: string;
    session_active?: boolean;
}