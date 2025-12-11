const API_URL = 'http://localhost:3001/api';


// LOGIN USER
export async function login(emailOrUsername, password) {

    console.log(emailOrUsername, password);
    
    if (!emailOrUsername || !password) {
        return { success: false, message: 'username and password are required' };
    }

    const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
    });
    if(!res.ok) throw new Error('Failed to login, please check your username and password');
    return res.json();
}