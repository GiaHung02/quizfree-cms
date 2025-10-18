import styles from './page.module.scss';

export default function QuizPage() {
    const quizList = [
        {
            id: 1,
            title: 'Quiz 1',
            description: 'Quiz 1 description',
            questions: 12,
            time: 120,
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'Quiz 2 description',
            questions: 12,
            time: 120,
        },
    ];
    return (
        <>
            <div className='dashboard'>
                <div className={styles.quizContainer}>
                    <h1>Quiz Page</h1>

                    <div className={styles.quizList}>
                        {quizList.map((quiz) => (
                            <div className={styles.quizItem} key={quiz.id}>
                                <h2>{quiz.title}</h2>
                                <p>{quiz.description}</p>
                                <div>
                                    <div>{quiz.questions} questions</div>
                                    <div>{quiz.time} minutes</div>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <button className={styles.button}>Edit</button>
                                    <button className={styles.button}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}