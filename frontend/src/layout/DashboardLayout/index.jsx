import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';
import { setTokenThere } from '@/config/redux/reducer/authReducer';
import styles from "./styles.module.css";

function DashboardLayout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
        } else {
            dispatch(setTokenThere());
        }
    }, []);



    return (
        <div className={styles.container}>
            <div className={styles.main_container}>

                {/* LEFT CONTAINER */}
                <div className={styles.left_container}>
                    {/* Profile Card */}
                    <div className={styles.profile_card}>
                        <div className={styles.cover_photo}></div>
                        <div className={styles.avatar}></div>
                        <div className={styles.profile_info}>
                            {authState.profileFetched && authState.user ? (
                                <>
                                    <h3>{authState.user.userId?.name || authState.user.name || "User"}</h3>
                                    <p>{authState.user.username || "@username"}</p>
                                </>
                            ) : (
                                <p>Loading Profile...</p>
                            )}
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.stat_item}>
                                <span>Profile views</span>
                                <span className={styles.stat_count}>42</span>
                            </div>
                            <div className={styles.stat_item}>
                                <span>Post impressions</span>
                                <span className={styles.stat_count}>128</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation/Discovery Card */}
                    <div className={styles.discovery_card}>
                        <button className={styles.nav_btn} onClick={() => router.push('/dashboard')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            Scroll
                        </button>

                        <button className={styles.nav_btn} onClick={() => router.push('/my_connections')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            My Connections
                        </button>

                        <button className={styles.nav_btn} onClick={() => router.push('/discover')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            Discover More
                        </button>



                        <div className={styles.divider}></div>

                        <button className={styles.nav_btn_simple}>
                            Events
                        </button>
                        <button className={styles.nav_btn_simple}>
                            Groups
                        </button>
                    </div>
                </div>

                {/* FEED CONTAINER (Children) */}
                <div className={styles.feed_container}>
                    {children}
                </div>

                {/* RIGHT CONTAINER */}
                <div className={styles.right_container}>
                    <div className={styles.news_card}>
                        <h4>Top Profiles</h4>
                        {authState.all_profiles_fetched && authState.allUsers != null && authState.allUsers.map((profile) => (
                            <div key={profile.userId_id}>
                                <h4>{profile.userId?.name || "Anonymous"}</h4>
                                <p style={{ fontSize: "12px", color: "gray" }}>{profile.userId?.username}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.footer_links}>
                        <p>© 2026 YourNetwork Corporation</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardLayout;