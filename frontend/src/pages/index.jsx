import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  return (
    <UserLayout>
      <div className={`${styles.container} ${geistSans.variable}`}>
        <Head>
          <title>Login | YourProfessionalNetwork</title>
        </Head>

        <div className={styles.maincontainer}>
          {/* Left Side: Branding and Value Proposition */}
          <div className={styles.maincontainer_left}>
            <h1>Welcome to your professional community</h1>
            <p>Connect with colleagues, share updates, and grow your career.</p>
            <img
              src="/login-illustration.svg"
              alt="Networking"
              className={styles.illustration}
            />
          </div>

          {/* Right Side: The Login Form */}
          <div className={styles.maincontainer_right}>
            <div className={styles.login_card}>
              <h2>Sign in</h2>
              <p>Stay updated on your professional world</p>

              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email or Phone" className={styles.input} />
                <input type="password" placeholder="Password" className={styles.input} />

                <span className={styles.forgot_password}>Forgot password?</span>

                <button type="submit" className={styles.button_primary}>
                  Sign in
                </button>
              </form>

              <div className={styles.divider}>
                <span>or</span>
              </div>

              <button className={styles.button_google}>
                Continue with Google
              </button>

              <p className={styles.signup_text}>
                New to the platform? <span onClick={() => router.push("/login")}>Join now</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </UserLayout>
  );
}
