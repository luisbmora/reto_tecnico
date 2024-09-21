export interface IUser{
    _id?: string;
    user: string;
    password: string;
    token?: string;
    session_active?: boolean;
}