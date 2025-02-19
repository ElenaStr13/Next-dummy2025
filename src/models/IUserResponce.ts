import {IUser} from "@/models/IUser";

export type  IUsersResponse = {
    users:IUser[]
    total: number;
    skip: number;
    limit: number;
}