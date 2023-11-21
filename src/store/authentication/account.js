
export default {
    state() {
        return {
            myUserProfile: {}
        }
    },
    mutations: {
        setUser(state, user) {
            state.myUserProfile = user
        }
    },
    getters: {
        myUserProfile(state) {
            return state.myUserProfile;
        }
    },
    actions: {
        async getUser(context) {
            const apiUrl = context.getters['base_url'];
            const idToken = context.getters['token'];

            const response = await fetch(
                `${apiUrl}/user/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    }
                })

            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'GET user failed');
                throw error;
            }

            await context.commit('setUser', responseData);
        }
    }
}
