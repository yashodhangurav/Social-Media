import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, loginUser } from '@/config/redux/action/authAction'
import styles from './styles.module.css'
import { emptyMessage } from '@/config/redux/reducer/authReducer'

function LoginComponent() {
    const authState = useSelector((state) => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()

    const [userLoginMethod, setUserLoginMethod] = useState(true);
    const [email, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (authState.isSuccess && window.localStorage.getItem("token")) {
            router.push('/dashboard');
        }
    }, [authState.isSuccess]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/dashboard");
        }
    }, [])

    useEffect(() => {
        dispatch(emptyMessage());
    }, [userLoginMethod])

    const handleRegister = () => {
        console.log("Registering...");
        dispatch(registerUser({ email, password, username, name }))
    }
    const handleLogin = () => {
        console.log("Logging in...");
        dispatch(loginUser({ email, password }))
    }


    return (
        <UserLayout>
            <div className={styles.container}>
                <div className={styles.maincontainer}>

                    {/* Left: Branding Content */}
                    <div className={styles.maincontainer_left}>
                        <h1 className={styles.title}>
                            {userLoginMethod ? "Welcome Back" : "Join Your Network"}
                        </h1>
                        <p className={styles.subtitle}>
                            {userLoginMethod
                                ? "Connect with colleagues and stay updated on your industry."
                                : "Create your profile to start building your professional future."}
                        </p>
                    </div>



                    {/* Right: Interaction Card */}
                    <div className={styles.maincontainer_right}>
                        <div className={styles.login_card}>

                            {/* Display Redux Errors (e.g., "User already exists") */}
                            {authState.error && (
                                <div className={styles.error_box}>
                                    {typeof authState.error === 'string' ? authState.error : "An error occurred"}
                                </div>
                            )}

                            <div className={styles.form_header}>
                                <h2>{userLoginMethod ? "Sign In" : "Sign Up"}</h2>
                                <p style={{ color: authState.isError ? "red" : "green", fontSize: "12px" }}>{authState.message}</p>
                            </div>

                            <div className={styles.form_body}>
                                {!userLoginMethod && (
                                    <>
                                        <div className={styles.input_group}>
                                            <label>Full Name *</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Rahul Kumar"
                                            />
                                        </div>
                                        <div className={styles.input_group}>
                                            <label>Username *</label>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="e.g. rahul_123"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className={styles.input_group}>
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        placeholder="rahul@gmail.com"
                                    />
                                </div>

                                <div className={styles.input_group}>
                                    <label>Password *</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>

                                {/* Primary Button: Changes text based on method */}
                                <div
                                    className={authState.loading ? styles.buttonDisabled : styles.buttonJoin}
                                    onClick={!authState.loading ? (userLoginMethod ? handleLogin : handleRegister) : null}
                                >
                                    {authState.loading ? "Processing..." : (userLoginMethod ? "Login" : "Agree & Join")}
                                </div>
                            </div>

                            <div className={styles.divider}>
                                <span>or</span>
                            </div>

                            {/* Toggle Footer */}
                            <div className={styles.toggle_footer}>
                                <p>
                                    {userLoginMethod ? "New to our platform?" : "Already have an account?"}
                                    <span
                                        className={styles.toggle_link}
                                        onClick={() => setUserLoginMethod(!userLoginMethod)}
                                    >
                                        {userLoginMethod ? " Join now" : " Sign in"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </UserLayout>
    )
}

export default LoginComponent;