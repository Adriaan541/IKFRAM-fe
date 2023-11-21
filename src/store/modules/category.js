export default {
    state() {
        return {
            categories: []
        }
    },
    getters: {
        categories(state) {
            return state.categories
        }
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = [];
            categories.forEach(newCategory => {
                const exists = state.categories.some(existingCategory => existingCategory.id === newCategory.id);
                if (!exists) {
                    state.categories.push(newCategory);
                }
            });
            state.categories.sort((a, b) => a.name.localeCompare(b.name))
        }
    },
    actions: {
        async addCategory(context, data) {
            const category = JSON.stringify({
                name: data.name,
            });

            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/category`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    },
                    body: category
                }
            )
            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'POST category failed');
                throw error;
            }
        },
        async getCategories(context) {
            let apiUrl = context.getters['base_url'] + '/category';
            const isAdmin = context.getters['isAdmin'];

            let requestData = {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            };

            if (isAdmin) {
                const idToken = context.getters['token'];
                apiUrl = apiUrl + '/all';

                requestData = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'}
                };
            }

            const response = await fetch(
                apiUrl, requestData)
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'GET categories failed');
                throw error;
            }
            await context.commit('setCategories', responseData);
        },
        async deleteCategory(context, categoryId) {
            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/category/${categoryId.categoryId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    }
                })
            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'DELETE category failed');
                throw error;
            }
            await context.dispatch('getCategories');
        },
    }
}
