'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { getQuizById } from '@/services/quizService';
import { questionList } from '@/data/fakeData.js';

export default function QuizDetail() {
    const { slug } = useParams();
    const [quiz, setQuiz] = useState(null);
    
    // useEffect(() => {
    //     const fetchQuiz = async () => {
    //         const data = await getQuizById(slug);
    //         console.log(data);
    //         setQuiz(data.data);
    //     };
    //     if (slug) fetchQuiz();
    //     console.log(slug);

    // }, [slug]);

    useEffect(() => {
        console.log(questionList);
    }, []);

    return (
        <div className="dashboard">
            <h1 className="title">{quiz?.title}</h1>

            <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label htmlFor="question1">Question 1</label>
                    <input className={styles.input} type="text" id="question1" name="question1" value={quiz?.question1} onChange={(e) => setQuiz({ ...quiz, question1: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="answer1">answer 1</label>
                    <input className={styles.input} type="text" id="answer1" name="answer1" value={quiz?.answer1} onChange={(e) => setQuiz({ ...quiz, answer1: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="answer2">answer 2</label>
                    <input className={styles.input} type="text" id="answer2" name="answer2" value={quiz?.answer2} onChange={(e) => setQuiz({ ...quiz, answer2: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="answer3">answer 3</label>
                    <input className={styles.input} type="text" id="answer3" name="answer3" value={quiz?.answer3} onChange={(e) => setQuiz({ ...quiz, answer3: e.target.value })} />
                </div>
            </div>
        </div>
    );
}
