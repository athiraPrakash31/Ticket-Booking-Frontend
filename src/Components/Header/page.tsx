"use client"
import styles from "./header.module.css"
import { useRouter } from "next/navigation"
import { IoSearch } from "react-icons/io5";
 export const Header =()=>{
    const router = useRouter();

    const login =()=>{
        router.push('/Auth')
    }
    return (
        <>
        <div className={styles.header}>
            
            <h4>Book My Seat</h4>
            <div className={styles.search}>
            <input type="search" placeholder="Search Movie"/><IoSearch />
            </div>
            <ul>
                <li><button className={styles.login} onClick={login}>Login</button></li>
                <li><button className={styles.login}>Logout</button></li>

            </ul>
        </div>
        </>
    )
 }

 export default Header;