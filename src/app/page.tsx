"use client";
import styles from "./page.module.css";
import {useAuth} from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (

    <div className={styles.page}>
      {!user ? <p>Вам потрібно увійти</p> : <p>Ви залогінені як {user.username}</p>}
    </div>
  );
}
