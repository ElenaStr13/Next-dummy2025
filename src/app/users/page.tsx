import {Users} from "@/components/users/Users";
import css from "./page.module.css";
const UsersPage = () => {

    return (
        <div className={css.allUsers}>
            <h3 className={css.title}>Список користувачів</h3>
            <Users/>
        </div>
    );
}

export default UsersPage;