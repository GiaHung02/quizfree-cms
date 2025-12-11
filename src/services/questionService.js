const API_URL = 'http://localhost:3001/api';

export async function getAllQuestions() {
    const res = await fetch(`${API_URL}/questions`, { cache: 'no-store' }); // tránh cache nếu cần realtime
    if (!res.ok) throw new Error('Failed to fetch questions');
    return res.json();
}

export async function getQuestionById(id) {
    const res = await fetch(`${API_URL}/questions/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch question');
    return res.json();
}

export async function createQuestion(questionData) {
    const res = await fetch(`${API_URL}/question`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
    });
    if (!res.ok) throw new Error('Failed to create question');
    return res.json();
}

export async function updateQuestion(id, questionData) {
    console.log("Updating question with data:", questionData);
    const res = await fetch(`${API_URL}/question/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
    });
    if (!res.ok) throw new Error('Failed to update question');
    return res.json();
}

export async function deleteQuestion(id) {
    const res = await fetch(`${API_URL}/question/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete question');
    return res.json();
}