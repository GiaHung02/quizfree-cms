'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import { login } from '@/services/userService';
import Loader from '@/components/loader';

export default function QuizPage() {
    const router = useRouter();
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChangeUsernameOrEmail = (e) => {
        setEmailOrUsername(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // clear lỗi cũ
        setLoading(true);
        try {
            const res = await login(emailOrUsername, password);

            if (!res.success) {
                setLoading(false);
                setError(res.message || "Login failed");
                return;
            }
            router.push('/dashboard');
        } catch (err) {
            setLoading(false);
            setError("Server error, please try again.");
        }
    };

    return (
        <>
            <div className={styles.loginPage}>
                {/* Loading */}
                {loading && (
                    <>
                        <div className={styles.loadingOverlay}>
                            <Loader />
                        </div>
                    </>
                )}
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username or Email</label>
                        <input id='username' className={styles.input} type="text" value={emailOrUsername} onChange={(e) => handleChangeUsernameOrEmail(e)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input id='password' className={styles.input} type="password" value={password} onChange={(e) => handleChangePassword(e)} />
                        {error && (<p className={styles.errorMessage}>{error}</p>)}
                    </div>


                    <div className={styles.button}>
                        <Button type="submit" mode="login">Login</Button>
                    </div>
                </form>
            </div>
        </>
    );
}