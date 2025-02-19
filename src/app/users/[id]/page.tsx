import {fetchUserById, fetchUserRecipes} from "@/services/api.service";
import Link from "next/link";

export const generateMetadata = async ():Promise<MediaMetadata>=> {

}
const  UserPage = async ({ params }: { params: { id: string } }) =>  {
    const userId = Number(params.id);

    // Отримуємо користувача
    const user = await fetchUserById(userId);

    // Отримуємо рецепти користувача
    const userRecipes = await fetchUserRecipes(userId);

    return (
        <div >
            <h4>{user.firstName} {user.lastName}</h4>
            <div>
                <img src={user.image} alt="User avatar" width="40" style={{ borderRadius: "50%" }} />
                <p><strong>Вік:</strong> {user.age}</p>
                <p><strong>Стать:</strong> {user.gender}</p>
                <p><strong>Пошта:</strong> {user.email}</p>
                <p><strong>Телефон:</strong> {user.phone}</p>
                <p><strong>Університет:</strong> {user.university}</p>
            </div>
            <h3>Рецепти цього користувача:</h3>
            {userRecipes.length > 0 ? (
                <ul>
                    {userRecipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link href={`/recipes/${recipe.id}`}>
                                {recipe.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Цей користувач ще не додав жодного рецепту.</p>
            )}
        </div>
    );
}

export default UserPage;