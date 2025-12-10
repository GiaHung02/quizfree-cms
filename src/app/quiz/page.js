'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { getAllQuizzes } from '@/services/quizService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { quizList } from '@/data/fakeData.js';

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

    return (
        <>
            <div className='dashboard'>
                <h1 className="title">Quiz Page</h1>
                {quizList.length > 0 ? (
                    <div className={styles.quizContainer}>
                        <div className={styles.quizList}>
                            {quizList.map((quiz) => (
                                <div className={styles.quizItem} key={quiz.id}>
                                    <div className={styles.quizContent} onClick={() => router.push(`/quiz/${quiz.slug}`)}>
                                        <h2>{quiz.title}</h2>
                                        <p>{quiz.description}</p>
                                        <div>{quiz.questionCount} questions</div>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <Link href={`/quiz/${quiz.slug}`} className={styles.button} title='Edit'>Edit</Link>
                                        {/* <Link href={`/quiz/${quiz.id}`} className={styles.button} title='Delete'>Delete</Link> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.noQuiz}>
                        <h2>No quiz found</h2>
                    </div>
                )}
            </div>
        </>
    );
}