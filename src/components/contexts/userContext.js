import {createContext} from 'react';

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