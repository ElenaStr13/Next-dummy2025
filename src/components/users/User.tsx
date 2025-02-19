import {IUser} from "@/models/IUser";

interface UserProps {
    user: IUser;
}

export const User =  ({user}: UserProps) => {


    return (
        <div>
            {user.id}. {user.firstName} {user.lastName}
        </div>
    );
};