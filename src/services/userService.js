const API_URL = 'http://localhost:3001/api';
import Cookies from 'js-cookie';


// LOGIN USER
export async function login(emailOrUsername, password) {

    console.log(emailOrUsername, password);
    console.log("11111");
    
    if (!emailOrUsername || !password) {
        return { success: false, message: 'username and password are required' };
    }
    console.log("222222");
    
    const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
    });
    if(!res.ok) throw new Error('Failed to login, please check your username and password');
    
    console.log("33333");
    const data = await res.json();
    console.log("data: ", data);

    
    Cookies.set("user", JSON.stringify(data.data), { expires: 7 });
    console.log("4444");
    
    return data;
}
