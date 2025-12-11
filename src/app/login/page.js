'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { getAllQuizzes } from '@/services/quizService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { quizList } from '@/data/fakeData.js';
import Button from '@/components/button';

export default function QuizPage() {
    const router = useRouter();
    const [quizList, setQuizList] = useState([]);
    const getQuizList = async () => {
        const data = await getAllQuizzes();
        console.log(data);
        setQuizList(data.data);
    };

    useEffect(() => {
        getQuizList();
    }, []);

    const AddNewQuiz = () => {
        router.push('/quiz/create');
    }

    return (
        <>
            <div className={styles.loginPage}>
                <h1 className={styles.title}>Login</h1>
                <form>
                    <div className={styles.formGroup}>
                        <label>Username or Email</label>
                        <input className={styles.input} type="text" value={""} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input className={styles.input} type="text" value={""} />
                    </div>
                    <div className={styles.button}>
                        <Button type="submit" mode="primary">Login</Button>
                    </div>
                </form>
            </div>
        </>
    );
}