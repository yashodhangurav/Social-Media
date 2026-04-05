import React from 'react';
import styles from './styles.module.css';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from '@/config/redux/reducer/authReducer';

function NavbarComponent() {
    const router = useRouter();                 //use to navigate between pages

    const authState = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.maincontainer}>

                {/* LEFT: Branding & Search */}
                <div className={styles.maincontainer_left}>
                    <div style={{ cursor: "pointer" }} className={styles.logo} onClick={() => router.push("/")}>
                        <div className={styles.logo_square}>In</div>
                    </div>
                    <div className={styles.search_wrapper}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={styles.search_input}
                        />
                    </div>
                </div>

                {/* RIGHT: Navigation & Auth */}
                <div className={styles.maincontainer_right}>
                    <nav className={styles.nav_menu}>
                        <div className={styles.nav_item} onClick={() => router.push("/")}>
                            <span className={styles.nav_icon}>🏠</span>
                            <span className={styles.nav_text}>Home</span>
                        </div>
                        <div className={styles.nav_item} onClick={() => router.push("/network")}>
                            <span className={styles.nav_icon}>👥</span>
                            <span className={styles.nav_text}>Network</span>
                        </div>
                        <div className={styles.nav_item} onClick={() => router.push("/jobs")}>
                            <span className={styles.nav_icon}>💼</span>
                            <span className={styles.nav_text}>Jobs</span>
                        </div>
                    </nav>

                    {authState.profileFetched && (
                        <div>
                            <p>Hey, {authState.user.userId?.name}</p>
                            <p style={{ fontWeight: "bold" }}>Profile</p>
                            <p style={{ fontWeight: "bold", cursor: "pointer" }}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    dispatch(reset());
                                    router.push("/login");
                                }}>Logout</p>
                        </div>
                    )}

                    {!authState.profileFetched && (
                        <div
                            onClick={() => router.push("/login")}
                            className={styles.buttonJoin}
                        >
                            Login
                        </div>)}
                </div>

            </div>
        </div>
    )
}

export default NavbarComponent