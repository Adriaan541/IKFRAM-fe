import {Buffer} from "buffer";
import * as moment from "moment";


function tokenExpiration(token) {
    const expiry = (JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('binary'))).exp;
    return expiry;
}


export default {
    state() {
        return {
            idToken: '',
            expiresAt: '',
            userId: '',
            admin: ''
        }
    },
    getters: {
        isLoggedIn(state) {
            if (state.expiresAt === '') {
                return false;
            }
            return moment().isBefore(moment.unix(parseInt(state.expiresAt)), "milliseconds");
        },
        isAdmin(state) {
            return state.admin;
        },
        token(state) {
            return state.idToken;
        },
        userId(state) {
            return state.userId;
        }
    },
    mutations: {
        setSession(state, authResult) {
            state.idToken = authResult.accessToken;
            state.expiresAt = tokenExpiration(authResult.accessToken);
            state.userId = authResult.userId;
            state.admin = authResult.admin;
            state.cart = authResult.products;
        },
        logOut(state) {
            state.idToken = '';
            state.expiresAt = '';
            state.userId = '';
            state.admin = '';
            state.cart = '';
            state.myUserProfile = {};
        }
    },
    actions: {
        async login(context, payload) {
            const apiUrl = context.getters['base_url'];

            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password
                })
            })
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'Authentication failed');
                throw error;
            }


            await context.commit('setSession', responseData);

        },
        async register(context, payload) {
            const apiUrl = context.getters['base_url'];

            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    firstName: payload.firstName,
                    preposition: payload.preposition,
                    lastName: payload.lastName
                })
            })

            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'Authentication failed');
                throw error;
            }
        },
        logOut(context) {
            context.commit('logOut');
        },
        async deleteAccount(context) {
            const apiUrl = context.getters['base_url'];
            const idToken = context.getters['token'];

            const response = await fetch(
                `${apiUrl}/user/deleteMe`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    }
                })

            const responseData = await response;
            if (!response.ok) {
                const error = new Error(responseData.message || 'DELETE user failed');
                throw error;
            }

            context.commit('logOut');
        }
    }
}
