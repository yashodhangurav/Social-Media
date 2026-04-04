import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import UserLayout from '@/layout/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getAboutUser } from '@/config/redux/action/authAction';

function DashboardComponent() {

    const router = useRouter();

    const [isTokenThere, setIsTokenThere] = useState(false);

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
        }

        setIsTokenThere(true);
    }, [])

    useEffect(() => {
        if (isTokenThere) {
            dispatch(getAllPosts());
            dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        }
    }, [isTokenThere])

    return (
        <UserLayout>
            <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h1>Dashboard</h1>
                <p>Welcome to your network dashboard!</p>
            </div>
        </UserLayout>
    )
}

export default DashboardComponent;