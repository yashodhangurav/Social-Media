import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

function loginComponent() {
    const authState = useSelector((state) => state.auth)             //this is coming from store.js file
    const router = useRouter()

    // Logic for toggling between Sign In and Sign Up
    const [isLoginMethod, setIsLoginMethod] = useState(true);

    useEffect(() => {
        if (authState.loggedIn) {
            router.push('/dashboard');
        }
    },
    )



    return (
        <UserLayout>


        </UserLayout>

    )
}

export default loginComponent
