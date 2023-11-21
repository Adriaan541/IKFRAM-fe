import Order from "@/models/order";

export default {
    state() {
        return {
            orders: [],
            order: {Order},
            orderProducts: []
        }
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        },
        setOrderProducts(state, orderProducts) {
            state.orderProducts = orderProducts;
        },
    },
    getters: {
        orders(state) {
            return state.orders;
        }
    },
    actions: {
        async getOrders(context) {
            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];

            const response = await fetch(
                `${apiUrl}/order`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    }
                })
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || 'GET orders failed');
                throw error;
            }

            context.commit('setOrders', responseData)
        },
        async createOrder(context) {
            const idToken = context.getters['token'];
            const apiUrl = context.getters['base_url'];
            const cart = context.getters['cart'];
            const orderProducts = [];

            for (let cartItem of cart) {
                const orderProduct = {
                    id: {
                        productId: cartItem.product.id,
                    },
                    product: cartItem.product,
                    quantity: cartItem.quantity
                };
                orderProducts.push(orderProduct);
            }

            const order = {
                orderProducts: orderProducts
            };

            const response = await fetch(
                `${apiUrl}/order`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
            const responseData = await response;

            if (!response.ok) {
                const error = new Error(responseData.message || 'POST order failed');
                throw error;
            }
            context.commit('emptyCart');
            alert("Checkout complete! Your order will arrive shortly")
        }
    },
};
