import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';


// interface IStorage {
//     getItem(key: string): string | null;
//     setItem(key: string, value: string): void;
//     removeItem(key: string): void;
// }

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user') || 'null'));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

async function login(username: any, password: any) {
    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user: any) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id: any) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id: any, params: any) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then((x: any) => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: any) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}