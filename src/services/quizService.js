const API_URL = 'http://localhost:3001/api';

export async function getAllQuizzes() {
    const res = await fetch(`${API_URL}/quizzes`, { cache: 'no-store' }); // tránh cache nếu cần realtime
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
}

export async function getQuizById(id) {
    const res = await fetch(`${API_URL}/quizzes/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch quiz');
    return res.json();
}

export async function updateQuiz(id, quizData) {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
    });
    if (!res.ok) throw new Error('Failed to update quiz');
    return res.json();
}

export async function deleteQuiz(id) {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete quiz');
    return res.json();
}