import Product from "@/models/product";


export default {
    state() {
        return {
            productById: {Product},
            products: []
        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
            state.products.sort((a, b) => a.name.localeCompare(b.category.name))
        },
        setProductById(state, product) {
            state.productById = product;
        },
        resetProductById(state) {
            state.productById = {Product};
        }
    },
    getters: {
        products(state) {
            return state.products;
        },
        getProductById(state) {
            if (state.productById) {
                return state.productById;
            }
            return Product;
        }
    },
    actions: {
        async getProducts(context) {
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/products`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'GET products failed');
                throw error;
            }
            await context.commit('setProducts', responseData);
        },
        async getProductById(context, data) {
            const apiUrl = context.getters['base_url'];
            const id = data.id;

            const response = await fetch(
                `${apiUrl}/products/${id}`, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'GET products failed');
                throw error;
            }
            await context.commit('setProductById', responseData);
        },
        async addProduct(context, data) {
            const product = JSON.stringify({
                name: data.name,
                shortDescription: data.shortDescription,
                description: data.description,
                price: data.price,
                stockQuantity: data.stockQuantity,
                pictureUrl: data.pictureUrl,
                category: data.category
            });

            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/products`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    },
                    body: product
                }
            )

            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'POST product failed');
                throw error;
            }

            await context.commit('resetProductById');
        },
        async updateProduct(context, data) {
            const product = JSON.stringify({
                name: data.product.name,
                shortDescription: data.product.shortDescription,
                description: data.product.description,
                price: data.product.price,
                stockQuantity: data.product.stockQuantity,
                pictureUrl: data.product.pictureUrl,
                category: data.product.category
            });

            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/products/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    },
                    body: product
                }
            )

            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'PUT product failed');
                throw error;
            }
        },
        async deleteProduct(context, data) {
            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/products/${data.productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    }
                })
            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'DELETE product failed');
                throw error;
            }
            await context.dispatch('getProducts');
        }
    }

};
