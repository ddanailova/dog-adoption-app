import {createContext} from 'react';

const isAdminValidation = (!localStorage.getItem('adminRoleId'))?false:localStorage.getItem('isAdmin');

const defaultUserState = { 
    username:localStorage.getItem('username') || null,
    isAdmin:isAdminValidation || false,
    updateUser(){}
};
const UserContext = createContext(defaultUserState);

export {
    UserContext,
    defaultUserState
}