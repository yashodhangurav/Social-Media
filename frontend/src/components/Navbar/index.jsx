import React from 'react';
import styles from './styles.module.css';
import { useRouter } from "next/router";

function NavbarComponent() {
    const router = useRouter();                 //use to navigate between pages

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

                    <div
                        onClick={() => router.push("/login")}
                        className={styles.buttonJoin}
                    >
                        Login
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarComponent;