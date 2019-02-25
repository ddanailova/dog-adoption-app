import {post} from './requester'

function saveSession(userInfo) {
    localStorage.setItem('authtoken', userInfo._kmd.authtoken);
    localStorage.setItem('userId', userInfo._id);
    localStorage.setItem('username', userInfo.username);
}
// user/login
function login(userData) {
    return post('user', 'login', 'basic', userData);
}
// user/register
function register(userData) {
    console.log(userData)
    return post('user', '', 'basic', userData);
}
// user/logout
function logout() {
    let logoutData = {
        authtoken: localStorage.getItem('authtoken')
    };
    return post('user', '_logout', 'kinvey', logoutData);
}


export {
    login,
    register,
    logout,
    saveSession
}
