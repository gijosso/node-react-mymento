import { browserHistory } from 'react-router';

// Actions types are defined as string constants
export const LOGIN = 'USER_LOGIN';
export const LOGOUT = 'USER_LOGOUT';

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_PRIVATE: 'SHOW_PRIVATE',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const UserLogin = (username, password) => {
    if (username === 'test' && password === 'test') {
        browserHistory.push('/home');
    }


    return ({
        type: LOGIN,
        username: username,
        password: password
    });
};

export const UserLogout = (id) => {
    return ({ type: LOGOUT, id });
};

export const upload = val => {
    alert(val.toString());
    return {
        type: 'UPLOAD',
        val : val
    }
};