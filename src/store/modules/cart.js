export default {
    state() {
        return {
            cart: [],
        }
    },
    mutations: {
        addToCart(state, product) {
            const item = state.cart.find(item => item.product.id === product.product.id);
            if (!item) {
                state.cart.push(product);
            } else if (item.quantity + product.quantity <= product.product.stockQuantity) {
                item.quantity = item.quantity + product.quantity;
            }
        },
        removeFromCart(state, productId) {
            const itemIndex = state.cart.findIndex(item => item.product.id === productId);
            state.cart.splice(itemIndex, 1);
        },
        emptyCart(state) {
            state.cart = [];
        }
    },
    getters: {
        cart(state) {
            return state.cart;
        },
        cartItem(state, id) {
            return state.cart.find(item => item.product.id === id);
        },
    },
    actions: {
        addToCart(state, product) {
            state.commit('addToCart', product);
        },
        removeFromCart(state, productId) {
            state.commit('removeFromCart', productId)
        },
        emptyCart(state) {
            state.commit('emptyCart');
        },
    }
};
