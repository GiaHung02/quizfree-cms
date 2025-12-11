'use client';
import React, { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { getQuizBySlug, updateQuiz } from '@/services/quizService';
import { questionList } from '@/data/fakeData.js';
import { createQuestion, updateQuestion } from '@/services/questionService';

export default function QuizDetail() {
    const { slug } = useParams();
    const [quizData, setQuizData] = useState();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState();

    useEffect(() => {
        if (questions) {
            console.log("questions:", questions);
        }
        if (quizData) {
            console.log("quizData:", quizData);
        }
    }, [quizData, questions]);

    const handleQuestionChange = (e, qIndex, field) => {
        const newValue = e.target.value;


        setQuizData(prev => {
            const updated = { ...prev };
            updated.questions = [...prev.questions];
            updated.questions[qIndex] = {
                ...updated.questions[qIndex],
                content: {
                    ...updated.questions[qIndex].content,
                    [field]: newValue
                }
            };

            return updated;
        });
    };

    const handleQuizChange = (e, field) => {
        const newValue = e.target.value;

        setQuizData(prev => ({
            ...prev,
            [field]: newValue
        }));
    };


    useEffect(() => {
        const fetchQuiz = async () => {
            const data = await getQuizBySlug(slug);

            if (data && data.data) {
                const questionList = data.data.questions;
                // questionList.forEach((question, index) => {
                //     const content = question.content;
                //     setQuestions(prev => ([
                //         ...prev,
                //         content
                //     ]));
                // })

                setQuizData(data.data);
            }
        };
        if (slug) fetchQuiz();

    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (!quizData) return;
        console.log("Submitting quizData:", quizData);
        // 1️⃣ Ghép content của questions vào quizData trước
        // const finalQuestions = quizData.questions.map((question, index) => (
        //     {
        //     ...question,
        //     content: question// lấy content mới
        // }));

        // console.log("Final questions to submit:", finalQuestions);

        try {
            // 2️⃣ Update quiz trước
            const quizSubmitContent = {
                title: quizData.title,
                description: quizData.description
            };


            await updateQuiz(quizData.id, quizSubmitContent);

            for (const question of quizData.questions) {
                console.log("question: ", question);


                const questionSubmitContent = {
                    quiz_id: question.quiz_id,
                    type: question.type,
                    order: question.order,
                    content: {
                        ...question.content
                    }
                }

                if (question.id) {
                    await updateQuestion(question.id, questionSubmitContent);
                } else {
                    console.log("create new question: ", questionSubmitContent);
                    await createQuestion(questionSubmitContent);

                }
            }
            alert("create new question successfully!");


        } catch (err) {
            console.error("Error updating quiz:", err);
            alert("Có lỗi khi update quiz");
        }
    };

    const addNewQuestion = () => {
        setQuizData(prev => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    id: null,
                    quiz_id: prev.id,
                    type: "multiple_choice",
                    order: prev.questions.length + 1,
                    content: {
                        question: "",
                        answer1: "",
                        answer2: "",
                        answer3: "",
                        answer4: "",
                    }
                }
            ]
        }))
    };

    const deleteQuestion = (questionId) => {
        console.log(questionId);
    }

    return (
        <div className="dashboard">
            <h1 className="title">{quizData?.title}</h1>

            <div className={styles.formContainer}>
                <form>
                    {
                        quizData && (
                            <div className={styles.formGroupContainer}>
                                {/* question */}
                                <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <input className={styles.input} type="text" value={quizData.title} onChange={(e) => handleQuizChange(e, "title")} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Slug</label>
                                    <input className={styles.input} type="text" value={quizData.slug} onChange={(e) => handleQuizChange(e, "slug")} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>description</label>
                                    <input className={styles.input} type="text" value={quizData.description} onChange={(e) => handleQuizChange(e, "description")} />
                                </div>
                            </div>
                        )
                    }

                    {quizData && quizData.questions.map((question, index) => (
                        <React.Fragment key={index}>
                            <details className={styles.dropdown}>
                                <summary>{`Question ${index}`}</summary>
                                <div className={styles.formGroupContainer}>

                                    {/* question */}
                                    <div className={styles.formGroup}>
                                        <label>Question</label>
                                        <input className={styles.input} type="text" value={quizData.questions[index].content?.question ?? ""} onChange={(e) => handleQuestionChange(e, index, "question")} />
                                    </div>

                                    {/* answer 1 */}
                                    <div className={styles.formGroup}>
                                        <label>Answer 1</label>
                                        <input className={styles.input} type="text" value={quizData.questions[index].content?.answer1 ?? ""} onChange={(e) => handleQuestionChange(e, index, "answer1")} />
                                    </div>

                                    {/* answer 2 */}
                                    <div className={styles.formGroup}>
                                        <label>Answer 2</label>
                                        <input className={styles.input} type="text" value={quizData.questions[index].content?.answer2 ?? ""} onChange={(e) => handleQuestionChange(e, index, "answer2")} />
                                    </div>

                                    {/* answer 3 */}
                                    <div className={styles.formGroup}>
                                        <label>Answer 3</label>
                                        <input className={styles.input} type="text" value={quizData.questions[index].content?.answer3 ?? ""} onChange={(e) => handleQuestionChange(e, index, "answer3")} />
                                    </div>

                                    {/* answer 4 */}
                                    <div className={styles.formGroup}>
                                        <label>Answer 4</label>
                                        <input className={styles.input} type="text" value={quizData.questions[index].content?.answer4 ?? ""} onChange={(e) => handleQuestionChange(e, index, "answer4")} />
                                    </div>

                                    {/* dropdown correct answer */}
                                    <div className={styles.formGroup}>
                                        <label>Correct Answer</label>
                                        <select>
                                            <option value="answer1">Answer 1</option>
                                            <option value="answer2">Answer 2</option>
                                            <option value="answer3">Answer 3</option>
                                            <option value="answer4">Answer 4</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <button className={styles.ctaDeleteQuestion}type="button" onClick={() => deleteQuestion(quizData.questions[index].id)}>
                                        Delete Question
                                    </button>
                                </div>
                            </details>
                        </React.Fragment>
                    ))}

                    <div className={styles.addQuestionContainer}>
                        <button className={styles.ctaAddQuestion} type="button" onClick={addNewQuestion}>
                            + Add Question
                        </button>
                    </div>
                </form>
            </div>

            {/* CTA */}
            <div className={styles.ctaContainer}>
                <button className={styles.ctaSave} onClick={onSubmit}>save</button>
            </div>
        </div>
    );
}