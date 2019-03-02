import {createContext} from 'react';

//TODO fix the default value of Admin
const isAdminDefined = (localStorage.getItem('isAdmin') === 'undefined' || localStorage.getItem('isAdmin') === 'false')?false:localStorage.getItem('isAdmin');

const defaultUserState = { 
    username:localStorage.getItem('username') || null,
    isAdmin:isAdminDefined || false,
    updateUser(){}
};
const UserContext = createContext(defaultUserState);

export {
    UserContext,
    defaultUserState
}