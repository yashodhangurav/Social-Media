import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import UserLayout from '@/layout/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import styles from './styles.module.css';
import DashboardLayout from '@/layout/DashboardLayout';

function DashboardComponent() {
    const router = useRouter();

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);



    useEffect(() => {
        if (authState.isTokenThere) {
            dispatch(getAllPosts());
            dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        }

        if (!authState.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    }, [authState.isTokenThere]);

    return (
        <UserLayout>
            <DashboardLayout>
                <div className="scrollComponent">
                    <div className="createPostContainer">

                    </div>
                </div>

            </DashboardLayout>
        </UserLayout>
    )
}

export default DashboardComponent;